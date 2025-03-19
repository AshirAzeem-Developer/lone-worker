import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './Style';

export default function CustomPasswordInput({
    value,
    onChangeText,
    placeholder = "Enter Password",
    inputStyle = {},
    containerStyle = {},
    iconColor = "#666",
    borderColor = "#ccc",
}) {
    const [isSecure, setIsSecure] = useState(true); // State for password visibility

    return (
        <View style={[styles.inputContainer, containerStyle, { borderColor }]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isSecure}
                style={[styles.input, inputStyle]}
            />
            
            {/* Eye Icon Inside the Box */}
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.iconContainer}>
                {/* <MaterialIcons 
                    name={isSecure ? "visibility-off" : "visibility"} 
                    size={24} 
                    color={iconColor} 
                /> */}
            </TouchableOpacity>
        </View>
    );
}


