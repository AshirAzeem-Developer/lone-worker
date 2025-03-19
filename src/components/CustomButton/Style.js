import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    logo:{
        paddingRight:width*0.02
    }
   
})