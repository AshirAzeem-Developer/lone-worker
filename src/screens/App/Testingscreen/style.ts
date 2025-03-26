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
      backgroundColor: '#F4F6F8',
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    card: {
      // backgroundColor: '#FFFFFF',
      // borderRadius: 16,
      padding: 24,
      width: '100%',
      // elevation: 6,
      // shadowColor: '#000',
      // shadowOpacity: 0.08,
      // shadowRadius: 10,
      // shadowOffset: {width: 0, height: 4},
      alignItems: 'center',
    },
    timerLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: '#555',
      marginBottom: 4,
      textAlign: 'center',
    },
    timerCountdown: {
      fontSize: 22,
      fontWeight: '700',
      color: '#28A745',
      marginBottom: 24,
      textAlign: 'center',
    },
    alertText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#D32F2F',
      marginBottom: 24,
      textAlign: 'center',
    },
    buttonGroup: {
      width: '100%',
      gap: 10,
    },
    button: {
      width: '100%',
      paddingVertical: 12,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
