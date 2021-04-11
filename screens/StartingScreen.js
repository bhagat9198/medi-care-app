import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";

import { appConstant, appColor } from "./../constants/AppConstants";
import SignupModal from './../components/SignupModal';

export default function StartingScreen(props) {
  const [modalDisplay, setModalisplay] = useState(false);
  const modalHandler = () => {
    console.log(modalDisplay);
    return setModalisplay((modalStatus) => !modalStatus);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{appConstant.title}</Text>
          </View>
          <View style={styles.loginForm}>
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
          </View>
          <View style={styles.btnContainer}>
            <Button title="Log In" color={appColor.dark.secondary} />
          </View>
          <View style={styles.footerContainer}>
            <TouchableNativeFeedback onPress={modalHandler}>
              <Text style={styles.txt}>
                Dont have an account?<Text style={styles.txt1}>Signup</Text>
              </Text>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
        <SignupModal modalStatus={modalDisplay} onClick={modalHandler}/>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.dark.primary,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
    alignContent: "flex-start",
  },
  title: {
    color: appColor.dark.text_primary,
    fontSize: 40,
    textDecorationStyle: "dotted",
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
  btnContainer: {
    paddingTop: 20,
    flex: 1,
    width: "80%",
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  txt: {
    color: appColor.dark.text_secondary,
    fontWeight: "bold",
  },
  txt1: {
    fontWeight: "bold",
    color: appColor.dark.text_primary,
    textDecorationLine: "underline",
  },
});
