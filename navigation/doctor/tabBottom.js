/* eslint-disable */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {View} from 'react-native';

import {
  AllArticlesStackScreen,
  MyArticlesStackScreen,
  UploadArticleStackScreen,
  ConsultsStackScreen,
  OnlineConsultsStackScreen,
  OfflineConsultsStackScreen,
  DoctorsStackScreen,
  UploadDoctorStackScreen,
} from './stack';

import {TabDoctor} from './../../constants/Navigation';
import {appColor} from './../../constants/App';

const ArticleTab = createBottomTabNavigator();

export const ArticleTabScreen = () => {
  return (
    <ArticleTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: appColor.dark.primary,
        inactiveBackgroundColor: appColor.dark.secondary,
        activeTintColor: 'red',
        inactiveTintColor: appColor.dark.text_primary,
        activeTintColor: appColor.dark.text_secondary,
        showLabel: false,
      }}>
      <ArticleTab.Screen
        name={TabDoctor.allArticlesTab}
        component={AllArticlesStackScreen}
        options={{
          title: 'All Articles',
          tabBarIcon: () => {
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
      <ArticleTab.Screen
        name={TabDoctor.myArticlesTab}
        component={MyArticlesStackScreen}
        options={{
          title: 'My Articles',
          tabBarIcon: () => {
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
      <ArticleTab.Screen
        name={TabDoctor.uploadArticleTab}
        component={UploadArticleStackScreen}
        options={{
          title: 'Upload',
          tabBarIcon: () => {
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
    </ArticleTab.Navigator>
  );
};

const ConsultsTab = createBottomTabNavigator();

export const ConsultsTabScreen = () => {
  return (
    <ConsultsTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: appColor.dark.primary,
        inactiveBackgroundColor: appColor.dark.secondary,
        activeTintColor: 'red',
        inactiveTintColor: appColor.dark.text_primary,
        activeTintColor: appColor.dark.text_secondary,
        showLabel: false,
      }}>
      <ConsultsTab.Screen
        name={TabDoctor.consultsTab}
        component={ConsultsStackScreen}
        options={{
          title: 'All Consults',
          tabBarIcon: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
      <ConsultsTab.Screen
        name={TabDoctor.onlineConsultsTab}
        component={OnlineConsultsStackScreen}
        options={{
          title: 'Online Consult',
          tabBarIcon: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
      <ConsultsTab.Screen
        name={TabDoctor.offlineConsultsTab}
        component={OfflineConsultsStackScreen}
        options={{
          title: 'Offline Consult',
          tabBarIcon: () => {
            return (
              <View style={{flexDirection: 'row'}}>
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
    </ConsultsTab.Navigator>
  );
};

const DoctorsTab = createBottomTabNavigator();

export const DoctorsTabScreen = () => {
  return(<DoctorsTab.Navigator
    tabBarOptions={{
      activeBackgroundColor: appColor.dark.primary,
      inactiveBackgroundColor: appColor.dark.secondary,
      activeTintColor: 'red',
      inactiveTintColor: appColor.dark.text_primary,
      activeTintColor: appColor.dark.text_secondary,
      showLabel: false,
    }}>
    <DoctorsTab.Screen
      name={TabDoctor.doctorsTab}
      component={DoctorsStackScreen}
      options={{
        title: 'All Doctors',
        tabBarIcon: () => {
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
    <DoctorsTab.Screen
      name={TabDoctor.uploadDoctorTab}
      component={UploadDoctorStackScreen}
      options={{
        title: 'Add Yourself',
        tabBarIcon: () => {
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
  </DoctorsTab.Navigator>);
};
