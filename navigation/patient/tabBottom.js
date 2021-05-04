/* eslint-disable */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {OnlineConsultsStackScreen, OfflineConsultsStackScreen} from './stack';
import {TabPatient} from './../../constants/Navigation';
import {appColor} from './../../constants/App';

const BottomTab = createBottomTabNavigator();

export const ConsultsBottomTabScreens = () => {
  return (
    <BottomTab.Navigator
    initialRouteName={TabPatient.offlineConsults}
      tabBarOptions={{
        activeBackgroundColor: appColor.dark.primary,
        inactiveBackgroundColor: appColor.dark.secondary,
        activeTintColor: 'red',
        inactiveTintColor: appColor.dark.text_primary,
        activeTintColor: appColor.dark.text_secondary,
        showLabel: false,
      }}>
      <BottomTab.Screen
        name={TabPatient.onlineConsults}
        component={OnlineConsultsStackScreen}
        options={{
          title: 'Online Consults',
          tabBarIcon: () => {
            return (
              <MaterialIcons
                name="book-online"
                size={24}
                color={appColor.dark.text_secondary}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={TabPatient.offlineConsults}
        component={OfflineConsultsStackScreen}
        options={{
          title: 'Offline Consults',
          tabBarIcon: () => {
            return (
              <FontAwesome
                name="building-o"
                size={24}
                color={appColor.dark.text_secondary}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

// export const DoctorsBottomTabScreens = () => {
//   return (
//     <BottomTab.Navigator
//       tabBarOptions={{
//         activeBackgroundColor: appColor.dark.primary,
//         inactiveBackgroundColor: appColor.dark.secondary,
//         activeTintColor: 'red',
//         inactiveTintColor: appColor.dark.text_primary,
//         activeTintColor: appColor.dark.text_secondary,
//         showLabel: false
//       }}>
//       <BottomTab.Screen
//         name="myDoctors"
//         component={MyDoctorsStackScreen}
//         options={{
//           title: 'My Doctors',
//           tabBarIcon: () => {
//             return (
//               <Fontisto
//                 name="doctor"
//                 size={24}
//                 color={appColor.dark.text_secondary}
//               />
//             );
//           },
//         }}
//       />
//       <BottomTab.Screen
//         name="allDoctors"
//         component={AllDoctorsStackScreen}

//         options={{
//           title: 'All Doctors',
//           tabBarIcon: () => {
//             return (
//               <View style={{flexDirection: 'row', paddingTop: 7}}>
//                 <Fontisto
//                   name="doctor"
//                   size={24}
//                   color={appColor.dark.text_secondary}
//                 />
//                 <Fontisto
//                   name="doctor"
//                   size={24}
//                   color={appColor.dark.text_secondary}
//                 />
//               </View>
//             );
//           },

//         }}
//       />
//     </BottomTab.Navigator>
//   );
// };
