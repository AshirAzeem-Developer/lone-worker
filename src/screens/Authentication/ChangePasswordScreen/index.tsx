import React, {useState} from 'react';
import {View, Alert, Text} from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {changePassword} from '../../../services/authServices';
import {useMessage} from '../../../components/MessageProvider/MessageProvider';
import useStyles from './Style';
import InputComponent from '../../../components/global/InputComponent';
import {showError} from '../../../utils/helperFunction';
import icons from '../../../assets/icons';

interface ChangePasswordScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  navigation,
}) => {
  const {styles, sizes} = useStyles();

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // ✅ Function to check password strength
  const validatePassword = (password: string): boolean => {
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&+\-])[A-Za-z\d@$!%*?&+\-]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChangePassword = async () => {
    console.log('button pressed');

    if (!oldPassword || !newPassword || !confirmPassword) {
      showError('Please fill all the fields', '');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        'Use 8 or more characters with a mix of letters, numbers & symbols.',
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Call API to change the password
      const response = await changePassword(
        newPassword,
        confirmPassword,
        oldPassword,
      );
      console.log(response);

      // Show success message and navigate back
      Alert.alert('Success', 'Password changed successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setOldPassword('');

      navigation.navigate('Auth', {screen: 'Login'}); // Explicitly specify the 'Login' screen
    } catch (error: any) {
      console.log(error);
      showError(error.message || 'Failed to change password', '');
    }
  };

  return (
    <>
      <CustomHeader title="Change Password" showMenu />

      <View style={styles.container}>
        <InputComponent
          leftIcon={icons.LOCK}
          leftIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          rightIcon={showPassword ? icons.EYE : icons.EYECROSS}
          rightIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Enter Old Password"
          onRightIconPress={() => setShowPassword(!showPassword)}
          secureTextEntry={showPassword ? false : true}
        />

        <InputComponent
          leftIcon={icons.LOCK}
          leftIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          rightIcon={showNewPassword ? icons.EYE : icons.EYECROSS}
          rightIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          onRightIconPress={() => setShowNewPassword(!showNewPassword)}
          secureTextEntry={showNewPassword ? false : true}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="Enter New Password
          "
        />

        <InputComponent
          leftIcon={icons.LOCK}
          leftIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          rightIcon={showConfirmPassword ? icons.EYE : icons.EYECROSS}
          rightIconStyle={{
            width: sizes.WIDTH * 0.05,
            height: sizes.WIDTH * 0.05,
          }}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          secureTextEntry={showConfirmPassword ? false : true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm New Password"
        />

        {/* Show Password Error Message */}
        {newPassword.length > 0 && !validatePassword(newPassword) && (
          <Text style={styles.errorText}>
            Use 8+ characters with letters, numbers & symbols.
          </Text>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          height: sizes.HEIGHT * 0.12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <CustomButton
          disabled={!oldPassword || !newPassword || !confirmPassword}
          title="Update"
          onPress={handleChangePassword}
          buttonStyle={styles.btn}
          backgroundColor="#28A745"
        />
      </View>
    </>
  );
};

export default ChangePasswordScreen;
