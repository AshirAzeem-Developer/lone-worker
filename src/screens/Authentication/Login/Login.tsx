import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './Style';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { login, signout } from '../../../Services/authServices';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import CustomPasswordInput from '../../../components/CustomPassword/CustomPassword';
import { useMessage } from '../../../components/MessageProvider/MessageProvider';
import EncryptedStorage from 'react-native-encrypted-storage';

interface LoginScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [pin, setPin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { showSuccess, showError } = useMessage();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const push_token = await EncryptedStorage.getItem('push_token');
            console.log(push_token);

            const response = await login(pin, password, push_token);
            showSuccess('Login successful!');
            await EncryptedStorage.setItem('token', response.token);
            navigation.navigate('Testing');
            setPassword('');
            setPin('');
        } catch (error: any) {
            if (!pin) {
                showError(error.errors?.pin || 'Pin is required');
            }
            if (!password) {
                showError(error.errors?.password || 'Password is required');
            } else {
                showError(error.message || 'Login failed');
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

    return (
        <View>
            <View style={styles.header}>
                <CustomHeader title="Login" />
            </View>

            <View style={styles.container}>
                {/* Pin number input */}
                <CustomInput
                    keyboardType="numeric"
                    inputStyle={styles.pinInput}
                    maxLength={6}
                    value={pin}
                    onChangeText={setPin}
                    placeholder="Enter Pin Number"
                    label=""
                />

                {/* Password Input */}
                <CustomPasswordInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    inputStyle={styles.passInput}
                    maxLength={6}
                    placeholder="Enter Password"
                />

                <CustomButton
                    title="Login"
                    onPress={handleLogin}
                    loading={loading}
                    backgroundColor="#28A745"
                    textColor="#FFF"
                    borderRadius={10}
                    buttonStyle={styles.loginBtn}
                />

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
