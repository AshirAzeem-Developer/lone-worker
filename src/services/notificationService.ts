// notificationService.ts - Handles push notification setup and listeners
import {Platform, Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import EncryptedStorage from 'react-native-encrypted-storage';

// Configure push notifications (call this during app initialization)
export function configureNotifications(): void {
  // Note: .configure() should be called outside of any component (e.g., at startup)&#8203;:contentReference[oaicite:0]{index=0}
  PushNotification.configure({
    onRegister: function (token: any) {
      console.log('Push notification token:', token);
      // You might store this token using storageService or send it to your server
    },

    onNotification: function (notification: any) {
      console.log('Notification received:', notification);
      // When a notification is opened by the user, handle navigation or deep link
      if (notification.userInteraction) {
        const url = notification.data?.url;
        if (url) {
          Linking.openURL(url); // Open the deep link URL to navigate within the app
        }
      }
      // For iOS: signal that the notification is processed&#8203;:contentReference[oaicite:1]{index=1}
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },

    // Android only: immediately pop initial notification when app starts (default: true)
    popInitialNotification: true,
    // Request permissions on iOS (will prompt on first run). No effect on Android.
    requestPermissions: Platform.OS === 'ios',
  });

  // Android: Create a default channel for notifications (required on Android 8+)
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default', // Unique ID for the channel
        channelName: 'Default Channel', // Visible name of the channel
        importance: 4, // 4 = Importance.HIGH (shows notifications promptly)
        vibrate: true,
      },
      (created: any) => console.log(`Default channel created: ${created}`), // Callback: log whether channel was created
    );
  }
}
export const getPushTokenAndSave = async () => {
  PushNotification.configure({
    onRegister: async function (token: any) {
      console.log('Generated push token:', token.token);
      try {
        await EncryptedStorage.setItem('push_token', token.token);
      } catch (e) {
        console.error('Failed to save push token:', e);
      }
    },
    onNotification: function () {}, // already handled in your config
    popInitialNotification: true,
    requestPermissions: true,
  });
};
