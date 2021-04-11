import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { appColor } from "./../constants/AppConstants";

export default function SignupModal(props) {
  return (
    <Modal animationType="slide" visible={props.modalStatus} style={styles.modal}>
      <View style={styles.modalWholeView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.loginForm}>
            <TextInput
              style={styles.inputBox}
              autoCompleteType="name"
              placeholder="user_name"
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
            />
            <TextInput
              style={styles.inputBox}
              autoCompleteType="email"
              placeholder="user_email@doamin.com"
              textContentType="emailAddress"
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="XXXXXXXXXX"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              color={appColor.dark.text_primary}
            />
          </KeyboardAvoidingView>
          <View>
            <View>
              <Button title="SignUp" color="green" />
            </View>
            <View>
              <Button title="Cancle" color="red" />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: appColor.dark.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWholeView: {

  },
  loginForm: {
    flex: 1,
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    // borderBottomColor: appColor.dark.text_primary,
    // borderBottomWidth: 1
  },
  inputBox: {
    borderBottomColor: appColor.dark.text_secondary,
    borderBottomWidth: 1,
    fontSize: 20,
    paddingBottom: 10,
    marginBottom: 25,
  },
});
