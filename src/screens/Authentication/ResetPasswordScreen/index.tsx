import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import api from '../../../services/api';
import InputComponent from '../../../components/global/InputComponent';
import icons from '../../../assets/icons';
import useStyles from '../Login/Style';
import {showError, showSuccess} from '../../../utils/helperFunction';

interface ResetPasswordScreenProps {
  route: {
    params: {
      code: string;
      email: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  route,
  navigation,
}) => {
  const {styles, sizes} = useStyles();
  const {code, email} = route.params;
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleResetPassword = async () => {
    try {
      const response = await api.post('/worker/reset-password', {
        token: code,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });
      showSuccess('Success', response.data.message);
      navigation.navigate('Login'); // Navigate to login screen after reset
    } catch (error: any) {
      showError(
        'Error',
        error.response?.data?.message || 'Password reset failed',
      );
    }
  };

  return (
    <>
      <View>
        <CustomHeader title="Reset Password" showBackButton />
      </View>

      <View style={styles.container}>
        <InputComponent
          leftIcon={icons.LOCK}
          leftIconStyle={{
            width: sizes.WIDTH * 0.06,
            height: sizes.WIDTH * 0.06,
          }}
          rightIcon={showPassword ? icons.EYE : icons.EYECROSS}
          rightIconStyle={{
            width: sizes.WIDTH * 0.06,
            height: sizes.WIDTH * 0.06,
          }}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter New Password"
          onRightIconPress={() => setShowPassword(!showPassword)}
          secureTextEntry={showPassword ? false : true}
        />
        <InputComponent
          leftIcon={icons.LOCK}
          leftIconStyle={{
            width: sizes.WIDTH * 0.06,
            height: sizes.WIDTH * 0.06,
          }}
          rightIcon={showPassword ? icons.EYE : icons.EYECROSS}
          rightIconStyle={{
            width: sizes.WIDTH * 0.06,
            height: sizes.WIDTH * 0.06,
          }}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Confirm New Password"
          onRightIconPress={() => setShowNewPassword(!showNewPassword)}
          secureTextEntry={showNewPassword ? false : true}
        />
        <CustomButton
          title="Reset Password"
          buttonStyle={{
            width: sizes.WIDTH * 0.9,
            height: sizes.HEIGHT * 0.07,
            marginTop: sizes.HEIGHT * 0.02,
            backgroundColor: '#4CAF50',
            borderRadius: sizes.WIDTH * 0.02,
          }}
          onPress={handleResetPassword}
        />
      </View>
    </>
  );
};

export default ResetPasswordScreen;
