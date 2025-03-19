import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Home from '../screens/App/Home/index.tsx';
import Login from '../screens/Authentication/Login/Login.tsx';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
