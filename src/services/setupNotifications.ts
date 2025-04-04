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
        const type = notification.data?.type || notification.userInfo?.type;
        console.log('🔍 Notification type:', type);

        switch (type) {
          case 'local_checkin':
            navigation.navigate('Home');
            onTap(); // optional callback`
            break;
          case 'missed_checkin':
            navigation.navigate('EscalationScreen');
            break;
          default:
            navigation.navigate('Shift Details');
            break;
        }

        // onTap(); // optional callback
      }
    },

    // ✅ Ask permissions on all platforms including Android 13+
    requestPermissions: true,
  });
};
