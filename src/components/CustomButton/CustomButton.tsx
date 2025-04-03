import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import useStyles from './Style';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  width?: string | number;
  height?: number;
  logoName?: string; // FontAwesome icon name
  iconSize?: number;
  iconColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
  backgroundColor = '#007BFF',
  textColor = '#FFFFFF',
  borderRadius = 5,
  width = '80%',
  height = 50,
  logoName,
  iconSize = 20,
  iconColor,
}) => {
  const isDisabled = disabled || loading;
  const {styles, colors} = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: isDisabled ? '#A9A9A9' : backgroundColor,
          borderRadius,
          width: typeof width === 'number' ? width : parseFloat(width),
          height,
        },
        buttonStyle,
      ]}>
      <View style={styles.innerContainer}>
        {logoName && !loading && (
          <Icon
            name={logoName}
            size={iconSize}
            color={iconColor || textColor}
            style={{marginRight: 8}}
          />
        )}
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <Text style={[styles.text, {color: textColor}, textStyle]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
