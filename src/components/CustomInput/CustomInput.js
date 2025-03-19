import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Style } from './Style';


export default function CustomInput({
    value,
    onChangeText,
    placeholder,
    label,
    keyboardType,
    secureTextEntry,
    autoCapitalize = 'none',
    style,
    inputStyle,
    error,
    maxLength,
    ...props
}) {

    return (
        <View style={Style.container}>
            {label && <Text style={Style.label}>{label}</Text>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                style={[Style.input, inputStyle]}
                {...props} // Pass additional props like maxLength, multiline, etc.
            />

            {error && <Text style={Style.error}>{error}</Text>}
        </View>
    );
}
