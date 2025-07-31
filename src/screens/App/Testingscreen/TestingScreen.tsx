import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStyles from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {attendance, checkIn, checkOut} from '../../../services/checkinService';
import {showError, showSuccess} from '../../../utils/helperFunction';
import {initializeLocalNotifications} from '../../../services/setupNotifications';

const {width, height} = Dimensions.get('window');

interface NavigationProps {
  navigation: any;
}

export default function TestingScreen({navigation}: NavigationProps) {
  const {styles} = useStyles();

  // Removed 'loading' as it was redundant with isCheckingIn/isEndingShift
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [shiftStart, setShiftStart] = useState<boolean>(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [safetyTextShow, setSafetyTextShow] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState<boolean>(false); // State for Check in loading
  const [isEndingShift, setIsEndingShift] = useState<boolean>(false); // State for End shift loading

  useEffect(() => {
    const timer = setInterval(() => {
      if (shiftStart && endTime !== null) {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeRemaining(remaining);

        if (remaining === 0 && safetyTextShow) {
          clearInterval(timer);

          // 🔔 Show local notification here
          PushNotification.localNotification({
            channelId: 'default',
            title: 'Safety Check-In Missed!',
            message: 'You didn’t check in. Escalation started!',
            playSound: true,
            soundName: 'default',
            importance: 'high',
            priority: 'high',
            data: {
              type: 'missed_checkin',
            },
          });

          showError('Grace Period has expired! Escalation started!', '');
          setSafetyTextShow(false);
          setCheckedIn(false);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [shiftStart, endTime, safetyTextShow]);

  useEffect(() => {
    const requestAndroidPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log('🔐 POST_NOTIFICATIONS granted:', granted);
      }
    };

    initializeLocalNotifications(initiateSafetyCheck, navigation);
    requestAndroidPermission();
  }, []);

  const formatDateTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds())
    );
  };

  const handleCheckin = async () => {
    setIsCheckingIn(true); // Set loading to true
    const checkinTime = new Date();
    const formattedCheckinTime = formatDateTime(checkinTime); // Y-m-d H:i:s

    try {
      let frequency;

      if (!shiftStart) {
        const response = await attendance(formattedCheckinTime);

        console.log('this is the checkIn response : ', response);

        setShiftStart(true);
        frequency = response.check_in_frequency;

        await AsyncStorage.setItem(
          'checkInID',
          response.worker_check_in_id?.toString() || '',
        );
        await AsyncStorage.setItem(
          'gracePeriodEnd',
          response.grace_period_end.toString(),
        );
      } else {
        const worker_check_in_id = await AsyncStorage.getItem('checkInID');
        if (!worker_check_in_id) throw new Error('No check-in ID found');
        const response = await checkIn(
          Number(worker_check_in_id),
          formattedCheckinTime,
        );

        console.log("'this is the checkIn response from else block:", response);
        await AsyncStorage.setItem(
          'checkInID',
          response.worker_check_in_id.toString(),
        );
        await AsyncStorage.setItem(
          'gracePeriodEnd',
          response.grace_period_end.toString(),
        );
      }

      showSuccess('Checked in successfully', '');
      setCheckedIn(true);
      setSafetyTextShow(false);

      if (frequency !== undefined) {
        const newEndTime = checkinTime.getTime() + frequency * 1000;
        setEndTime(newEndTime);
        console.log('New End Time: ', newEndTime);
        const remainingSeconds = Math.floor((newEndTime - Date.now()) / 1000);
        setTimeRemaining(remainingSeconds);
        await scheduleNotification(newEndTime);
      } else {
        console.warn('Frequency is undefined, skipping end time setup.');
      }
    } catch (error: any) {
      console.log('Check-in Error from Catch Block:', error);
      showError(error?.message || 'Check-in failed', '');
    } finally {
      setIsCheckingIn(false); // Reset loading
    }
  };

  const handleCheckOut = async () => {
    setIsEndingShift(true); // Set loading to true
    try {
      const worker_check_in_id = await AsyncStorage.getItem('checkInID');
      if (!worker_check_in_id) throw new Error('No check-in ID found');

      const checkoutTime = formatDateTime(new Date()); // Y-m-d H:i:s
      await checkOut(Number(worker_check_in_id), checkoutTime);

      showSuccess('Checked out successfully!', '');
    } catch (error: any) {
      console.log(error);
      showError(error?.message || 'Check-out failed', '');
    } finally {
      setIsEndingShift(false); // Reset loading
      setShiftStart(false);
      setCheckedIn(false);
      setTimeRemaining(0);
      setEndTime(null);
      cancelAllNotifications();
      await AsyncStorage.multiRemove(['checkInID', 'gracePeriodEnd']);
    }
  };

  const initiateSafetyCheck = async () => {
    try {
      setCheckedIn(false);
      setSafetyTextShow(true);
      const gracePeriodEnd = await AsyncStorage.getItem('gracePeriodEnd');
      if (!gracePeriodEnd) throw new Error('Grace period not found');

      const graceEnd = new Date(gracePeriodEnd).getTime();
      const now = Date.now();
      const remaining = graceEnd - now;

      if (remaining > 0) {
        const safetyTime = Math.ceil(remaining / 1000);
        setTimeRemaining(safetyTime);
        setEndTime(now + remaining);
      } else {
        showError('Grace period expired', '');
      }
    } catch (error: any) {
      console.log(error);
      showError(error?.message || 'Failed to start safety check', '');
    }
  };

  const scheduleNotification = async (timestamp: number) => {
    // cancelAllNotifications(); // Cancel previous ones if any

    const utcDate = new Date(timestamp); // timestamp is in ms, UTC by default
    console.log('📅 Scheduling notification at UTC:', utcDate.toUTCString());

    PushNotification.localNotificationSchedule({
      id: '1',
      channelId: 'default',
      title: 'Safety Check-In Required!',
      message: 'Tap to confirm your safety',
      date: utcDate, // This date is already in UTC
      allowWhileIdle: true,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      data: {
        type: 'local_checkin',
      },
    });
  };

  const cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} hrs ${mins} mins ${secs} secs`;
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Home" showMenu />

      <View style={styles.innerContainer}>
        <View style={styles.card}>
          {safetyTextShow ? (
            <Text style={styles.alertText}>🚨 Please send your check-in!</Text>
          ) : (
            <>
              <Text style={styles.timerLabel}>Next check-in in:</Text>
              <Text style={styles.timerCountdown}>
                {formatTime(timeRemaining)}
              </Text>
            </>
          )}

          <View style={styles.buttonGroup}>
            <CustomButton
              title="Check in"
              onPress={handleCheckin}
              loading={isCheckingIn} // Pass isCheckingIn to the loading prop
              backgroundColor="#28A745"
              textColor="#FFF"
              borderRadius={12}
              disabled={checkedIn || isEndingShift} // Disable if already checked in or ending shift
              buttonStyle={styles.button}
            />

            <CustomButton
              title="End shift"
              onPress={handleCheckOut}
              loading={isEndingShift} // Pass isEndingShift to the loading prop
              backgroundColor="#6C757D"
              textColor="#FFF"
              borderRadius={12}
              disabled={!shiftStart || isCheckingIn} // Disable if shift hasn't started or checking in
              buttonStyle={styles.button}
            />

            <CustomButton
              title="Help"
              onPress={() => {}}
              backgroundColor="#DC3545"
              textColor="#FFF"
              borderRadius={12}
              disabled={checkedIn || isCheckingIn || isEndingShift} // Disable if checked in or any operation is loading
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </View>
  );
}