// import {Platform, Linking, PermissionsAndroid, Alert} from 'react-native';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import EncryptedStorage from 'react-native-encrypted-storage';

// export async function configureNotifications(): Promise<void> {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//       Alert.alert('Permission required', 'Please enable notifications');
//       return;
//     }

//     // Create default channel
//     PushNotification.createChannel(
//       {
//         channelId: 'default',
//         channelName: 'Default Channel',
//         importance: 4,
//         vibrate: true,
//       },
//       (created: any) => console.log(`Default channel created: ${created}`),
//     );
//   }

//   PushNotification.configure({
//     onRegister: async function (token: any) {
//       console.log('Push notification token:', token);
//       try {
//         await EncryptedStorage.setItem('push_token', token.token);
//       } catch (e) {
//         console.error('Failed to save push token:', e);
//       }
//     },

//     onNotification: function (notification: any) {
//       console.log('Notification received:', notification);

//       if (notification.userInteraction) {
//         const url = notification.data?.url;
//         if (url) {
//           Linking.openURL(url);
//         }
//       }

//       if (Platform.OS === 'ios') {
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//       }
//     },

//     popInitialNotification: true,
//     requestPermissions: Platform.OS === 'ios',
//   });
// }
// export async function requestExactAlarmPermission(): Promise<void> {
//   if (Platform.OS === 'android' && Platform.Version >= 31) {
//     Alert.alert(
//       'Exact Alarm Permission Needed',
//       'To allow scheduled safety check-ins, please enable "Schedule exact alarms" in app settings.',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Open Settings',
//           onPress: () => {
//             Linking.openSettings();
//           },
//         },
//       ],
//     );
//   }
// }

// src/services/notificationService.ts
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LinkingOptions} from '@react-navigation/native';
import {showError} from '../utils/helperFunction';
import PushNotification from 'react-native-push-notification';
const NAVIGATION_IDS = ['home', 'post', 'settings'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId:', navigationId);
    return null;
  }

  if (navigationId === 'home') return 'myapp://home';
  if (navigationId === 'settings') return 'myapp://settings';

  const postId = data?.postId;
  if (typeof postId === 'string') {
    return `myapp://post/${postId}`;
  }

  console.warn('Missing postId');
  return null;
}

export const linkingConfig: LinkingOptions<any> = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'home',
      Post: 'post/:id',
      Settings: 'settings',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) return url;

    const initialMessage = await messaging().getInitialNotification();
    const deepLink = buildDeepLinkFromNotificationData(initialMessage?.data);
    return deepLink || null;
  },
  subscribe(listener) {
    const linkingSub = Linking.addEventListener('url', ({url}) =>
      listener(url),
    );
    const unsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage: any) => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (url) listener(url);
      },
    );

    return () => {
      linkingSub.remove();
      unsubscribe();
    };
  },
};

export async function configureFirebaseNotifications(): Promise<void> {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Notifications Disabled',
          'You have permanently disabled notifications. Please enable them from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Required', 'Please enable notifications.');
        return;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      showError('Notifications are disabled or not authorized.', '');
      return;
    }

    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    await EncryptedStorage.setItem('push_token', token);
  } catch (err) {
    console.error('FCM permission/token error:', err);
  }
}

export function listenForForegroundNotifications() {
  messaging().onMessage(async remoteMessage => {
    console.log('📬 Foreground notification received:', remoteMessage);
    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification?.title || 'Notification',
      message: remoteMessage.notification?.body || '',
      playSound: true,
      soundName: 'default',
      importance: 'high',
    });
    // Alert.alert(
    //   remoteMessage.notification?.title || 'New Notification',
    //   remoteMessage.notification?.body || '',
    // );
  });
}
