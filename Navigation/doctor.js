import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Dashboard from "./../screens/doctor/Dashboard";
import Appointments from "./../screens/doctor/Appointments";
import Articles from "./../screens/doctor/Articles";
import OfflineConsults from "./../screens/doctor/OfflineConsults";
import OnlineConsults from "./../screens/doctor/OnlineConsults";
import { logout } from "./../store/actions/auth";

const HomeStack = createStackNavigator();
const DashboardStackScreen = (props) => {
  const appUserState = useSelector((state) => state.authReducer);
  let dashboardTitle = `Hello! ${appUserState.fName} ${appUserState.lName}`;

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: dashboardTitle,
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => props.navigation.toggleDrawer()}
            >
              <Feather name="menu" size={24} color="black" />
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const OnlineConsultsStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="onlineConsults" component={OnlineConsults} />
    </HomeStack.Navigator>
  );
};

const OfflineConsultsStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="offlineConsults" component={OfflineConsults} />
    </HomeStack.Navigator>
  );
};

const ArticlesStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="articles" component={Articles} />
    </HomeStack.Navigator>
  );
};

const AppointmentsStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="appointments" component={Appointments} />
    </HomeStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
function DrawerScreens(props) {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="dashboard"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                console.log("LOGOUT");
                dispatch(logout());
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="dashboard" component={DashboardStackScreen} />
      <Drawer.Screen
        name="onlineConsults"
        component={OnlineConsultsStackScreen}
      />
      <Drawer.Screen
        name="offlineConsults"
        component={OfflineConsultsStackScreen}
      />
      <Drawer.Screen name="articles" component={ArticlesStackScreen} />
      <Drawer.Screen name="appointments" component={AppointmentsStackScreen} />
    </Drawer.Navigator>
  );
}

const BottomTabs = createBottomTabNavigator();

// function BottomTabsHomeScreen(props) {
//   return (
//     <BottomTabs.Navigator initialRouteName="dashboards">
//       <BottomTabs.Screen name="dashboards" component={HomeStackScreen} />
//     </BottomTabs.Navigator>
//   );
// }

const DoctorNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerScreens />
    </NavigationContainer>
  );
};

export default DoctorNavigator;
