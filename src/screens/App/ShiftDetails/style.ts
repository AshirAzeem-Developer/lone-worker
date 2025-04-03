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
      backgroundColor: '#F8F8F8',
      paddingHorizontal: sizes.WIDTH * 0.04,
      paddingVertical: sizes.HEIGHT * 0.02,
    },

    tableHeader: {
      backgroundColor: '#28A745',

      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    headerText: {
      flex: 1,
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: 'bold',
      color: 'white',
    },
    cell: {
      fontSize: sizes.WIDTH * 0.036,

      color: '#333',
    },
    seeMoreBtn: {
      color: '#28A745',
      fontSize: sizes.WIDTH * 0.029,
      textAlign: 'right',
      marginTop: sizes.HEIGHT * 0.04,
    },
    heading: {
      alignSelf: 'center',
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: '900',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    detailsContainer: {
      height: sizes.HEIGHT * 0.1,
    },
    // Modal Styles
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    },
    modalContainer: {
      width: sizes.WIDTH * 0.85,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 10,
      alignItems: 'flex-start',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      alignSelf: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
    },
    closeBtn: {
      marginTop: 20,
      backgroundColor: '#28A745',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
    },
    closeBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    shiftCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },

    row: {
      flexDirection: 'row',
      marginBottom: 10,
      flexWrap: 'wrap',
    },

    label: {
      fontWeight: 'bold',
      color: '#333',
      width: sizes.WIDTH * 0.3,
      fontSize: 14,
    },

    value: {
      flex: 1,
      color: '#555',
      fontSize: 14,
    },
    dayContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      flex: 1,
    },

    dayPill: {
      backgroundColor: '#28A745',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      marginRight: 6,
      marginBottom: 6,
    },

    dayText: {
      color: '#fff',
      fontSize: 12,
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
