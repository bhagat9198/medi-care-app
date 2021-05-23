/* eslint-disable */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {
  ArticlesStackScreen,
  DiseasesStackScreen,
  DashboardStackScreen,
  DoctorsStackScreen,
  MedReportsStackScreen,
  RemindersStackScreen,
  MyDoctorStackScreen,
  AppointmentsStackScreen,
  AccountStackScreen,
} from './stack';
import {ConsultsBottomTabScreens} from './tabBottom';

import {logout} from './../../store/actions/auth';
import {appColor} from './../../constants/App';
import {DrawerPatient} from './../../constants/Navigation';

const Drawer = createDrawerNavigator();
function DrawerScreens(props) {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName={DrawerPatient.remindersDrawer}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <DrawerItem
              label="Logout"
              onPress={() => {
                dispatch(logout());
              }}
              inactiveBackgroundColor="salmon"
              inactiveTintColor="red"
              activeTintColor="salmon"
              activeBackgroundColor="red"
              icon={() => <AntDesign name="logout" size={24} color="red" />}
            />
          </DrawerContentScrollView>
        );
      }}
      drawerStyle={{
        backgroundColor: appColor.dark.primary,
        borderColor: appColor.dark.text_secondary,
        borderRightWidth: 1,
      }}
      drawerContentOptions={{
        activeBackgroundColor: appColor.dark.secondary,
        activeTintColor: appColor.dark.text_secondary,
        inactiveTintColor: appColor.dark.text_primary,
      }}>
      <Drawer.Screen
        name={DrawerPatient.dashboardDrawer}
        component={DashboardStackScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons
              name="dashboard"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.articlesDrawer}
        component={ArticlesStackScreen}
        options={{
          title: 'Articles',
          drawerIcon: () => (
            <MaterialIcons
              name="article"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.appointmentsDrawer}
        component={AppointmentsStackScreen}
        options={{
          title: 'My Appointments',
          drawerIcon: () => (
            <AntDesign
              name="calendar"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.consultsDrawer}
        component={ConsultsBottomTabScreens}
        options={{
          title: 'Make a Consult',
          drawerIcon: () => (
            <Fontisto
              name="stethoscope"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={DrawerPatient.diseasesDrawer}
        component={DiseasesStackScreen}
        options={{
          title: 'Diseases History',
          drawerIcon: () => (
            <MaterialIcons
              name="coronavirus"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.doctorsDrawer}
        component={DoctorsStackScreen}
        options={{
          title: 'Explore Doctors',
          drawerIcon: () => (
            <AntDesign
              name="find"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.myDoctorsDrawer}
        component={MyDoctorStackScreen}
        options={{
          title: 'My Doctors',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="doctor"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.medReportsDrawer}
        component={MedReportsStackScreen}
        options={{
          title: 'Send Medical Report',
          drawerIcon: () => (
            <MaterialIcons
              name="notes"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerPatient.remindersDrawer}
        component={RemindersStackScreen}
        options={{
          title: 'My Reminders',
          drawerIcon: () => (
            <MaterialIcons
              name="access-alarms"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name={DrawerPatient.accountDrawer}
        component={AccountStackScreen}
        options={{
          title: 'My Account',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="account"  
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

export default PatientNavigator = props => {
  return (
    <NavigationContainer>
      <DrawerScreens />
    </NavigationContainer>
  );
};
