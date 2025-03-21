import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from '../../constants/color';

function WarningToastMessage(props) {
  return (
    <BaseToast
      style={styles.toastMain}
      contentContainerStyle={styles.toastContainer}
      renderLeadingIcon={() => {
        return (
          <View style={styles.errorMainIconContainer}>
            <Icon name="exclamation-triangle" color={'#fff'} size={22} />
          </View>
        );
      }}
      renderTrailingIcon={() => {
        return (
          <TouchableOpacity
            style={styles.crossConatiner}
            onPress={() => {
              props?.toastProps?.hide();
            }}>
            <Icon name="times" color={'#000'} size={22} solid={false} />
          </TouchableOpacity>
        );
      }}
      text1Style={styles.toastText1}
      text1={props?.toastProps?.text1}
      text1NumberOfLines={2}
    />
  );
}

const styles = StyleSheet.create({
  toastMain: {
    borderLeftWidth: 1,
    borderLeftColor: '#EE9500',
    backgroundColor: '#FEF7EA',
    borderColor: '#EE9500',
    borderWidth: 1,
    borderRadius: 10,
    // position: 'absolute',
  },

  toastContainer: {
    backgroundColor: '#FEF7EA',
    overflow: 'hidden',
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.03,
  },

  toastText1: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Montserrat-Medium',
  },

  errorMainIconContainer: {
    alignSelf: 'center',
    backgroundColor: '#EE9500',
    paddingVertical: height * 0.013,
    paddingHorizontal: width * 0.023,
    marginLeft: width * 0.02,
    borderRadius: width * 0.025,
  },

  crossConatiner: {
    alignSelf: 'center',
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.01,
    marginRight: width * 0.03,
  },
});

export default WarningToastMessage;