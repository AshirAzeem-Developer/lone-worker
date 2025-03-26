import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import useStyles from './Style';
import images from '../../assets/images';
import icons from '../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../navigators/navigators.params';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  onRightIconPress?: () => void;
  rightIcon?: any;
  backgroundColor?: string;
  textColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  translucent?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = '',
  showBackButton = false,
  showMenu = false,
  onRightIconPress,
  rightIcon,
  backgroundColor = '#13714C',
  textColor = '#fff',
  barStyle = 'light-content',
  translucent = false,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const {styles, sizes, colors} = useStyles();

  return (
    <>
      {/* Status Bar */}
      <StatusBar
        backgroundColor={translucent ? 'transparent' : backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            paddingTop:
              Platform.OS === 'android' && !translucent
                ? StatusBar.currentHeight
                : 0,
          },
        ]}>
        {/* Back Button */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.sideButton}>
            <Image
              source={icons.BACK_ARROW}
              style={[styles.icon]}
              tintColor={textColor}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideButton} />
        )}

        {/* Title or Logo */}
        {title ? (
          <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        ) : (
          <Image source={images.LOGO} style={styles.logo} tintColor={'#fff'} />
        )}

        {/* Right Icon */}
        {showMenu ? (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.sideButton}>
            <Image source={icons.MENU} style={styles.icon} tintColor={'#fff'} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.sideButton}>
            <Image source={rightIcon} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideButton} />
        )}
      </View>
    </>
  );
};

export default CustomHeader;
