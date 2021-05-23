/* eslint-disable */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  AccountStackScreen,
  DashboardStackScreen,
} from './stack';

import {ArticleTabScreen, ConsultsTabScreen, DoctorsTabScreen} from './tabBottom';
import {DrawerDoctor} from '../../constants/Navigation';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {logout} from './../../store/actions/auth';
import {appColor} from './../../constants/App';

const Drawer = createDrawerNavigator();

function DrawerScreens(props) {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName={DrawerDoctor.consultsDrawer}
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
        name={DrawerDoctor.dashboardDrawer}
        component={DashboardStackScreen}
        options={{
          title: 'Home',
          drawerIcon: () => (
            <MaterialIcons
              name="dashboard"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={DrawerDoctor.articlesDrawer}
        component={ArticleTabScreen}
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
        name={DrawerDoctor.doctorsDrawer}
        component={DoctorsTabScreen}
        options={{
          title: 'Doctors',
          drawerIcon: () => (
            <Fontisto
              name="doctor"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name={DrawerDoctor.accountDrawer}
        component={AccountStackScreen}
        options={{
          title: 'Account',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name={DrawerDoctor.consultsDrawer}
        component={ConsultsTabScreen}
        options={{
          title: 'Appointments',
          drawerIcon: () => (
            <AntDesign
              name="calendar"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const DoctorNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerScreens />
    </NavigationContainer>
  );
};

export default DoctorNavigator;
