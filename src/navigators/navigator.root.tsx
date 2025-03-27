import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

// Navigators
import AuthStack from './navigator.auth.tsx';
import DrawerNavigator from './navigator.drawer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuth} from '../store/reducer/authSlice.ts';
import {RootState} from '../store/store.ts';
import {useAppSelector, useAppDispatch} from '../store/reducer/hooks.ts';

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const {isAuthenticated, loading} = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (loading) return null; // Splash or loader

  return isAuthenticated ? <DrawerNavigator /> : <AuthStack />;
};

export default RootNavigator;
