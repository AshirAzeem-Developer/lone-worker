import {Platform, Linking, PermissionsAndroid, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import EncryptedStorage from 'react-native-encrypted-storage';

export async function configureNotifications(): Promise<void> {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission required', 'Please enable notifications');
      return;
    }

    // Create default channel
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

  PushNotification.configure({
    onRegister: async function (token: any) {
      console.log('Push notification token:', token);
      try {
        await EncryptedStorage.setItem('push_token', token.token);
      } catch (e) {
        console.error('Failed to save push token:', e);
      }
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
