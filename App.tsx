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

const App = () => {
  const [show, setShow] = useState(true);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    // Wait for notification permission + token setup
    configureNotifications();

    const timeout = setTimeout(() => {
      if (navigationRef.current) {
        initDeepLinking(navigationRef.current);
      }
    }, 1000); // Delay slightly to ensure navigationRef is not null

    return () => clearTimeout(timeout);
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
