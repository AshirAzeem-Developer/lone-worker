import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Alert, Platform} from 'react-native';

export const initializeNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('Push Notification Token:', token);
    },
    onNotification: function (notification) {
      console.log('Notification Received:', notification);
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default-channel',
        name: 'Default Channel',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
  }
};

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default',
        name: 'Default Channel',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
  }

  try {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions().then(permissions => {
        if (!permissions.alert) {
          throw new Error('Permission not granted for push notifications');
        }
      });
    }
  } catch (error) {
    console.error('Push Notification Permission Error:', error);
    Alert.alert('Error', error.message);
  }
};

export const schedulePushNotification = async time => {
  PushNotification.localNotificationSchedule({
    channelId: 'default',
    title: 'Your Loneworker Check-in is due',
    message: 'Please click here to open the app and check in',
    date: new Date(Date.now() + time * 1000),
    allowWhileIdle: true,
    repeatType: 'time',
    repeatTime: time * 1000,
    vibrate: true,
    playSound: true,
    soundName: 'default',
    priority: 'high',
  });
};

export const cancelAllScheduledNotifications = async () => {
  try {
    PushNotification.cancelAllLocalNotifications();
    console.log('All scheduled notifications have been canceled.');
  } catch (error) {
    console.error('Error canceling scheduled notifications:', error);
  }
};
