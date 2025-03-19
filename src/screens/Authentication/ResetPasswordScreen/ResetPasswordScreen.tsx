import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { styles } from './Style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import api from '../../../services/api';

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

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ route, navigation }) => {
    const { code, email } = route.params;
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const handleResetPassword = async () => {
        try {
            const response = await api.post('/worker/reset-password', {
                token: code,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            });
            Alert.alert('Success', response.data.message);
            navigation.navigate('Login'); // Navigate to login screen after reset
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Password reset failed');
        }
    };

    return (
        <>
            <View style={styles.header}>
                <CustomHeader title="Change Password" showBackButton />
            </View>

            <View style={styles.container}>
                <CustomInput
                    placeholder="New Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Confirm New Password"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry
                />
                <CustomButton title="Reset Password" onPress={handleResetPassword} />
            </View>
        </>
    );
};

export default ResetPasswordScreen;
