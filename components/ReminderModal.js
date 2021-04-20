/* eslint-disable */

import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import {DatePicker} from '@davidgovea/react-native-wheel-datepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {appColor} from '../constants/App';

export default function ReminderModal(props) {
  return (
    <View >
      <SafeAreaView>
        <Modal visible={props.modalStatus} animationType="slide">
          <View style={{flex: 1, backgroundColor: appColor.dark.primary}}>
            <ScrollView>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View >
                  <View style={styles.chooseCont}>
                    <View style={styles.chooseTimeSubCont}>
                      <Text style={[styles.txt, styles.headingTxt]}>
                        Choose Time
                      </Text>
                      <DatePicker
                        mode="time"
                        minuteInterval={1}
                        onDateChange={date => {
                          console.log(date.getHours(), date.getMinutes());
                        }}
                        textColor={appColor.dark.text_primary}
                        style={styles.datePicker}
                      />
                    </View>
                  </View>
                  <View style={styles.inputCont}>
                    <View style={styles.eachInputCont}>
                      <TextInput
                        placeholder="Reminder Name"
                        keyboardType="email-address"
                        style={styles.input}
                        placeholderTextColor="gray"
                        color={appColor.dark.text_primary}
                      />
                    </View>
                    <View style={styles.eachInputCont}>
                      <TextInput
                        placeholder="Reminder Description"
                        keyboardType="email-address"
                        placeholderTextColor="gray"
                        color={appColor.dark.text_primary}
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <View style={styles.chooseCont}>
                    <Text style={[styles.txt, styles.headingTxt]}>
                      Reminder Type
                    </Text>
                    <View style={styles.typeCont}>
                      <TouchableNativeFeedback>
                        <View style={styles.eachType}>
                          <MaterialIcon
                            name="chevron-right"
                            color={appColor.dark.text_primary}
                            size={24}
                          />
                          <Text style={[styles.txt, styles.typeTxt]}>Once</Text>
                        </View>
                      </TouchableNativeFeedback>
                      <TouchableNativeFeedback>
                        <View style={styles.eachType}>
                          <MaterialIcon
                            name="chevron-right"
                            color={appColor.dark.secondary}
                            size={24}
                            style={{visible: 'none'}}
                          />
                          <Text style={[styles.txt, styles.typeTxt]}>
                            Daily
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                  <View style={styles.btnCont}>
                    <View style={styles.eachBtn}>
                      <Button color="red" title="Cancel" onPress={props.onclick} />
                    </View>
                    <View style={styles.eachBtn}>
                      <Button color="green" title="Add" />
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  eachInputCont: {
    borderBottomColor: appColor.dark.text_secondary,
    borderWidth: 1,
    width: '80%'
  },
  input: {
    color: appColor.dark.text_secondary,
    fontSize: 20,
  },
  datePicker: {
    backgroundColor: appColor.dark.primary,
  },
  txt: {
    color: appColor.dark.text_primary,
  },
  headingTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    // paddingTop: Dimensions.get('window').height * 0.01,
    // paddingBottom: Dimensions.get('window').height * 0.01,
    // paddingRight: Dimensions.get('window').width * 0.1,
    // paddingLeft: Dimensions.get('window').width * 0.1,
  },
  chooseCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  chooseTimeSubCont: {
    height: Dimensions.get('window').height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomColor: appColor.dark.text_secondary,
    // borderWidth: 1,
    width: Dimensions.get('window').width * 0.8,
    // borderRadius: 5,
  },
  typeCont: {
    marginTop: Dimensions.get('window').height * 0.01,
    width: '100%',
    paddingTop: Dimensions.get('window').height * 0.01,
  },
  eachType: {
    backgroundColor: appColor.dark.secondary,
    marginBottom: Dimensions.get('window').height * 0.01,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    // paddingLeft: 20,
    justifyContent: 'space-around',
  },
  typeTxt: {
    fontSize: 20,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  eachBtn: {
    width: Dimensions.get('window').width * 0.4,
  },
});
