


import { StyleSheet } from 'react-native';
import { useColors } from '../../../constants/color';
import { useSizes } from '../../../constants/size';
import { getGlobalStyles } from '../../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',

    },
    pinInput: {
      marginTop: sizes.HEIGHT * 0.34,
      width: sizes.WIDTH * 0.7,
 
    },
    passInput: {
      width: sizes.WIDTH * 0.9,

    },
    loginBtn: {
      width: sizes.WIDTH * 0.6,
      alignSelf: 'center',
      marginTop: sizes.HEIGHT * 0.04,

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
      marginTop: sizes.HEIGHT * 0.01,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
