/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import ConsultsSnapshot from './../../components/helpers/ConsultsSnapshot';
import UserSnapshot from './../../components/helpers/UserSnapshot';

export default function Consults() {
  const theme = useSelector(state => state.appReducer.colors);
  const consultsStore = useSelector(state => state.consultsReducer);
  const userStore = useSelector(state => state.authReducer);

  const eachConsultUI = con => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'FRI', 'SAT'];
    let booked, date, time, hours, minutes, day ;
    booked = new Date(con.booked).toISOString().split('T')[0];
    date = new Date(con.data.date.seconds * 1000).toISOString().split('T')[0];
    time = new Date(con.data.time.seconds * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0];
    hours = time.split(':')[0];
    minutes = time.split(':')[1];
    let fullDate = new Date(con.data.date.seconds * 1000);
    let dayindex = fullDate.getDay();
    day = daysOfWeek[dayindex];

    return (
      <EachConsult key={Math.random()}
        style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        <DayTimeCont>
          <TimeCont>
            <TimeContText>{hours}</TimeContText>
          </TimeCont>
          <TimeCont>
            <TimeContText>{minutes}</TimeContText>
          </TimeCont>
          <DayCont>   
            <DayContText>{day}</DayContText>
          </DayCont>
        </DayTimeCont>
        <AllDetailsCont>
          <DetailsCont>
            <DateCont>
              <DateContText>{date}</DateContText>
            </DateCont>
            <DetailCont>
              <Label>
                <LabelText>Mode</LabelText>
              </Label>
              <Info>
                <InfoText>{con.data.mode}</InfoText>
              </Info>
            </DetailCont>
            <DetailCont>
              <Label>
                <LabelText>Pateint Name</LabelText>
              </Label>
              <Info>
                <InfoText>nsdkjfvbs</InfoText>
              </Info>
            </DetailCont>
            <DetailCont>
              <Label>
                <LabelText>Pateint Review</LabelText>
              </Label>
              <Info>
                <InfoText>{con.data.review}</InfoText>
              </Info>
            </DetailCont>
            <DetailCont>
              <Label>
                <LabelText>Cause</LabelText>
              </Label>
              <Info>
                <InfoText>{con.data.title}</InfoText>
              </Info>
            </DetailCont>
            <DetailCont>
              <Label>
                <LabelText>Fee</LabelText>
              </Label>
              <Info>
                <InfoText>{con.data.fee}</InfoText>
              </Info>
            </DetailCont>
          </DetailsCont>
          <StatusCont>
            <StatusText>{con.status}</StatusText>
          </StatusCont>
        </AllDetailsCont>
      </EachConsult>
    );
  };

  const notAvalibaleUI = () => {
    return (
      <NotAvalibaleCont>
        <NotAvalibaleText>
          No Consults are made till now. You will get soon, just be patience.
        </NotAvalibaleText>
      </NotAvalibaleCont>
    );
  };

  const allConsultsUI = () => {
    return consultsStore.allConsults.map(con => {
      return eachConsultUI(con);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <ConsultsSnapshot />
          <UserSnapshot />
          <AllConsults style={{flex: 1}}>
            {consultsStore?.allConsults?.length > 0
              ? allConsultsUI()
              : notAvalibaleUI()}
          </AllConsults>
        </ScrollView>
      </MainContainer>
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

const AllConsults = styled.View``;

const StatusText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 15px;
`;

const StatusCont = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
`;
const DetailsCont = styled.View`
  flex: 1;
`;

const InfoText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.text_primary};
`;

const LabelText = styled.Text`
  font-size: 20px;
  /* color: ${props => props.theme.text_secondary}; */
  color: red;
`;

const Info = styled.View`
  font-size: 20px;
`;
const Label = styled.View`
  margin-right: 5px;
  padding-right: 5px;
`;
const DetailCont = styled.View`
  margin-bottom: 7px;
  flex-direction: row;
`;

const DateContText = styled.Text`
  font-size: 25px;
  color: ${props => props.theme.text_primary};
`;

const DateCont = styled.View`
  margin-bottom: 10px;
`;

const AllDetailsCont = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const DayTimeCont = styled.View`
  width: 25%;
  border-right-color: green;
  border-width: 8px;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const DayContText = styled.Text`
  font-size: 25px;
  font-style: italic;
  color: ${props => props.theme.text_secondary};
`;

const TimeContText = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.text_primary};
`;

const DayCont = styled.View`
  padding-top: 10px;
`;
const TimeCont = styled.View``;

const EachConsult = styled.View`
  /* flex: 1; */
  height: 250px;
  background-color: ${props => props.theme.secondary};
  flex-direction: row;
  width: 95%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
  padding-top: 20px;
  padding-bottom: 50px;
`;

// const Text = styled.Text`
//   color: ${props => props.theme.text_primary};
// `;
