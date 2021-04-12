import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import Dashboard from "./../screens/patient/Dashboard";
import Articles from "./../screens/patient/Articles";
import Diseases from "./../screens/patient/Diseases";
import Doctors from "./../screens/patient/Doctors";
import MedReports from "./../screens/patient/MedReports";
import OfflineConsults from "./../screens/patient/OfflineConsults";
import OnlineConsults from "./../screens/patient/OnlineConsults";
import Reminders from "./../screens/patient/Reminders";
import {logout} from './../store/actions/auth';


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

const DoctorsStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="doctors" component={Doctors} />
    </HomeStack.Navigator>
  );
};

const MedReportsStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="medReports" component={MedReports} />
    </HomeStack.Navigator>
  );
};
const RemindersStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="reminders" component={Reminders} />
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

const DiseasesStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="diseases" component={Diseases} />
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
      <Drawer.Screen name="diseases" component={DiseasesStackScreen} />
      <Drawer.Screen name="doctors" component={DoctorsStackScreen} />
      <Drawer.Screen name="medReports" component={MedReportsStackScreen} />
      <Drawer.Screen name="reminders" component={RemindersStackScreen} />
    </Drawer.Navigator>
  );
}

const PatientNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerScreens />
    </NavigationContainer>
  );
};

export default PatientNavigator;
