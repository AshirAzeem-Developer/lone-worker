import {StyleSheet} from 'react-native';
import {useColors} from '../../../constants/color';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);
  const CELL_WIDTH = sizes.WIDTH * 0.23;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      paddingHorizontal: sizes.WIDTH * 0.04,
      paddingVertical: sizes.HEIGHT * 0.02,
    },
    heading: {
      ...globalStyles.TEXT_STYLE,
      alignSelf: 'center',
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: '900',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    tableContent: {
      padding: sizes.WIDTH * 0.02,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#28A745',
      paddingVertical: sizes.HEIGHT * 0.015,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: sizes.WIDTH * 0.02,
    },
    headerText: {
      ...globalStyles.TEXT_STYLE_BOLD,
      width: CELL_WIDTH,
      fontSize: sizes.WIDTH * 0.032,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },

    tableRow: {
      flexDirection: 'row',
      paddingVertical: 12,
      marginVertical: 2,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'flex-start', // align to start to match headers
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingHorizontal: 10,
    },

    cell: {
      ...globalStyles.TEXT_STYLE,
      width: CELL_WIDTH,
      fontSize: sizes.WIDTH * 0.03,
      color: '#000000',
      textAlign: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    pageButton: {
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    pageNumber: {
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    activePage: {
      backgroundColor: 'green',
    },
    pageText: {
      ...globalStyles.TEXT_STYLE,
      fontSize: 16,
      fontWeight: 'bold',
    },
    activePageText: {
      color: '#fff',
    },
    disabledButton: {
      opacity: 0.5,
    },
    wideTable: {
      minWidth: 600, // You can increase this if needed
      marginTop: sizes.HEIGHT * 0.02,
    },
    statusCell: {
      flexDirection: 'row',
      width: CELL_WIDTH,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
