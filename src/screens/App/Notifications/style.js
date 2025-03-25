import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
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
    fontSize: width * 0.04,
   fontWeight:"bold",
    color: 'white',

   
},
cell: {
       
        fontSize: width * 0.036,
 
        color: '#333',
       
        
        
    },
    seeMoreBtn:{
     color:'#28A745',
     fontSize: width * 0.029,
     textAlign: 'right',
     marginTop:height*0.04,
    


    },
  heading: {
    alignSelf: "center",
    fontSize: width * 0.05,
    fontWeight: "900",
    marginBottom: height * 0.02,
},
detailsContainer:{
    height:height*0.1,
},
 // Modal Styles
 modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
},
modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    alignItems: 'start',
},
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf:"center"
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
})