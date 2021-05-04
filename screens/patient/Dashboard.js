/* eslint-disable */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerPatient} from './../../constants/Navigation';

import {appColor} from '../../constants/App';

export default function Dashboard(props) {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.mainContainer} style={{flexGrow: 1}}>
        <View style={styles.eachCard}>
          <View style={styles.cardHeading}>
            <Text style={styles.txt}>
              <Text style={styles.txtHeading}>Are you feeling sick?</Text>
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.txt}>
              Feels like you have corona? Want a advace from doctor? we have
              lots of doctors for you. Choose any one of them fix appointment at
              your own ease and once doctor confirm, you are read to go. Explore
              the doctors by tapping below.
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <TouchableNativeFeedback
              onPress={() =>
                props.navigation.navigate(DrawerPatient.consultsDrawer)
              }>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.txt}>Explore Doctors</Text>
                <Ionicons name="ios-chevron-forward" size={20} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.eachCard}>
          <View style={styles.cardHeading}>
            <Text style={styles.txt}>
              <Text style={styles.txtHeading}>Are you forgetful?</Text>
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.txt}>
              A newly feature added!! Now you can add a reminder for your self
              about when you want to take meditation. Easy right?
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <TouchableNativeFeedback  onPress={() =>
                props.navigation.navigate(DrawerPatient.remindersDrawer)
              }>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.txt}>See More</Text>
                <Ionicons name="ios-chevron-forward" size={20} color="white" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: appColor.dark.primary,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 50,
  },
  eachCard: {
    height: 350,
    width: '90%',
    backgroundColor: appColor.dark.secondary,
    marginBottom: 20,
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  cardHeading: {
    flex: 1,
    borderBottomColor: appColor.dark.primary,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 3,
    borderBottomColor: appColor.dark.primary,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  cardFooter: {
    flex: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  seeMoreContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    color: appColor.dark.text_primary,
    fontSize: 20,
  },
  txtHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
