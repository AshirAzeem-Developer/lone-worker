import React, {useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import CustomSplash from './src/components/CustomSplash';
import ToastHandler from './src/components/Main/ToastHandler';
import RootNavigator from './src/navigators/navigator.root';

import {configureNotifications} from './src/services/notificationService';
import {initDeepLinking} from './src/services/linkingService';
import {getSecureItem} from './src/services/storageService';
import {getPushTokenAndSave} from './src/services/notificationService';

const App = () => {
  const [show, setShow] = useState(true);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    // Initialize push notifications
    configureNotifications();

    // Generate and save token to EncryptedStorage
    getPushTokenAndSave();

    // Handle deep linking
    const removeLinkListener = navigationRef.current
      ? initDeepLinking(navigationRef.current)
      : undefined;

    return () => {
      removeLinkListener?.();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
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
