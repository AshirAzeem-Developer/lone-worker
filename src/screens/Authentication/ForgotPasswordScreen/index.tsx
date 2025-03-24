import React, {useState} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import api from '../../../services/api';
import {useMessage} from '../../../components/MessageProvider/MessageProvider';
import InputComponent from '../../../components/global/InputComponent';
import {
  showError,
  showSuccess,
  showWarning,
} from '../../../utils/helperFunction';
import {validateEmail} from '../../../utils/validator';
import icons from '../../../assets/icons';
import {screen} from '../../../utils/constants';
import useStyles from './Style';

interface ForgotPasswordScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const {styles, sizes} = useStyles();
  const [email, setEmail] = useState<string>('');

  const handleResetPassword = async () => {
    try {
      const response = await api.post('/worker/forgot-password', {email});
      console.log(response);
      showSuccess(response.data.message || 'Reset link sent to your email', '');
      setEmail('');
    } catch (error: any) {
      showWarning(
        error.response?.data?.message || 'Failed to send reset link',
        '',
      );
    }
  };

  return (
    <>
      <View style={styles.header}>
        <CustomHeader title="Forgot Password" showBackButton />
      </View>

      <View style={styles.container}>
        <InputComponent
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          errorHandler={[
            {
              errorText: 'Please enter a valid email',
              validator: validateEmail,
            },
          ]}
          leftIcon={icons.EMAIl}
          iconStyles={{
            width: screen.width * 0.05,
            height: screen.width * 0.05,
          }}
        />
        <CustomButton
          buttonStyle={styles.btn}
          title="Send Reset Link"
          backgroundColor="#28A745"
          onPress={handleResetPassword}
        />
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
