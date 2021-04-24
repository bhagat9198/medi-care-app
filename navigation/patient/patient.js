/* eslint-disable */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Dashboard from '../../screens/patient/Dashboard';
import AllArticles from '../../screens/common/AllArticles';
import Diseases from '../../screens/patient/Diseases';
import MyDoctors from '../../screens/patient/MyDoctors';
import AllDoctors from '../../screens/common/AllDoctors';
import Doctor from '../../screens/common/Doctor';
import MedReports from '../../screens/patient/MedReports';
import OfflineConsults from '../../screens/patient/OfflineConsults';
import OnlineConsults from '../../screens/patient/OnlineConsults';
import Reminders from '../../screens/patient/Reminders';
import Article from '../../screens/common/Article';
import {logout} from './../../store/actions/auth';
import {appColor} from './../../constants/App';

const BottomTab = createBottomTabNavigator();

const AllDoctorsBottomTab = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: appColor.dark.primary,
        inactiveBackgroundColor: appColor.dark.secondary,
        activeTintColor: 'red',
        inactiveTintColor: appColor.dark.text_primary,
        activeTintColor: appColor.dark.text_secondary,
        showLabel: false
      }}>
      <BottomTab.Screen
        name="myDoctors"
        component={MyDoctorsStackScreen}
        options={{
          title: 'My Doctors',
          tabBarIcon: () => {
            return (
              <Fontisto
                name="doctor"
                size={24}
                color={appColor.dark.text_secondary}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="allDoctors"
        component={AllDoctorsStackScreen}

        options={{
          title: 'All Doctors',
          tabBarIcon: () => {
            return (
              <View style={{flexDirection: 'row', paddingTop: 7}}>
                <Fontisto
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
                <Fontisto
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
          
        }}
      />
    </BottomTab.Navigator>
  );
};

const drawerCommonStyles = props => {
  return {
    headerLeft: () => (
      <View style={styles.menuContainer}>
        <TouchableWithoutFeedback
          {...props}
          onPress={() => {
            return props.navigation.toggleDrawer();
          }}>
          <MaterialIcons
            style={styles.menuIcon}
            name="menu"
            size={24}
            color={appColor.dark.text_primary}
          />
        </TouchableWithoutFeedback>
      </View>
    ),
    drawerStyle: {
      backgroundColor: appColor.dark.primary,
    },
    headerStyle: {
      backgroundColor: appColor.dark.primary,
    },
    headerTintColor: appColor.dark.text_primary,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const HomeStack = createStackNavigator();
const DashboardStackScreen = props => {
  const appUserState = useSelector(state => state.authReducer);
  let dashboardTitle = `Hello! ${appUserState.fName} ${appUserState.lName}`;

  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: dashboardTitle,
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="dashboard"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const AllDoctorsStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={drawerCommonStyles}>
      <HomeStack.Screen
        name="allDoctors"
        component={AllDoctors}
        options={{
          title: 'All Doctors',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15, flexDirection: 'row'}}>
                <Fontisto
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
                <Fontisto
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="doctor"
        component={Doctor}
        options={{
          title: 'Doctor Name',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15, flexDirection: 'row'}}>
                <Fontisto
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MyDoctorsStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={drawerCommonStyles}>
      <HomeStack.Screen
        name="doctors"
        component={MyDoctors}
        options={{
          title: 'My Doctors',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialCommunityIcons
                  name="doctor"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const MedReportsStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="medReports"
        component={MedReports}
        options={{
          title: 'My Medical Reports',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="notes"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const RemindersStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="reminders"
        component={Reminders}
        options={{
          title: 'My Reminders',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="access-alarms"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const OnlineConsultsStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="onlineConsults"
        component={OnlineConsults}
        options={{
          title: 'Online Consults',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="book-online"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const OfflineConsultsStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="offlineConsults"
        component={OfflineConsults}
        options={{
          title: 'Offline Consults',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <Ionicons
                  name="newspaper-outline"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const AllArticlesStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="articles"
        component={AllArticles}
        options={{
          title: 'HealthCare Articles',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="article"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="article"
        component={Article}
        options={{
          title: 'Article',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <Ionicons
                  name="newspaper-outline"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const DiseasesStackScreen = props => {
  return (
    <HomeStack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      <HomeStack.Screen
        name="diseases"
        component={Diseases}
        options={{
          title: 'My Diseases',
          headerRight: () => {
            return (
              <View style={{paddingRight: 15}}>
                <MaterialIcons
                  name="coronavirus"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
function DrawerScreens(props) {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="diseases"
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
        name="allArticles"
        component={AllArticlesStackScreen}
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
        name="dashboard"
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
        name="onlineConsults"
        component={OnlineConsultsStackScreen}
        options={{
          title: 'Online Consults',
          drawerIcon: () => (
            <MaterialIcons
              name="book-online"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="offlineConsults"
        component={OfflineConsultsStackScreen}
        options={{
          title: 'Offline Consults',
          drawerIcon: () => (
            <FontAwesome
              name="building-o"
              size={24}
              color={appColor.dark.text_secondary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="diseases"
        component={DiseasesStackScreen}
        options={{
          title: 'Diseases I Have',
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
        name="doctors"
        component={AllDoctorsBottomTab}
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
        name="medReports"
        component={MedReportsStackScreen}
        options={{
          title: 'My Med Reports',
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
        name="reminders"
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

const styles = StyleSheet.create({
  menuContainer: {
    paddingLeft: 20,
    backgroundColor: appColor.dark.primary,
  },
});
