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
      flexDirection: 'column',
      paddingHorizontal: sizes.WIDTH * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      height: sizes.HEIGHT * 0.35,
      paddingBottom: sizes.HEIGHT * 0.1,
      marginBottom: sizes.HEIGHT * 0.1,
      marginTop: sizes.HEIGHT * 0.05,
    },
    loginText: {
      ...globalStyles.TEXT_STYLE_BOLD,
      color: colors.BLACK,
      fontSize: sizes.WIDTH * 0.08,
      alignSelf: 'center',
    },
    pinInput: {
      marginTop: sizes.HEIGHT * 0.34,
      width: sizes.WIDTH * 0.7,
    },
    passInput: {
      width: sizes.WIDTH * 0.9,
    },
    loginBtn: {
      width: sizes.WIDTH * 0.9,
      alignSelf: 'center',
      marginTop: sizes.HEIGHT * 0.04,
    },

    forgotPassword: {
      color: 'green',
      alignSelf: 'flex-end',
      marginTop: sizes.HEIGHT * 0.01,
      marginRight: sizes.WIDTH * 0.01,
    },
    forgotPasswordContainer: {
      width: sizes.WIDTH * 0.9,
      alignItems: 'flex-end',
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
