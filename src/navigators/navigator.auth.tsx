import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './navigators.params';
import Home from '../screens/App/Home';
import Login from '../screens/Authentication/Login/Login';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen/ForgotPasswordScreen';

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
    </Stack.Navigator>
  );
}
export default AuthStack;
