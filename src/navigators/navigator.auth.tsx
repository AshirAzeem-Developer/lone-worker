import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './navigators.params';
import Login from '../screens/Authentication/Login/Login';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/Authentication/ChangePasswordScreen';
import ResetPasswordScreen from '../screens/Authentication/ResetPasswordScreen';
import TestingScreen from '../screens/App/Testingscreen/TestingScreen';

//Screens

//bottom tab

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      <Stack.Screen name="Testing" component={TestingScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
