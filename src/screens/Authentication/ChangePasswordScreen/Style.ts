import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: height * 0.04,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  btn: {
    alignSelf: 'center',
  },
});
