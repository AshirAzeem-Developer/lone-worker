import {Dimensions, Platform} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const screen = {
  width: screenWidth,
  height: screenHeight,
};