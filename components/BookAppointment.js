/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function BookAppointment(props) {
  const [time, setTime] = useState({
    time: 0,
    status: false,
    txt: 'Choose Time',
  });
  const [date, setDate] = useState({
    date: 0,
    status: false,
    txt: 'Choose Date',
  });
  const [description, setDescription] = useState('');

  useEffect(() => {
    setDate(prev => ({
      ...prev,
      date: new Date().valueOf(),
    }));
    setTime(prev => ({
      ...prev,
      time: new Date().valueOf(),
    }));
  }, []);

  const toggleDateHandler = () => {
    // console.log('date');
    setDate(prevState => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  const toggleTimeHandler = () => {
    // console.log('time');
    setTime(prevState => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  const submitHandler = () => {
    if (!description) {
      return Alert.alert(
        'Empty Field',
        'Please enter the reason in brief on why you want to consult the doctor.',
      );
    }

    if (time == 0 || data == 0) {
      return Alert.alert(
        'Empty Field',
        'Please mention the date and time when you want to consult the doctor.',
      );
    }
    let data = {
      time: time.time,
      date: date.date,
      title: description,
    };
    props.bookConsultHandler(data);
  };

  const dateUI = () => {
    return (
      <TextInputStyledCont
        style={{
          marginBottom: Dimensions.get('window').height * 0.02,
        }}>
        <TouchableHighlight onPress={toggleDateHandler}>
          <TouchableCont>
            {date.status && (
              <DateTimePicker
                style={{
                  color: props.theme.primary,
                }}
                testID="date"
                value={new Date(date.date)}
                mode="date"
                display="default"
                onChange={dateChange => {
                  // console.log('dateChange', dateChange);
                  if (dateChange.type === 'dismissed') {
                    toggleDateHandler();
                  }
                  if (dateChange.type === 'set') {
                    // let dateStr = new Date(dateChange.timestamp).toISOString();
                    // console.log('dateStr', dateChange.nativeEvent.timestamp);
                    let dateStr = dateChange.nativeEvent.timestamp
                      .toISOString()
                      .split('T')[0];
                    // console.log(dateStr);
                    setDate(prevDate => ({
                      ...prevDate,
                      date: dateChange.nativeEvent.timestamp,
                      status: false,
                      txt: dateStr,
                    }));
                  }
                }}
              />
            )}
            <AntDesign
              name="calendar"
              size={30}
              color="red"
              style={{
                paddingRight: Dimensions.get('window').width * 0.03,
              }}
            />
            <DateTimeText>{date.txt}</DateTimeText>
          </TouchableCont>
        </TouchableHighlight>
      </TextInputStyledCont>
    );
  };

  const timeUI = () => {
    return (
      <TextInputStyledCont>
        <TouchableHighlight onPress={toggleTimeHandler}>
          <TouchableCont>
            {time.status && (
              <DateTimePicker
                testID="time"
                value={new Date(time.time)}
                mode="time"
                display="clock"
                minuteInterval={1}
                is24Hour={true}
                onChange={timeChange => {
                  // console.log('timeChange', timeChange);
                  if (timeChange.type === 'dismissed') {
                    toggleTimeHandler();
                  }
                  if (timeChange.type === 'set') {
                    // console.log(timeChange.nativeEvent.timestamp);
                    let timeStr = timeChange.nativeEvent.timestamp
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0];

                    setTime(prevTime => ({
                      ...prevTime,
                      time: timeChange.nativeEvent.timestamp,
                      status: false,
                      txt: timeStr,
                    }));
                  }
                }}
              />
            )}
            <AntDesign
              name="clockcircleo"
              size={30}
              color="red"
              style={{
                paddingRight: Dimensions.get('window').width * 0.03,
              }}
            />
            <DateTimeText>{time.txt}</DateTimeText>
          </TouchableCont>
        </TouchableHighlight>
      </TextInputStyledCont>
    );
  };

  return (
    <ModalStyled
      transparent={true}
      animationType="fade"
      visible={props.modalStatus}
      onRequestClose={props.modalStatusHandler}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          return props.modalStatusHandler();
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <KeyboardAvoidingView
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MainContainer
              style={{
                paddingTop: Dimensions.get('window').height * 0.02,
                paddingBottom: Dimensions.get('window').height * 0.02,
                paddingLeft: Dimensions.get('window').width * 0.05,
                paddingRight: Dimensions.get('window').width * 0.05,
              }}>
              <DateTimeCont>
                {dateUI()}
                {timeUI()}
                <TextInputStyledCont>
                  <TextInputStyled
                    value={description}
                    placeholder="Reason for appointment in brief"
                    placeholderTextColor={props.theme.text_primary}
                    multiline={true}
                    onChangeText={t => setDescription(t)}
                    style={{
                      marginBottom: Dimensions.get('window').height * 0.05,
                      marginTop: Dimensions.get('window').height * 0.02,
                    }}
                  />
                </TextInputStyledCont>
              </DateTimeCont>
              <BtnCont
                style={{
                  paddingTop: Dimensions.get('window').height * 0.01,
                  paddingBottom: Dimensions.get('window').height * 0.01,
                }}>
                <TouchableNativeFeedback onPress={submitHandler}>
                  <BtnText>
                    PAY <FontAwesome name="rupee" size={20} />{' '}
                    {props.consultData.fee}
                  </BtnText>
                </TouchableNativeFeedback>
              </BtnCont>
            </MainContainer>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableOpacity>
    </ModalStyled>
  );
}

const DateTimeCont = styled.View``;

const BtnText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  font-weight: bold;
`;

const BtnCont = styled.View`
  background-color: ${props => props.theme.secondary};
  align-items: center;
`;

const DateTimeText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 22px;
`;

const TextInputStyled = styled.TextInput`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
`;

const TouchableCont = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const TextInputStyledCont = styled.View``;

const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  border-color: white;
  border-width: 1px;
  border-radius: 10px;
  justify-content: space-between;
`;

const ModalStyled = styled.Modal``;
