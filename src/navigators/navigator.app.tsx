import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateBottomTabs from './CreateBottomTabs';
import Home from '../screens/App/Home';
import icons from '../assets/icons';
import {AppStackParamsList} from './navigators.params';
import TestingScreen from '../screens/App/Testingscreen/TestingScreen';

const Stack = createNativeStackNavigator<AppStackParamsList>();

// function ProfileStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       initialRouteName="Profile">
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//     </Stack.Navigator>
//   );
// }
// function BookingStack() {
//   const userType = useSelector(
//     (state: any) => state?.user?.user?.user?.roleType,
//   );
//   return (
//     <>
//       <CreateTopTabs
//         initialRouteName="Approved"
//         screens={[
//           {
//             name: userType !== 'seeker' ? 'All Bookings' : 'Approved',
//             Component: Approved,
//             label: userType !== 'seeker' ? 'All Bookings' : 'Approved',
//           },
//           {
//             name: userType !== 'seeker' ? 'Accepted ' : 'Pending',
//             Component: Pending,
//             label: userType !== 'seeker' ? 'Accepted ' : 'Pending',
//           },
//           {
//             name: userType !== 'seeker' ? 'Rejected' : 'Cancelled',
//             Component: Cancel,
//             label: userType !== 'seeker' ? 'Rejected' : 'Cancelled',
//           },
//         ]}
//         key={'BookingStack'}
//       />
//     </>
//   );
// }
// function ChatStack() {
//   return (
//     <>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         initialRouteName="Chat">
//         <Stack.Screen name="Chat" component={Chat} />
//         <Stack.Screen name="Chatlist" component={Chatlist} />
//       </Stack.Navigator>
//     </>
//   );
// }

// const BottomTabs = () => {
//   return (
//     <CreateBottomTabs
//       initialRouteName="Home"
//       screens={[
//         {
//           name: 'Home',
//           Component: Home,
//           icon: icons.HOME_TAB,
//           selectedIcon: icons.HOME_TAB_ACTIVE,
//           label: 'Home',
//         },
//         {
//           name: 'Bookings',
//           Component: BookingStack,
//           icon: icons.BOOKINGS_TAB,
//           selectedIcon: icons.BOOKINGS_TAB_ACTIVE,
//           label: 'Bookings',
//         },
//         {
//           name: 'Messages',
//           Component: ChatStack,
//           icon: icons.MESSAGE_TAB,
//           selectedIcon: icons.MESSAGE_TAB_ACTIVE,
//           label: 'Messages',
//         },
//         {
//           name: 'Profile',
//           Component: ProfileStack,
//           icon: icons.PROFILE_TAB,
//           selectedIcon: icons.PROFILE_TAB_ACTIVE,
//           label: 'Profile',
//         },
//       ]}
//     />
//   );
// };

// const BottomTabs = () => {
//   return (
//     <CreateBottomTabs
//       initialRouteName="Home"
//       screens={[
//         {
//           name: 'Home',
//           Component: Home,
//           icon: icons.CROSS,
//           selectedIcon: icons.CHECK,
//           label: 'Home',
//         },
//       ]}
//     />
//   );
// };

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TestingScreen">
      <Stack.Screen name="TestingScreen" component={TestingScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;
