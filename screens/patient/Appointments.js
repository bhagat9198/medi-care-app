/* eslint-disable */

import React, {useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Appointments() {
  const theme = useSelector(state => state.appReducer.colors);
  const [feeback, setFeedback] = useState(null);

  const eachAppointmentUI = () => {
    return (
      <EachAppointment
        style={{
          marginBottom: Dimensions.get('window').height * 0.02,
          marginTop: Dimensions.get('window').height * 0.02,
          paddingBottom: Dimensions.get('window').height * 0.02,
          paddingTop: Dimensions.get('window').height * 0.02,
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
          // height: Dimensions.get('window').height * 0.,
        }}>
        <AppointmentHeading
          style={{
            paddingBottom: Dimensions.get('window').height * 0.01,
            paddingTop: Dimensions.get('window').height * 0.01,
            paddingLeft: Dimensions.get('window').width * 0.02,
            paddingRight: Dimensions.get('window').width * 0.02,
          }}>
          <DateCont>
            <AppointmentHeadingText>22:14 </AppointmentHeadingText>
          </DateCont>
          <TimeCont>
            <AppointmentHeadingSubText>SAT</AppointmentHeadingSubText>
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
                <AppointmentInfoText>
                  Helloooooooooooooooooooooooooooooo
                </AppointmentInfoText>
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
                <AppointmentInfoText>Doc NAME</AppointmentInfoText>
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
              <AppointmentInfo direction='row'>

                <FontAwesome
                  name="rupee"
                  size={24}
                  color="red"
                  style={{
                    paddingRight: Dimensions.get('window').width * 0.02,
                  }}
                />
                <AppointmentInfoText>258</AppointmentInfoText>
              </AppointmentInfo>
            </AppointmentDetail>
            <AppointmentDetail
              style={{
                marginTop: Dimensions.get('window').height * 0.01,
                marginBottom: Dimensions.get('window').height * 0.01,
              }}>
              <AppointmentLabel>
                <AppointmentLabelText>Review</AppointmentLabelText>
              </AppointmentLabel>
              <AppointmentInfo>
                <AppointmentInfoText>your review</AppointmentInfoText>
              </AppointmentInfo>
            </AppointmentDetail>
            <AppointmentDetail
              style={{
                marginTop: Dimensions.get('window').height * 0.01,
                marginBottom: Dimensions.get('window').height * 0.01,
              }}>
              <AppointmentInfo>
                <TextInputStyled
                  value={feeback}
                  placeholder="Provide your feedback"
                  placeholderTextColor={theme.text_secondary}
                  multiline={true}
                />
              </AppointmentInfo>
            </AppointmentDetail>
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
          <AppointmentFooterText>Accepted</AppointmentFooterText>
        </AppointmentFooter>
      </EachAppointment>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <MainContainer>
          {eachAppointmentUI()}
          {eachAppointmentUI()}
          {eachAppointmentUI()}
          {eachAppointmentUI()}
          {eachAppointmentUI()}
          {eachAppointmentUI()}
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

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
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  width: 100%;
`;
const AppointmentInfoText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 22px;
`;
const AppointmentInfo = styled.View`
flex-direction: ${props => props?.direction ? 'row' : 'column'};
align-items: ${props => props?.direction ? 'center' : 'flex-start'};
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
