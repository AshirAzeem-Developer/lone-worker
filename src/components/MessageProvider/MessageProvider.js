import React, { createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export default function MessageProvider({ children }) {
    // Function to show a success message
    const showSuccess = (message) => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: message,
            visibilityTime: 3000,
            position: 'top',
            backgroundColor: '#28A745', // Change success color
        });
    };

    // Function to show an error message
    const showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            visibilityTime: 3000,
            position: 'top',
        });
    };

    return (
        <MessageContext.Provider value={{ showSuccess, showError }}>
            {children}
            <Toast />
        </MessageContext.Provider>
    );
}
