import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';

import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import CustomPasswordInput from '../../../components/CustomPassword/CustomPassword';
import { styles } from './Style';
import { changePassword } from '../../../services/authServices';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { useMessage } from '../../../components/MessageProvider/MessageProvider';

interface ChangePasswordScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { showSuccess, showError } = useMessage();

  // ✅ Function to check password strength
  const validatePassword = (password: string): boolean => {
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&+\-])[A-Za-z\d@$!%*?&+\-]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChangePassword = async () => {
    console.log('button pressed');

    if (!oldPassword || !newPassword || !confirmPassword) {
      showError('Please fill all the fields');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        'Use 8 or more characters with a mix of letters, numbers & symbols.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Call API to change the password
      const response = await changePassword(newPassword, confirmPassword, oldPassword);
      console.log(response);

      // Show success message and navigate back
      Alert.alert('Success', 'Password changed successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setOldPassword('');
      
      navigation.navigate('Auth', { screen: 'Login' }); // Explicitly specify the 'Login' screen
    } catch (error: any) {
      console.log(error);
      showError(error.message || 'Failed to change password');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <CustomHeader title="Change Password" showBackButton showMenu />
      </View>
      <View style={styles.container}>
        <CustomInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Enter Old Password"
        />

        <CustomPasswordInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter New Password"
        />

        <CustomPasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm New Password"
        />

        {/* Show Password Error Message */}
        {newPassword.length > 0 && !validatePassword(newPassword) && (
          <Text style={styles.errorText}>
            Use 8+ characters with letters, numbers & symbols.
          </Text>
        )}

        <CustomButton
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
