import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { styles } from './Style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import api from '../../../services/api';
import { useMessage } from '../../../components/MessageProvider/MessageProvider';

interface ForgotPasswordScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const { showSuccess, showError } = useMessage();

    const handleResetPassword = async () => {
        try {
            const response = await api.post('/worker/forgot-password', { email });
            console.log(response);
            showSuccess(response.data.message);
            setEmail('');
        } catch (error: any) {
            showError(error.response?.data?.message || 'Failed to send reset link');
        }
    };

    return (
        <>
            <View style={styles.header}>
                <CustomHeader title="Change Password" showBackButton />
            </View>

            <View style={styles.container}>
                <CustomInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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
