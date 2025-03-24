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
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      // marginTop: sizes.HEIGHT * 0.04,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    btn: {
      alignSelf: 'center',
      width: sizes.WIDTH * 0.9,
      height: sizes.HEIGHT * 0.06,
      marginTop: sizes.HEIGHT * 0.02,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
