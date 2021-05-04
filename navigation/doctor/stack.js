/* eslint-disable */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Consults from '../../screens/doctor/Consults';
import Dashboard from '../../screens/doctor/Dashboard';
import MyArticles from '../../screens/doctor/MyArticles';
import OfflineConsults from '../../screens/doctor/OfflineConsults';
import OnlineConsults from '../../screens/doctor/OnlineConsults';
import UploadArticle from '../../screens/doctor/UploadArticle';
import UploadDoctor from '../../screens/doctor/UploadDoctor';
import AllArticles from '../../screens/common/AllArticles';
import AllDoctors from '../../screens/common/AllDoctors';
import Article from '../../screens/common/Article';
import Doctor from './../../screens/common/Doctor';
import Account from './../../screens/doctor/Account';

import {StackDoctor} from '../../constants/Navigation';
import {appColor} from './../../constants/App';

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

const DashboardStack = createStackNavigator();

export const DashboardStackScreen = props => {
  const appUserState = useSelector(state => state.authReducer);
  let dashboardTitle = `Hello! ${appUserState.fName} ${appUserState.lName}`;

  return (
    <DashboardStack.Navigator screenOptions={drawerCommonStyles}>
      <DashboardStack.Screen
        name={StackDoctor.dashboard}
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
    </DashboardStack.Navigator>
  );
};

const ConsultsStack = createStackNavigator();

export const ConsultsStackScreen = props => {
  return (
    <ConsultsStack.Navigator screenOptions={drawerCommonStyles}>
      <ConsultsStack.Screen
        name={StackDoctor.consults}
        component={Consults}
        options={{
          title: 'All Consults',
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
    </ConsultsStack.Navigator>
  );
};

const OfflineConsultsStack = createStackNavigator();

export const OfflineConsultsStackScreen = props => {
  return (
    <OfflineConsultsStack.Navigator screenOptions={drawerCommonStyles}>
      <OfflineConsultsStack.Screen
        name={StackDoctor.offlineConsults}
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
    </OfflineConsultsStack.Navigator>
  );
};

const OnlineConsultsStack = createStackNavigator();

export const OnlineConsultsStackScreen = props => {
  return (
    <OnlineConsultsStack.Navigator screenOptions={drawerCommonStyles}>
      <OnlineConsultsStack.Screen
        name={StackDoctor.onlineConsults}
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
    </OnlineConsultsStack.Navigator>
  );
};

const AllArticlesStack = createStackNavigator();

export const AllArticlesStackScreen = props => {
  return (
    <AllArticlesStack.Navigator screenOptions={drawerCommonStyles}>
      <AllArticlesStack.Screen
        name={StackDoctor.allArticles}
        component={AllArticles}
        options={{
          title: 'All Articles',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="newspaper-outline"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
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
      <AllArticlesStack.Screen name={StackDoctor.article} component={Article} options={{
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
      }} />
    </AllArticlesStack.Navigator>
  );
};

const MyArticlesStack = createStackNavigator();

export const MyArticlesStackScreen = props => {
  return (
    <MyArticlesStack.Navigator screenOptions={drawerCommonStyles}>
      <MyArticlesStack.Screen
        name={StackDoctor.myArticles}
        component={MyArticles}
        options={{
          title: 'My Articles',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
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
      <MyArticlesStack.Screen name={StackDoctor.article} component={Article} options={{
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
      }} />
    </MyArticlesStack.Navigator>
  );
};

const UploadArticleStack = createStackNavigator();

export const UploadArticleStackScreen = props => {
  return (
    <UploadArticleStack.Navigator screenOptions={drawerCommonStyles}>
      <UploadArticleStack.Screen
        name={StackDoctor.uploadArticle}
        component={UploadArticle}
        options={{
          title: 'Upload Your Article',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <AntDesign
                  name="upload"
                  size={24}
                  color={appColor.dark.text_secondary}
                />
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
    </UploadArticleStack.Navigator>
  );
};

const DoctorsStack = createStackNavigator();

export const DoctorsStackScreen = props => {
  return (
    <DoctorsStack.Navigator screenOptions={drawerCommonStyles}>
      <DoctorsStack.Screen
        name={StackDoctor.doctors}
        component={AllDoctors}
        options={{
          title: 'Doctors',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
      <DoctorsStack.Screen
        component={Doctor}
        name={StackDoctor.doctor}
        options={{
          title: 'Doctor',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
    </DoctorsStack.Navigator>
  );
};

const UploadDoctorStack = createStackNavigator();

export const UploadDoctorStackScreen = props => {
  return (
    <UploadDoctorStack.Navigator screenOptions={drawerCommonStyles}>
      <UploadDoctorStack.Screen
        name={StackDoctor.uploadDoctor}
        component={UploadDoctor}
        options={{
          title: 'Add Yourself',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <AntDesign
                  name="upload"
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
    </UploadDoctorStack.Navigator>
  );
};

const AccountStack = createStackNavigator();

export const AccountStackScreen = props => {
  return (
    <AccountStack.Navigator screenOptions={drawerCommonStyles}>
      <AccountStack.Screen
        component={Account}
        name={StackDoctor.account}
        options={{
          title: 'Account',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
    </AccountStack.Navigator>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingLeft: 20,
    backgroundColor: appColor.dark.primary,
  },
});
