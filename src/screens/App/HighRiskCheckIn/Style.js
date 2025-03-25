

import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingTop: height * 0.04,
        alignSelf: "center",
        padding: width*0.1,
    },
    text:{
        fontSize: width * 0.037,
        fontWeight: "500",
        textAlign:"justify",
        paddingTop:height*0.030
    },
   btncontainer: {
    flexDirection: "row",  
    flexWrap: "wrap",      
    justifyContent: "space-between", 
    alignItems: "center",  
    paddingVertical:height*0.023,
    paddingHorizontal: width*0.02, 
},
btnWrapper: {
    width: width*0.35, 
    marginVertical: 5, 
},
btn: {
    width: width*0.35,
    
},
backbtn:{
    width: width*0.35,
    marginHorizontal: width*0.03, 
    
},
heading:{
    alignSelf:"center",
    fontSize:width*0.05,
    fontWeight:"900"
}

})