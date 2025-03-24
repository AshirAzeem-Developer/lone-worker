import React, {useState, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {useSizes} from '../../constants/size';
import {getGlobalStyles} from '../../constants/globalStyles';
import {useColors} from '../../constants/color';

type Props = {
  placeholder: string;
  placeholderTextColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  errorHandler?: {
    errorText: string;
    validator: (text: string) => boolean;
  }[];
  leftIcon?: any;
  rightIcon?: any;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  style?: any;
  keyboardType?: any;
  autoFocus?: boolean;
  multiline?: boolean;
  editable?: boolean;
  showBottomBorder?: boolean;
  label?: string;
  iconStyles?: ImageStyle;
  maxLength?: number;
  leftIconStyle?: ImageStyle;
  rightIconStyle?: ImageStyle;
};

const InputComponent = ({
  iconStyles,
  label,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  errorHandler,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  secureTextEntry,
  style,
  keyboardType,
  autoFocus,
  multiline,
  editable,
  showBottomBorder = true,
  maxLength,
  leftIconStyle,
  rightIconStyle,
  ...props
}: Props) => {
  const {colors, styles} = useStyles();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleTextChange = (text: string) => {
    setShowError(true);
    if (errorHandler) {
      const errors = errorHandler
        .filter(item => !item.validator(text))
        .map(item => item.errorText);
      setError(errors.length > 0 ? errors[errors.length - 1] : '');
    }
    onChangeText(text);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.container,
          showBottomBorder && {
            borderBottomWidth: 2,
            borderBottomColor: value ? colors.BLACK : colors.GRAY,
          },
          style,
        ]}>
        {/* Left Icon */}
        {leftIcon && (
          <TouchableOpacity activeOpacity={0.7} onPress={onLeftIconPress}>
            <Image source={leftIcon} style={leftIconStyle || iconStyles} />
          </TouchableOpacity>
        )}

        {/* Text Input */}
        <TextInput
          {...props}
          editable={editable}
          multiline={multiline}
          autoFocus={autoFocus}
          onChangeText={handleTextChange}
          value={value}
          secureTextEntry={secureTextEntry}
          style={[styles.input, {color: colors.TEXT}]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || colors.GRAY}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />

        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
            <Image source={rightIcon} style={rightIconStyle || iconStyles} />
          </TouchableOpacity>
        )}
      </View>
      {showError && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputComponent;

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: '100%',
          marginBottom: 10, // Space for error text
        },
        container: {
          width: '100%',
          height: sizes.HEIGHT * 0.06,
          borderRadius: sizes.BORDER_RADIUS * 1.2,
          flexDirection: 'row',
          paddingHorizontal: sizes.PADDING,
          alignItems: 'center',
          borderWidth: 1.5, // Restored full border
          borderColor: colors.GRAY, // Border color
          backgroundColor: colors.WHITE, // Background color
        },
        input: {
          flex: 1,
          paddingVertical: sizes.HEIGHT * 0.005,
          paddingHorizontal: sizes.PADDING / 2,
          ...globalStyles.TEXT_STYLE,
          fontSize: sizes.WIDTH * 0.035,
        },
        icon: {
          width: sizes.ICON * 0.6,
          height: sizes.ICON * 0.6,
          marginRight: sizes.PADDING / 2,
          resizeMode: 'contain',
        },
        errorText: {
          color: colors.RED,
          fontSize: sizes.WIDTH * 0.03,
          marginTop: sizes.HEIGHT * 0.01,
        },
        label: {
          ...globalStyles.TEXT_STYLE,
          fontSize: sizes.WIDTH * 0.03,
          color: colors.TEXT,
          marginBottom: sizes.HEIGHT * 0.01,
          fontWeight: 'bold',
        },
      }),
    [colors, sizes],
  );

  return {colors, sizes, globalStyles, styles};
};
