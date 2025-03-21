import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { RootNavigator } from './src/navigators/stack.navigator';

//store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import CustomSplash from './src/components/CustomSplash';
import ToastHandler from './src/components/Main/ToastHandler';

const App = () => {
  const [show, setshow] = useState(true);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        {show ? (
              <CustomSplash show={show} onEnd={() => setshow(false)} />
            ) : (
              <DataWrapper
                children={<RootNavigator />}
                key={Math.random().toString()}
              />
            )}
          {/* <RootNavigator /> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;


const DataWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
      <ToastHandler />
    </>
  );
};