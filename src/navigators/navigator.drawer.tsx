import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';

// Screens

// Services
import {signout} from '../services/authServices';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import icons from '../assets/icons';
import AuthStack from './navigator.auth';
import HighRiskCheckIn from '../screens/App/HighRiskCheckIn/Index';
import ManDownSettings from '../screens/App/ManDownSettings';
import ChangePasswordScreen from '../screens/Authentication/ChangePasswordScreen';
import CheckInHistory from '../screens/App/CheckinHistory';
import NotificationsScreen from '../screens/App/Notifications';
import ShiftDetails from '../screens/App/ShiftDetails';
import TestingScreen from '../screens/App/Testingscreen/TestingScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await signout();
      await AsyncStorage.removeItem('token');
      Alert.alert('Success', 'Signout successful!');
      navigation.navigate('Auth', {screen: 'Login'});
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Signout failed');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={() => (
          <Image
            source={icons.CHECK}
            width={20}
            height={20}
            style={{
              width: 20,
              height: 20,
            }}
          />
        )}
        onPress={handleLogout}
        labelStyle={{color: 'green', fontSize: 16}}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: 'white',
        },
        drawerActiveTintColor: 'gray',
        drawerInactiveTintColor: 'green',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
      initialRouteName="Testing"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HighRiskCheckIn"
        component={HighRiskCheckIn}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={icons.CHECK}
              width={20}
              height={20}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Testing"
        component={TestingScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={icons.CHECK}
              width={20}
              height={20}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ManDownSettings"
        component={ManDownSettings}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={icons.CHECK}
              width={20}
              height={20}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={icons.CHECK}
              width={20}
              height={20}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CheckInHistory"
        component={CheckInHistory}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image
              source={icons.CHECK}
              width={20}
              height={20}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image source={icons.CHECK} width={20} height={20} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="ShiftDetails"
        component={ShiftDetails}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Image source={icons.CHECK} width={20} height={20} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}
