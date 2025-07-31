import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import useStyles from './Style';

import {login, signout} from '../../../services/authServices';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import {showError, showSuccess} from '../../../utils/helperFunction';
import InputComponent from '../../../components/global/InputComponent';
import {validatePassword, validatePin} from '../../../utils/validator';
import CustomButton from '../../../components/CustomButton/CustomButton';
import icons from '../../../assets/icons';
import {screen} from '../../../utils/constants';
import {loginSuccess} from '../../../store/reducer/authSlice';
import {useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {styles, colors} = useStyles();

  const [pin, setPin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    // PushNotification.localNotification({
    //   channelId: 'default',
    //   title: 'Test Notification',
    //   message: 'Hello from local notification!',
    // });
    try {
      const push_token = await EncryptedStorage.getItem('push_token');
      const response = await login(pin, password, push_token as string);
      console.log('Token is', push_token);
      showSuccess('Login successful!', '');
      console.log('Login response:', response);
      await EncryptedStorage.setItem('token', response.token);
      // navigation.navigate('Testing');
      dispatch(loginSuccess());
      setPassword('');
      setPin('');
    } catch (error: any) {
      if (!pin) {
        showError(error.errors?.pin || 'Pin is required', '');
      }
      if (!password) {
        showError(error.errors?.password || 'Password is required', '');
      } else {
        showError(error.message || 'Login failed', '');
        console.log('Login error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    try {
      await signout();
      await EncryptedStorage.removeItem('token');
      Alert.alert('Success', 'Signout successful!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Signout failed');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      let retries = 0;
      let token = null;
      while (!token && retries < 5) {
        token = await EncryptedStorage.getItem('push_token');
        if (!token) {
          await new Promise(res => setTimeout(res, 1000)); // wait 1 sec
          retries++;
        }
      }
      if (!token) {
        showError(
          'Push token not ready. Please wait a moment and try again.',
          '',
        );
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <CustomHeader />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: colors.WHITE}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                height: screen.height * 0.2,
                width: screen.width * 0.9,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.loginText}>Login</Text>
            </View>

            <View style={styles.container}>
              <InputComponent
                label="Enter Pin"
                onChangeText={setPin}
                value={pin}
                placeholder="Enter Pin"
                keyboardType="numeric"
                maxLength={10}
                errorHandler={[
                  {
                    validator: validatePin,
                    errorText: 'Pin must be 6 to 10 digits',
                  },
                ]}
              />

              <InputComponent
                label="Enter Password"
                onChangeText={setPassword}
                value={password}
                iconStyles={{
                  width: 20,
                  height: 20,
                }}
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                errorHandler={[
                  {
                    validator: validatePassword,
                    errorText: 'Password must be 8 characters long',
                  },
                ]}
                rightIcon={showPassword ? icons.EYE : icons.EYECROSS}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password</Text>
              </TouchableOpacity>

              <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
                backgroundColor="#28A745"
                textColor="#FFF"
                borderRadius={10}
                buttonStyle={styles.loginBtn}
                disabled={loading || !pin || !password}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
