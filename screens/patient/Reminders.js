/* eslint-disable */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';

import {appColor} from '../../constants/App';
import ReminderModal from '../../components/ReminderModal';

export default function Reminders(props) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const modalStatusHandler = () => {
    setModalDisplay(!modalDisplay);
  };
  const theme = useSelector(state => state.appReducer.colors);
  const authStore = useSelector(state => state.authReducer);

  const allReminders = authStore.reminders;
  console.log(allReminders);

  const allRemindersUI = () => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={[styles.eachReminder]}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.2,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text style={[styles.txt, styles.timeDisplay]}>09</Text>
            <Text style={[styles.txt, styles.timeDisplay]}>30</Text>
          </View>

          <View style={{width: Dimensions.get('window').width * 0.6}}>
            <Text style={[styles.txt, styles.reminderName]}>dnfguhiwer</Text>

            <Text style={[styles.txt, styles.reminderDescription]}>
              dnfguhi sjfbiou osdnvbo usd sadbivuobas sdfwds ufnsd b
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('window').width * 0.2,
            }}>
            <MaterialIcons name="delete-outline" size={35} color="red" />
          </View>
        </View>
      </View>
    );
  };

  const notAvalibaleUI = () => {
    return (
      <NotAvalibaleCont>
        <NotAvalibaleText>
          You have not added any remindes yet.
        </NotAvalibaleText>
      </NotAvalibaleCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.mainContainer}>
        <View style={styles.touchNativeCont}>
          <TouchableNativeFeedback
            onPress={() => setModalDisplay(!modalDisplay)}>
            <View style={styles.addReminderCont}>
              <MaterialIcons
                name="alarm-add"
                size={35}
                color={appColor.dark.text_primary}
                style={{marginRight: 20}}
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
                <Text style={[styles.txt, styles.txtHeading]}>
                  ALL REMINDERS
                </Text>
              </View>
              {allReminders.length > 0 ? allRemindersUI() : notAvalibaleUI()}
            </View>
          </ScrollView>
        </View>
        <ReminderModal
          modalStatus={modalDisplay}
          onclick={modalStatusHandler}
        />
      </View>
    </ThemeProvider>
  );
}

const NotAvalibaleText = styled.Text`
  font-size: 20px;
  color: red;
`;

const NotAvalibaleCont = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColor.dark.primary,
    paddingTop: 20,
  },
  touchNativeCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReminderCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: Dimensions.get('window').width * 0.2,
    borderColor: appColor.dark.text_primary,
    marginBottom: 20,
    marginBottom: 20,
  },
  txt: {
    color: appColor.dark.text_primary,
  },
  addReminderTxt: {
    fontWeight: '900',
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  txtHeading: {
    fontWeight: '900',
    fontSize: 20,
  },
  eachReminder: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: appColor.dark.text_secondary,
    borderWidth: 1,
  },
  timeDisplay: {
    fontSize: 30,
  },
  reminderName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  reminderTime: {
    fontSize: 20,
    fontWeight: '900',
  },
  reminderDescription: {},
});
