/* eslint-disable */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

import {appColor} from '../../constants/App';

export default function Dashboard() {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.eachCard}>
          <View style={styles.cardHeading}>
            <Text style={styles.txt}>
              <Text style={styles.txtHeading}>Hello</Text>
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.txt}>njdkfuig</Text>
          </View>
          <View style={styles.cardFooter}>
            <TouchableNativeFeedback>
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
    flex: 1,
    backgroundColor: appColor.dark.primary,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    borderColor: 'white',
    paddingTop: 10,
  },
  eachCard: {
    height: 300,
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
    flexDirection: 'row',
  },
  txt: {
    color: appColor.dark.text_primary,
  },
  txtHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
