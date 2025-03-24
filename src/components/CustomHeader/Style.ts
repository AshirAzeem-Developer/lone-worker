import {StyleSheet} from 'react-native';
import {useColors} from '../../constants/color';
import {useSizes} from '../../constants/size';
import {getGlobalStyles} from '../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    header: {
      height: sizes.HEIGHT * 0.12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: sizes.WIDTH * 0.02,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    sideButton: {
      width: sizes.WIDTH * 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    logo: {
      height: sizes.WIDTH * 0.1,
      width: sizes.WIDTH * 0.1,
      alignSelf: 'center',
      flex: 1,
      marginTop: sizes.HEIGHT * 0.03,
    },
    icon: {
      width: sizes.WIDTH * 0.05,
      height: sizes.WIDTH * 0.05,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
