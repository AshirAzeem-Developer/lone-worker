import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pinInput: {
    marginTop: height * 0.34,
    width: width * 0.7,
    //    alignSelf:"center",
  },
  passInput: {
    width: width * 0.9,
    //   alignSelf:"center",
  },
  loginBtn: {
    // alignSelf:"center",
    width: width * 0.5,
    alignSelf: 'center',
  },
  eyeIcon: {},
  // passContainer: {
  //     display: "flex",
  //     flexDirection: "row"
  // },
  header: {
    // marginTop: height * 0.04
  },
  forgotPassword: {
    color: 'green',
    alignSelf: 'center',
  },
});
