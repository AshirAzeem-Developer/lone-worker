import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
    header: {
        height: height*0.12,
        backgroundColor: "#13714C",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 25,
    },
    backButton: {
        padding: 5,
    },
    backButtonPlaceholder: {
        width: 30, // Keeps spacing when no back button
    },
    logo: {
        width: width*0.34, // Adjust size as needed
        height: height*0.1,
        resizeMode: "contain",
    },
    rightIcon: {
        padding: width*0.01,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
    },
});
