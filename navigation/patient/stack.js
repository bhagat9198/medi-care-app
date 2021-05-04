/* eslint-disable */

import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '../../screens/patient/Dashboard';
import AllArticles from '../../screens/common/AllArticles';
import Diseases from '../../screens/patient/Diseases';
import Account from '../../screens/patient/Account';
import MyDoctors from '../../screens/patient/MyDoctors';
import AllDoctors from '../../screens/common/AllDoctors';
import Doctor from '../../screens/common/Doctor';
import MedReports from '../../screens/patient/MedReports';
import OfflineConsults from '../../screens/patient/OfflineConsults';
import OnlineConsults from '../../screens/patient/OnlineConsults';
import Appointments from '../../screens/patient/Appointments';
import Reminders from '../../screens/patient/Reminders';
import Article from '../../screens/common/Article';

import {appColor} from './../../constants/App';
import {StackPatient} from '../../constants/Navigation';

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

const Stack = createStackNavigator();

const accountScreen = () => {
  return(
    <Stack.Screen
      name={StackPatient.account}
      component={Account}
      options={{
        title: 'My Account',
        headerRight: () => {
          return (
            <View style={{paddingRight: 15}}>
              <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
            </View>
          );
        },
      }}
    />
  );
}

export const AccountStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {accountScreen()}
    </Stack.Navigator>
  );
};


const appointmentsScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.appointments}
      component={Appointments}
      options={{
        title: 'My Appointments',
        headerRight: () => {
          return (
            <View style={{paddingRight: 15}}>
              <AntDesign
                name="calendar"
                size={24}
                color={appColor.dark.text_secondary}
              />
            </View>
          );
        },
      }}
    />
  );
};

export const AppointmentsStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {appointmentsScreen()}
    </Stack.Navigator>
  );
};

const myDoctorScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.myDoctors}
      component={MyDoctors}
      options={{
        title: 'My Doctors',
        headerRight: () => {
          return (
            <View style={{paddingRight: 15}}>
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
  );
};

export const MyDoctorStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {myDoctorScreen()}
      {doctorScreen()}
    </Stack.Navigator>
  );
};

const allDoctorsScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.allDoctors}
      component={AllDoctors}
      options={{
        title: 'All Doctors',
        headerRight: () => {
          return (
            <View style={{paddingRight: 15, flexDirection: 'row'}}>
              <AntDesign
                name="find"
                size={24}
                color={appColor.dark.text_secondary}
              />
            </View>
          );
        },
      }}
    />
  );
};

const doctorScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.doctor}
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
  );
};

export const DoctorsStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={drawerCommonStyles}>
      {allDoctorsScreen()}
      {doctorScreen()}
    </Stack.Navigator>
  );
};

const diseasesScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.diseases}
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
  );
};

export const DiseasesStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {diseasesScreen()}
    </Stack.Navigator>
  );
};

const allArticlesScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.allArticles}
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
  );
};

const articleScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.article}
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
  );
};

export const ArticlesStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {allArticlesScreen()}
      {articleScreen()}
    </Stack.Navigator>
  );
};

const offlineScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.offlineConsults}
      component={OfflineConsults}
      options={{
        title: 'Offline Consults',
        headerRight: () => {
          return (
            <View style={{paddingRight: 15}}>
              <FontAwesome
                name="building-o"
                size={24}
                color={appColor.dark.text_secondary}
              />
            </View>
          );
        },
      }}
    />
  );
};

const onlineScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.onlineConsults}
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
  );
};

export const OnlineConsultsStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {onlineScreen()}
      {doctorScreen()}
    </Stack.Navigator>
  );
};

export const OfflineConsultsStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {offlineScreen()}
      {doctorScreen()}
    </Stack.Navigator>
  );
};


const remindersScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.reminders}
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
  );
};

export const RemindersStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {remindersScreen()}
    </Stack.Navigator>
  );
};

const MedReportsScreen = () => {
  return (
    <Stack.Screen
      name={StackPatient.medReports}  
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
  );
};

export const MedReportsStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {MedReportsScreen()}
    </Stack.Navigator>
  );
};

const dashboardScreen = () => {
  const appUserState = useSelector(state => state.authReducer);
  let dashboardTitle = `Hello! ${appUserState.fName} ${appUserState.lName}`;
  return (
    <Stack.Screen
      name={StackPatient.dashboard}
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
  );
};

export const DashboardStackScreen = props => {
  return (
    <Stack.Navigator screenOptions={() => drawerCommonStyles(props)}>
      {dashboardScreen()}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingLeft: 20,
    backgroundColor: appColor.dark.primary,
  },
});
