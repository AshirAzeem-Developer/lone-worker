import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStyles from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {attendance, checkIn, checkOut} from '../../../services/checkinService';
import {showError, showSuccess} from '../../../utils/helperFunction';

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
          showError('Grace Period has expired! Escalation started!', '');
          setSafetyTextShow(false);
          setCheckedIn(false);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [shiftStart, endTime, safetyTextShow]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        if (notification.userInteraction) {
          initiateSafetyCheck();
        }
      },
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  const handleCheckin = async () => {
    const checkinTime = new Date();
    try {
      if (!shiftStart) {
        const response = await attendance(checkinTime.toISOString());
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
      setTimeRemaining(frequency);
      await scheduleNotification(newEndTime);
    } catch (error: any) {
      console.log('Check-in Error:', error);
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
    cancelAllNotifications();
    PushNotification.localNotificationSchedule({
      id: '1',
      title: 'Safety Check-In Required!',
      message: 'Tap to confirm your safety',
      date: new Date(timestamp),
      allowWhileIdle: true,
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
    <View>
      <CustomHeader title="Home" showBackButton showMenu />
      {safetyTextShow ? (
        <Text style={styles.timerText}>Please send your check-in!</Text>
      ) : (
        <View>
          <Text style={styles.timerText}>Your next check-in is due in:</Text>
          <Text style={styles.time}>{formatTime(timeRemaining)}</Text>
        </View>
      )}

      <CustomButton
        title="Check in"
        onPress={handleCheckin}
        loading={loading}
        backgroundColor="#28A745"
        textColor="#FFF"
        width="200"
        borderRadius={10}
        disabled={checkedIn}
        buttonStyle={styles.loginbtn}
      />

      <CustomButton
        title="End shift"
        onPress={handleCheckOut}
        loading={loading}
        backgroundColor="#28A745"
        textColor="#FFF"
        width="200"
        borderRadius={10}
        disabled={!shiftStart}
        buttonStyle={styles.btn}
      />

      <CustomButton
        title="Help"
        onPress={() => {}}
        backgroundColor="red"
        textColor="#FFF"
        width="200"
        borderRadius={10}
        disabled={checkedIn}
        buttonStyle={styles.btn}
      />
    </View>
  );
}
