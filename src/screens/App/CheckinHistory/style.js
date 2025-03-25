import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.02,
    },
    heading: {
        alignSelf: "center",
        fontSize: width * 0.05,
        fontWeight: "900",
        marginBottom: height * 0.02,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#28A745',
        paddingVertical: height * 0.015,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    headerText: {


        flex: 1,
        fontSize: width * 0.025,

        color: '#FFFFFF',

        textAlign: 'center',
        // marginLeft: width * 0.02,
        flexShrink: 1,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        marginVertical: 2,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
    },

    cell: {
        flex: 1,
        fontSize: width * 0.023,

        color: '#333',
        textAlign: 'justify',
        // marginLeft: width * 0.02,
        flexShrink: 1,
    },// ✅ Pagination Styles
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    activePage: {
        backgroundColor: "green",
    },
    pageText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    activePageText: {
        color: "#fff",
    },
    disabledButton: {
        opacity: 0.5,
    },
    statusCell: (status) => ({

        color: status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red',
        fontWeight: 'bold',
    }),
});
