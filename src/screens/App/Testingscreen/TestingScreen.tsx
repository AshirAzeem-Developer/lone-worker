import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  PermissionsAndroid,
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

  const [loading, setLoading] = useState<boolean>(false);
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [shiftStart, setShiftStart] = useState<boolean>(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [safetyTextShow, setSafetyTextShow] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [endTime, setEndTime] = useState<number | null>(null);

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

  const handleCheckin = async () => {
    const checkinTime = new Date();
    try {
      if (!shiftStart) {
        const response = await attendance(checkinTime.toISOString());

        console.log('this is the checkIn response : ', response);

        setShiftStart(true);
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
          checkinTime.toISOString(),
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

      const frequency = 120; // seconds
      const newEndTime = checkinTime.getTime() + frequency * 1000;
      setEndTime(newEndTime);
      console.log('New End Time: ', newEndTime);
      setTimeRemaining(frequency);
      await scheduleNotification(newEndTime);
    } catch (error: any) {
      console.log('Check-in Error from Catch Block:', error);
      showError(error?.message || 'Check-in failed', '');
    }
  };

  const handleCheckOut = async () => {
    try {
      const worker_check_in_id = await AsyncStorage.getItem('checkInID');
      if (!worker_check_in_id) throw new Error('No check-in ID found');

      await checkOut(Number(worker_check_in_id), new Date().toISOString());
      showSuccess('Checked out successfully!', '');
    } catch (error: any) {
      console.log(error);
      showError(error?.message || 'Check-out failed', '');
    } finally {
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
              loading={loading}
              backgroundColor="#28A745"
              textColor="#FFF"
              borderRadius={12}
              disabled={checkedIn}
              buttonStyle={styles.button}
            />

            <CustomButton
              title="End shift"
              onPress={handleCheckOut}
              loading={loading}
              backgroundColor="#6C757D"
              textColor="#FFF"
              borderRadius={12}
              disabled={!shiftStart}
              buttonStyle={styles.button}
            />

            <CustomButton
              title="Help"
              onPress={() => {}}
              backgroundColor="#DC3545"
              textColor="#FFF"
              borderRadius={12}
              disabled={checkedIn}
              buttonStyle={styles.button}
            />
            {/* <CustomButton
              title="Test Notification"
              onPress={() => {
                const date = new Date(Date.now() + 60 * 1000); // 1 minute from now
                console.log(
                  '⏰ Scheduling test notification at:',
                  date.toUTCString(),
                );

                PushNotification.localNotificationSchedule({
                  id: 'test-123', // unique ID
                  channelId: 'default', // important for Android
                  title: '🔔 Scheduled Test Notification',
                  message:
                    'This is a test notification scheduled 1 minute later',
                  date: new Date(Date.now() + 15 * 1000),
                  allowWhileIdle: true,
                  playSound: true,
                  soundName: 'default',
                  useAlarmManager: true,
                  importance: 'high',
                  priority: 'high',
                });

                // Debug: Check all scheduled notifications
                PushNotification.getScheduledLocalNotifications(
                  (notifications: any) => {
                    console.log('📋 Scheduled Notifications:', notifications);

                    const match = notifications.find(
                      (n: any) =>
                        n.id === 'test-123' ||
                        n.message ===
                          'This is a test notification scheduled 1 minute later',
                    );

                    if (match) {
                      console.log(
                        '✅ Test notification is scheduled correctly:',
                        match,
                      );
                    } else {
                      console.warn(
                        '❌ Test notification NOT found in schedule list.',
                      );
                    }
                  },
                );
              }}
              backgroundColor="#007BFF"
              textColor="#FFF"
              borderRadius={12}
              buttonStyle={styles.button}
            /> */}
            {/* <CustomButton
              title="Send Immediate Notification"
              onPress={() => {
                PushNotification.localNotification({
                  channelId: 'default',
                  title: '⚡ Immediate Test',
                  message: 'This is shown right now!',
                  playSound: true,
                  soundName: 'default',
                  importance: 'high',
                  priority: 'high',
                });
              }}
              backgroundColor="#FFC107"
              textColor="#000"
              borderRadius={12}
              buttonStyle={styles.button}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
}
