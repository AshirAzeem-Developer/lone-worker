import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

// Navigators
import AuthStack from './navigator.auth.tsx';
import DrawerNavigator from './navigator.drawer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuth} from '../store/reducer/authSlice.ts';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (loading) return null; // Splash or loader

  return isAuthenticated ? <DrawerNavigator /> : <AuthStack />;
};

export default RootNavigator;
