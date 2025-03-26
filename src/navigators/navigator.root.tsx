import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import Home from '../screens/App/Home/index.tsx';
import Login from '../screens/Authentication/Login/Login.tsx';
import AuthStack from './navigator.auth.tsx';
import AppStack from './navigator.app.tsx';
import DrawerNavigator from './navigator.drawer.tsx';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({}) => {
  const isAuthenticated = false;
  //   const user = useUserSelector();
  //   const [isSplashVisible, setIsSplashVisible] = useState(true);
  return <>{isAuthenticated ? <DrawerNavigator /> : <AuthStack />}</>;
};
