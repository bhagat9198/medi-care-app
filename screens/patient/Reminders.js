import React, {useState} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { appColor } from "./../../constants/AppConstants";
import ReminderMOdal from '../../components/ReminderModal';

export default function Reminders() {
  const [modalDisplay, setModalDisplay] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.touchNativeCont}>
        <TouchableNativeFeedback onPress={() => setModalDisplay(!modalDisplay)}>
          <View style={styles.addReminderCont}>
            <MaterialIcons
              name="alarm-add"
              size={35}
              color={appColor.dark.text_primary}
              style={{ marginRight: 20 }}
            />
            <Text style={[styles.txt, styles.addReminderTxt]}>
              Add Reminder
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.reminderListCont}>
        <ScrollView>
          <View>
            <View style={styles.allRemindHeadingCont}>
              <Text style={[styles.txt, styles.txtHeading]}>ALL REMINDERS</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={styles.eachReminder}>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="alarm-outline"
                    size={55}
                    color="red"
                    style={{ marginRight: 20 }}
                  />
                  <View style={{width: '70%'}}>
                    <Text style={[styles.txt, styles.reminderName]}>
                      dnfguhiwer<Text style={[styles.reminderTime]}>
                      dnfguhi
                    </Text>
                    </Text>
                    
                    <Text style={[styles.txt, styles.reminderDescription]}>
                      dnfguhi sjfbiou osdnvbo usd sadbivuobas sdfwds ufnsd b
                    </Text>
                  </View>
                  <MaterialIcons name="delete-outline" size={55} color="red" />
                </View>
              </View>
              <View style={styles.eachReminder}>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="alarm-outline"
                    size={55}
                    color="red"
                    style={{ marginRight: 20 }}
                  />
                  <View style={{width: '70%'}}>
                    <Text style={[styles.txt, styles.reminderName]}>
                      dnfguhiwer<Text style={[styles.reminderTime]}>
                      dnfguhi
                    </Text>
                    </Text>
                    
                    <Text style={[styles.txt, styles.reminderDescription]}>
                      dnfguhi sjfbiou osdnvbo usd sadbivuobas sdfwds ufnsd b
                    </Text>
                  </View>
                  <MaterialIcons name="delete-outline" size={55} color="red" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <ReminderMOdal modalStatus={modalDisplay} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColor.dark.primary,
    paddingTop: 20,
  },
  touchNativeCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addReminderCont: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
    borderColor: appColor.dark.text_primary,
    marginBottom: 40,
  },
  txt: {
    color: appColor.dark.text_primary,
  },
  addReminderTxt: {
    fontWeight: "900",
    fontSize: 30,
  },
  reminderListCont: {
    flex: 6,
  },
  allRemindHeadingCont: {
    backgroundColor: appColor.dark.secondary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  txtHeading: {
    fontWeight: "900",
    fontSize: 20,
  },
  eachReminder: {
    flex: 1,
    width: "90%",
    marginBottom: 20,
    // shadowColor: appColor.dark.text_secondary,
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // shadowOffset: { width: 1, height: 0 },
    elevation: 10
  },
  reminderName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  reminderTime: {
    fontSize: 20,
    fontWeight: "900",
  },
  reminderDescription: {},
});
