import {StyleSheet} from 'react-native';
import {useColors} from '../../../constants/color';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
    },
    loginbtn: {
      marginTop: sizes.HEIGHT * 0.13,
      alignSelf: 'center',
    },
    btn: {
      alignSelf: 'center',
    },
    timerText: {
      fontSize: 17,
      textAlign: 'center',
      marginTop: 20,
      color: '#808080',
      fontWeight: 'bold',
    },
    time: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
      color: '#808080',
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
