


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
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    pinInput: {
      marginTop: sizes.HEIGHT * 0.34,
      width: sizes.WIDTH * 0.7,
      //    alignSelf:"center",
    },
    passInput: {
      width: sizes.WIDTH * 0.9,
      //   alignSelf:"center",
    },
    loginBtn: {
      // alignSelf:"center",
      width: sizes.WIDTH * 0.5,
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

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
