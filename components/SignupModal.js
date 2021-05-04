/* eslint-disable */

import React, {useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {appColor} from '../constants/App';

import {useSelector, useDispatch} from 'react-redux';
import {signupAction} from '../store/actions/auth';

export default function SignupModal(props) {
  const [initailName, setInitailName] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');

  const genderHandler = val => {
    setGender(val);
  };

  const initialNameHandler = val => {
    setInitailName(val);
  };

  const userTypeHandler = val => {
    setUserType(val);
  };

  const dispatch = useDispatch();

  const registerUser = async () => {
    // console.log(
    //   fName,
    //   lName,
    //   email,
    //   password,
    //   cPassword,
    //   gender,
    //   phone,
    //   age,
    //   userType,
    // );
    if (password !== cPassword) {
      return Alert.alert('Opps!!!', "Password's didnt match");
    }
    if (password.length < 6) {
      return Alert.alert(
        'Password Length',
        'Password length should be minium 6 characters',
      );
    }

    if (
      !fName ||
      !lName ||
      !email ||
      !gender ||
      !userType ||
      isNaN(age) ||
      isNaN(phone)
    ) {
      return Alert.alert('Empty Field', "None of the field's should be empty");
    }

    if (
      userType === 'You are' ||
      gender === 'Select Gender' ||
      initailName === 'Initial Name'
    ) {
      return Alert.alert(
        'Inappropriate Value',
        'Please select valid value from dropdown.',
      );
    }

    let signupData = {
      initailName,
      fName,
      lName,
      email,
      password,
      gender,
      phone,
      age,
      userType,
      hospital: false,
    };
    Keyboard.dismiss();
    let result = await dispatch(signupAction(signupData));
    // console.log('result signup', result);

      if (!result.userStatus) {
        props.setErrorHandler(result.message);
        return Alert.alert('LogIn Error', result.message);
      }

  };

  return (
    <Modal
      animationType="slide"
      visible={props.modalStatus}
      style={styles.modal}>
      <View style={styles.modalWholeView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.loginForm}>
            <Picker
              selectedValue={initailName}
              onValueChange={val => initialNameHandler(val)}
              mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
              style={styles.picker}
              dropdownIconColor="gray">
              <Picker.Item
                label="Initial Name"
                value="Initial Name"
                enabled={true}
              />
              <Picker.Item label="Mr." value="Mr" />
              <Picker.Item label="Miss." value="Miss" />
              <Picker.Item label="Dr." value="Dr." />
            </Picker>
            <TextInput
              style={styles.inputBox}
              autoCompleteType="name"
              placeholder="user_first_name"
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
              value={fName}
              onChangeText={txt => setFName(txt)}
            />
            <TextInput
              style={styles.inputBox}
              autoCompleteType="name"
              placeholder="user_last_name"
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
              value={lName}
              onChangeText={txt => setLName(txt)}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Age - XX"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              color={appColor.dark.text_primary}
              value={age}
              onChangeText={txt => setAge(txt)}
            />
            <Picker
              selectedValue={gender}
              onValueChange={val => genderHandler(val)}
              mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
              style={styles.picker}
              dropdownIconColor="gray">
              <Picker.Item
                label="Select Gender"
                value="Select Gender"
                enabled={false}
              />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
            <Picker
              selectedValue={userType}
              onValueChange={val => userTypeHandler(val)}
              mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
              style={styles.picker}
              dropdownIconColor="gray">
              <Picker.Item label="You are" value="You are" enabled={false} />
              <Picker.Item label="Patient" value="patients" />
              <Picker.Item label="Doctor" value="doctors" />
            </Picker>
            <TextInput
              style={styles.inputBox}
              autoCompleteType="email"
              placeholder="user_email@doamin.com"
              textContentType="emailAddress"
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
              value={email}
              onChangeText={txt => setEmail(txt)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry
              placeholderTextColor="gray"
              color={appColor.dark.text_primary}
              value={cPassword}
              onChangeText={txt => setCPassword(txt)}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Phone - docXXXXXXXXXX"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              color={appColor.dark.text_primary}
              value={phone}
              onChangeText={txt => setPhone(txt)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button title="Cancle" color="red" onPress={props.onClick} />
          </View>
          <View style={styles.btn}>
            <Button title="SignUp" color="green" onPress={registerUser} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWholeView: {
    flex: 1,
    color: appColor.dark.text_primary,
    backgroundColor: appColor.dark.primary,
  },
  loginForm: {
    flex: 1,
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    width: '40%',
    margin: 10,
  },
  picker: {
    color: 'gray',
    marginBottom: 10,
    borderBottomColor: appColor.dark.text_secondary,
    borderBottomWidth: 1,
  },
  pickerItem: {
    backgroundColor: appColor.dark.secondary,
    color: appColor.dark.text_secondary,
  },
});
