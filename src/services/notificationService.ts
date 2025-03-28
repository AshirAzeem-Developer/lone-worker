import {Platform, Linking, PermissionsAndroid, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';

export async function configureNotifications(): Promise<void> {
  // Android: request notification permission
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission required', 'Please enable notifications');
      return;
    }

    // Create default notification channel
    PushNotification.createChannel(
      {
        channelId: 'default',
        channelName: 'Default Channel',
        importance: 4,
        vibrate: true,
      },
      (created: any) => console.log(`Default channel created: ${created}`),
    );
  }

  // Request FCM permissions and get token
  try {
    await messaging().requestPermission();
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);

    if (fcmToken) {
      await EncryptedStorage.setItem('push_token', fcmToken);
    } else {
      console.warn('FCM Token is null');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }

  // Configure local + remote notifications
  PushNotification.configure({
    // onRegister won't work for FCM token — handled above
    onRegister: function () {
      // Left empty intentionally
    },

    onNotification: function (notification: any) {
      console.log('Notification received:', notification);

      if (notification.userInteraction) {
        const url = notification.data?.url;
        if (url) {
          Linking.openURL(url);
        }
      }

      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
}
