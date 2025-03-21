import Toast from 'react-native-toast-message';
// import NetInfo from "@react-native-community/netinfo";

export const showSuccess = (title : string, message :string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 2000,
  });
};

export const showWarning = (title : string, message :string) => {
  Toast.show({
    type: 'warning',
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 2000,
  });
};

export const showError = (title : string, message :string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 2000,
  });
};

// export const CheckInternet=({isConnected,setisConnected})=>{
//   const {styles, sizes, colors} = useStyles();
//   const [showBackOnline, setShowBackOnline] = useState(false); // To control the "Back Online" message

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       console.log("Connection type", state.type);
//       console.log("Is connected?", state.isConnected);
//       setisConnected(state.isConnected);

//       if (state.isConnected) {
//         // Show "Back Online" and hide it after 2 seconds
//         setShowBackOnline(true);
//         setTimeout(() => {
//           setShowBackOnline(false);
//         }, 2000);
//       }
//     });

//     // Unsubscribe when component unmounts
//     return () => {
//       unsubscribe();
//     };
//   }, []);
//   return(<>
//     {/* <Image style={styles.image} source={images.Internet}/>
//     <TouchableOpacity style={styles.refresh}>
//     <Text style={styles.txt}>Reload</Text>
//     </TouchableOpacity> */}
//  {/* Only render the View when showStatus is true */}
//  {/* When there's no internet, show the "No Internet Connection" message */}
//       {!isConnected && (
//         <View style={[styles.container]}>
//           <View style={[styles.status, { backgroundColor: 'black' }]}>
//             <Text style={styles.txt}>No Internet Connection</Text>
//           </View>
//         </View>
//       )}

//       {/* Show the "Back Online" message only when it's supposed to be visible */}
//       {isConnected && showBackOnline && (
//         <View style={[styles.container]}>
//           <View style={[styles.status, { backgroundColor: 'green' }]}>
//             <Text style={styles.txt}>Back Online</Text>
//           </View>
//         </View>
//       )}
//   </>)
// }



// styling for internetchecking