import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { styles } from './Style';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View } from 'react-native';

export default function CustomButton({
    title,
    onPress,
    disabled = false,
    loading = false,
    buttonStyle,
    textStyle,
    backgroundColor = "#007BFF",
    textColor = "#FFFFFF",
    borderRadius = 5,
    width = "80%",
    height = 50,
    logo,
}) {
    return (


        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: disabled ? "#A9A9A9" : backgroundColor, borderRadius, width, height },
                buttonStyle,
            ]}
        >
        <View style={{display:"flex",flexDirection:"row"}}>
        {logo ? (
                     <>
                   <Icon name="fa-solid fa-house" size={20} color={textColor}/>
                     </>
            ):(<></>)}
        {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
            )}
           
        </View>
          
        </TouchableOpacity>
    );
}
