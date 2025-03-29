import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export const initializeLocalNotifications = (
  onTap: () => void,
  navigation: any,
) => {
  PushNotification.createChannel(
    {
      channelId: 'default', // must match the one used in schedule
      channelName: 'Default Channel',
      channelDescription: 'A channel for safety check-ins',
      importance: 4, // Max importance for heads-up notification
      vibrate: true,
    },
    (created: any) => console.log('Notification channel created:', created),
  );
  PushNotification.configure({
    onNotification: function (notification: any) {
      console.log('📥 Notification received:', notification);
      if (notification.userInteraction) {
        navigation.navigate('Shift Details');
        onTap();
      }
    },
    // ✅ Ask permissions on all platforms including Android 13+
    requestPermissions: true,
  });
};
