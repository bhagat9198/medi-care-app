/* eslint-disable */

import React, {useState, useEffect} from 'react';
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
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';

import SignupModal from './SignupModal';
import {appConstant, appColor} from '../constants/App';
import {loginAction} from './../store/actions/auth';

export default function LogIn(props) {
  const dispatch = useDispatch();
  const [modalDisplay, setModalisplay] = useState(false);
  const modalHandler = () => {
    return setModalisplay(modalStatus => !modalStatus);
  };
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    if (!email || !password || !userType) {
      return Alert.alert('Empty Field', "None of the field's should be empty");
    }
    if (userType === 'You are') {
      return Alert.alert(
        'Inappropriate Value',
        'Please select valid value from dropdown.',
      );
    }
    let result = await dispatch(loginAction(email, password, userType));
    // console.log('result signIN', result);
      if (!result.userStatus) {
        props.setErrorHandler(result.message);
        return Alert.alert('LogIn Error', result.message);
      }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{appConstant.title}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'space-around'}}>
              <View style={styles.loginForm}>
                <View
                  style={{
                    marginBottom: Dimensions.get('window').height * 0.03,
                  }}>
                  <TextInput
                    style={styles.inputBox}
                    autoCompleteType="email"
                    placeholder="user_email@doamin.com"
                    textContentType="emailAddress"
                    placeholderTextColor="gray"
                    color={appColor.dark.text_primary}
                    value={email}
                    onChangeText={txt => setEmail(txt)}
                  />
                </View>
                <View
                  style={{
                    marginBottom: Dimensions.get('window').height * 0.03,
                  }}>
                  <TextInput
                    style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="gray"
                    color={appColor.dark.text_primary}
                    value={password}
                    onChangeText={txt => setPassword(txt)}
                  />
                </View>
                <View
                  style={{
                    marginBottom: Dimensions.get('window').height * 0.03,
                  }}>
                  <Picker
                    selectedValue={userType}
                    onValueChange={val => setUserType(val)}
                    mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                    style={styles.picker}
                    dropdownIconColor="gray">
                    <Picker.Item
                      label="You are"
                      value="You are"
                      enabled={false}
                    />
                    <Picker.Item label="Patient" value="patients" />
                    <Picker.Item label="Doctor" value="doctors" />
                  </Picker>
                </View>
              </View>
              <Button
                title="Log In"
                color={appColor.dark.secondary}
                onPress={loginHandler}
                style={{flex: 1}}
              />
            </View>

            <View style={styles.footerContainer}>
              <TouchableNativeFeedback onPress={modalHandler}>
                <Text style={styles.txt}>
                  Dont have an account?<Text style={styles.txt1}>Signup</Text>
                </Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <SignupModal
        setErrorHandler={msg => props.setErrorHandler(msg)}
        modalStatus={modalDisplay}
        onClick={modalHandler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.dark.primary,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    color: appColor.dark.text_primary,
  },
  loginForm: {
    // borderBottomColor: appColor.dark.text_primary,
    // borderBottomWidth: 1,
  },
  inputBox: {
    borderBottomColor: appColor.dark.text_secondary,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  txt: {
    color: appColor.dark.text_secondary,
    fontWeight: 'bold',
  },
  txt1: {
    fontWeight: 'bold',
    color: appColor.dark.text_primary,
    textDecorationLine: 'underline',
  },
  picker: {
    color: 'gray',
    marginBottom: Dimensions.get('window').height * 0.03,
  },
});
