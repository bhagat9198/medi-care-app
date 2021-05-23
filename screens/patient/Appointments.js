/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {Alert, Button, Dimensions, ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import Snapshots from '../../components/helpers/DocSnapshot';
import ConsultsSnapshot from '../../components/helpers/ConsultsSnapshot';

import {addConsultReview} from './../../store/actions/patient';

export default function Appointments() {
  const theme = useSelector(state => state.appReducer.colors);
  const consultsStore = useSelector(state => state.consultsReducer);

  const [feeback, setFeedback] = useState(null);
  const dispatch = useDispatch();

  const submmitFeedBackHandler = async docId => {
    let res = await dispatch(addConsultReview(docId, feeback));
    if (res.status) {
      return Alert.alert('Success', 'Thank you for provinding feedback.');
    } else {
      return Alert.alert(res.title, res.message);
    }
  };

  const eachAppointmentUI = () => {
    return consultsStore.allConsults.map((con, index) => {
      if (!con.data.date) return;
      let booked, date, time;
      booked = new Date(con.booked).toISOString().split('T')[0];
      date = (new Date(con.data.date.seconds * 1000).toISOString()).split('T')[0];
      time = ((new Date(con.data.time.seconds * 1000).toISOString()).split('T')[1]).split('.')[0];

      // let time = 12;
      return (
        <EachAppointment
          key={index}
          style={{
            marginBottom: Dimensions.get('window').height * 0.02,
            marginTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingLeft: Dimensions.get('window').width * 0.02,
            paddingRight: Dimensions.get('window').width * 0.02,
          }}>
          <AppointmentHeading
            style={{
              paddingBottom: Dimensions.get('window').height * 0.01,
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <DateCont>
              <AppointmentHeadingText>{time}</AppointmentHeadingText>
            </DateCont>
            <TimeCont>
              <AppointmentHeadingSubText>{date}</AppointmentHeadingSubText>
            </TimeCont>
          </AppointmentHeading>
          <AppointmentBody>
            <ScrollView nestedScrollEnabled={true}>
              <AppointmentDetail
                style={{
                  marginTop: Dimensions.get('window').height * 0.01,
                  marginBottom: Dimensions.get('window').height * 0.01,
                }}>
                <AppointmentLabel>
                  <AppointmentLabelText>Description</AppointmentLabelText>
                </AppointmentLabel>
                <AppointmentInfo>
                  <AppointmentInfoText>{con.data.title}</AppointmentInfoText>
                </AppointmentInfo>
              </AppointmentDetail>
              <AppointmentDetail
                style={{
                  marginTop: Dimensions.get('window').height * 0.01,
                  marginBottom: Dimensions.get('window').height * 0.01,
                }}>
                <AppointmentLabel>
                  <AppointmentLabelText>
                    Appointment Taken by
                  </AppointmentLabelText>
                </AppointmentLabel>
                <AppointmentInfo>
                  <AppointmentInfoText>{`${con.doctor.initailName} ${con.doctor.fName} ${con.doctor.lName}`}</AppointmentInfoText>
                </AppointmentInfo>
              </AppointmentDetail>
              <AppointmentDetail
                style={{
                  marginTop: Dimensions.get('window').height * 0.01,
                  marginBottom: Dimensions.get('window').height * 0.01,
                }}>
                <AppointmentLabel>
                  <AppointmentLabelText>Booked On</AppointmentLabelText>
                </AppointmentLabel>
                <AppointmentInfo>
                  <AppointmentInfoText>{booked}</AppointmentInfoText>
                </AppointmentInfo>
              </AppointmentDetail>
              <AppointmentDetail
                style={{
                  marginTop: Dimensions.get('window').height * 0.01,
                  marginBottom: Dimensions.get('window').height * 0.01,
                }}>
                <AppointmentLabel>
                  <AppointmentLabelText>Appointment Fee</AppointmentLabelText>
                </AppointmentLabel>
                <AppointmentInfo direction="row">
                  <FontAwesome
                    name="rupee"
                    size={24}
                    color="red"
                    style={{
                      paddingRight: Dimensions.get('window').width * 0.02,
                    }}
                  />
                  <AppointmentInfoText>{con.data.fee}</AppointmentInfoText>
                </AppointmentInfo>
              </AppointmentDetail>
              <AppointmentDetail
                style={{
                  marginTop: Dimensions.get('window').height * 0.01,
                  marginBottom: Dimensions.get('window').height * 0.01,
                }}>
                <AppointmentLabel>
                  <AppointmentLabelText>Doctor Review</AppointmentLabelText>
                </AppointmentLabel>
                <AppointmentInfo>
                  <AppointmentInfoText>
                    {con.doctor.review ? con.doctor.review : 'Not Given yet'}
                  </AppointmentInfoText>
                </AppointmentInfo>
              </AppointmentDetail>
              {con.data.review ? (
                <AppointmentDetail
                  style={{
                    marginTop: Dimensions.get('window').height * 0.01,
                    marginBottom: Dimensions.get('window').height * 0.01,
                  }}>
                  <AppointmentLabel>
                    <AppointmentLabelText>Your Review</AppointmentLabelText>
                  </AppointmentLabel>
                  <AppointmentInfo>
                    <AppointmentInfoText>{con.data.review}</AppointmentInfoText>
                  </AppointmentInfo>
                </AppointmentDetail>
              ) : (
                <AppointmentDetail
                  style={{
                    marginTop: Dimensions.get('window').height * 0.01,
                    marginBottom: Dimensions.get('window').height * 0.01,
                  }}>
                  <TextInputStyled
                    value={feeback}
                    placeholder="Provide your feedback"
                    placeholderTextColor={theme.text_secondary}
                    multiline={true}
                    onChangeText={txt => setFeedback(txt)}
                  />
                  <Button
                    title="Submit Feedback"
                    onPress={() => submmitFeedBackHandler(con.docId)}
                  />
                </AppointmentDetail>
              )}
            </ScrollView>
          </AppointmentBody>
          <AppointmentFooter
            style={{
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <Entypo
              name="check"
              size={25}
              color="green"
              style={{
                paddingRight: Dimensions.get('window').width * 0.02,
              }}
            />
            <AppointmentFooterText>{con.status}</AppointmentFooterText>
          </AppointmentFooter>
        </EachAppointment>
      );
    });
  };

  const notAvalibaleUI = () => {
    return (
      <NotAvalibaleCont>
        <NotAvalibaleText>
          You havent made any consult with any doctor yet.
        </NotAvalibaleText>
      </NotAvalibaleCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <MainContainer>
          <Snapshots />
          <ConsultsSnapshot />
          {consultsStore.allConsults.length > 0
            ? eachAppointmentUI()
            : notAvalibaleUI()}
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const NotAvalibaleCont = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NotAvalibaleText = styled.Text`
  color: orange;
  font-size: 20px;
`;

const TimeCont = styled.View``;
const DateCont = styled.View``;

const AppointmentHeadingSubText = styled.Text`
  color: orange;
  font-size: 20px;
`;
const AppointmentHeadingText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 25px;
`;
const AppointmentHeading = styled.View`
  background-color: ${props => props.theme.secondary};
  justify-content: space-between;
  flex-direction: row;
`;
const TextInputStyled = styled.TextInput`
  flex: 1;
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  /* width: 100%; */
  color: white;
  font-size: 20px;
  margin-bottom: ${props => Dimensions.get('window').height * 0.02}px;
`;
const AppointmentInfoText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 22px;
`;
const AppointmentInfo = styled.View`
  flex-direction: ${props => (props?.direction ? 'row' : 'column')};
  align-items: ${props => (props?.direction ? 'center' : 'flex-start')};
`;
const AppointmentDetail = styled.View``;

const AppointmentLabelText = styled.Text`
  color: orange;
  font-size: 18px;
`;
const AppointmentLabel = styled.View``;
const AppointmentBody = styled.View``;
const AppointmentFooterText = styled.Text`
  font-size: 16px;
  color: green;
`;
const AppointmentFooter = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;
const EachAppointment = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
