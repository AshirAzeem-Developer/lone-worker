import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import {BaseToast, SuccessToast} from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useColors} from '../../constants/color';
import icons from '../../assets/icons';

function SuccessToastMessage(props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SuccessToast
      style={[
        styles.toastMain,
        {backgroundColor: isDarkMode ? 'rgba(0, 128, 0, 0.4)' : '#ffffff'},
      ]}
      contentContainerStyle={styles.toastContainer}
      renderLeadingIcon={() => {
        return (
          <View style={styles.successMainIconConatiner}>
            <Image
              source={icons.CHECK}
              tintColor={'#fff'}
              style={{
                width: width * 0.05,
                height: width * 0.05,
                resizeMode: 'contain',
              }}
            />
          </View>
        );
      }}
      text1Style={[styles.toastText1]}
      text1={props?.toastProps?.text1}
      text1NumberOfLines={3}
      renderTrailingIcon={() => {
        return (
          <TouchableOpacity
            style={styles.crossConatiner}
            onPress={() => {
              props?.toastProps?.hide();
            }}>
            <Image
              source={icons.CROSS}
              tintColor={'#000'}
              style={{
                width: width * 0.05,
                height: width * 0.05,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  toastMain: {
    borderLeftWidth: 1,
    borderLeftColor: '#008000',
    backgroundColor: '#28A745',
    // bottom: height * 0.06,
    // left: width * 0.04,
    borderColor: '#008000',
    borderWidth: 1,
    borderRadius: width * 0.03,
    // position: 'absolute',
  },

  toastContainer: {
    // backgroundColor: "#fff",
    overflow: 'hidden',
    borderRadius: 10,
    // backgroundColor : "red",
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.03,
  },

  toastText1: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },

  crossConatiner: {
    alignSelf: 'center',
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.01,
    marginRight: width * 0.03,
  },

  successMainIconConatiner: {
    alignSelf: 'center',
    backgroundColor: '#008000',
    paddingVertical: height * 0.016,
    paddingHorizontal: width * 0.032,
    marginLeft: width * 0.014,
    borderRadius: width * 0.033,
  },
  iconInneContainer: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.01,
    borderRadius: width / 2,
  },
});

export default SuccessToastMessage;
