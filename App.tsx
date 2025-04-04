import React, {useEffect, useRef, useState} from 'react';
import 'react-native-url-polyfill/auto';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

import CustomSplash from './src/components/CustomSplash';
import ToastHandler from './src/components/Main/ToastHandler';
import RootNavigator from './src/navigators/navigator.root';
import {
  configureFirebaseNotifications,
  linkingConfig,
  listenForForegroundNotifications,
} from './src/services/notificationService';
import PushNotification from 'react-native-push-notification';
import {initDeepLinking} from './src/services/linkingService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [show, setShow] = useState(true);
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);

  PushNotification.createChannel(
    {
      channelId: 'default', // must match the one used below
      channelName: 'Default Channel',
      importance: 4,
      vibrate: true,
    },
    (created: any) =>
      console.log(`Notification channel created from App.tsx: ${created}`),
  );

  useEffect(() => {
    configureFirebaseNotifications();
    listenForForegroundNotifications();
    const cleanup = initDeepLinking(navigationRef as any);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          linking={linkingConfig}
          ref={navigationRef}
          fallback={<ActivityIndicator />}>
          {show ? (
            <CustomSplash show={show} onEnd={() => setShow(false)} />
          ) : (
            <DataWrapper
              children={<RootNavigator />}
              key={Math.random().toString()}
            />
          )}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const DataWrapper = ({children}: {children: React.ReactNode}) => (
  <>
    {children}
    <ToastHandler />
  </>
);
