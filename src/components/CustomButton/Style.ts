


import { StyleSheet } from 'react-native';
import { useColors } from '../../constants/color';
import { useSizes } from '../../constants/size';
import { getGlobalStyles } from '../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: 16,
        fontWeight: '600',
      },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
