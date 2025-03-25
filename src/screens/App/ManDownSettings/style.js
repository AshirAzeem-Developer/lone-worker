import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        paddingTop: height * 0.04,
        alignSelf: "center",
        padding: 10,
        // backgroundColor: "#fff",
    },
    text1: {
        textAlign: "center",
        fontSize: width * 0.043,
        fontWeight: "500"
    },
    dropdownView: {
        alignSelf: "center",
        paddingVertical: height * 0.03,
    },
    btn: {
        alignSelf: 'center',
        // paddingVertical:height*0.02,  


    }
});
