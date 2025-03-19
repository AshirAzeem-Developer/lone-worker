import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window")


export const Style = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000', // Ensure text color contrasts with the background
        // backgroundColor: '#fff',
    },

    error: {
        marginTop: 5,
        color: 'red',
        fontSize: 12,
    },
})