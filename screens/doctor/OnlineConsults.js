/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView, TouchableNativeFeedback} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ConsultsSnapshot from './../../components/helpers/ConsultsSnapshot';
import UserSnapshot from './../../components/helpers/UserSnapshot';
import { changeConsultStatus } from './../../store/actions/doctor';

export default function Consults() {
  const theme = useSelector(state => state.appReducer.colors);
  const consultsStore = useSelector(state => state.consultsReducer);
  const userStore = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const consultStatusHandler = async(collectionName, docId, status) => {
    let res = await dispatch(changeConsultStatus(collectionName, docId, status));
    if(!res) {
      return Alert.alert(res.titl, res.message)
    }
  }


  const consultStatusUI = con => {
    if (con.status === 'Pending') {
      return (
        <ActionCont>
          <TouchableNativeFeedback onPress={() => consultStatusHandler('consults', con.docId, 'Rejected')}>
            <MaterialIcons name="cancel" size={30} color="red" />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => consultStatusHandler('consults', con.docId, 'Scheduled')}>
            <MaterialIcons name="check-circle" size={30} color="green" />
          </TouchableNativeFeedback>
        </ActionCont>
      );
    }
    if (con.status === 'Scheduled') {
      return (
        <ActionCont>
          <TouchableNativeFeedback>
            <MaterialIcons name="check-circle" size={30} color="green" />
          </TouchableNativeFeedback>
        </ActionCont>
      );
    }

    if (con.status === 'Rejected') {
      return (
        <ActionCont>
          <TouchableNativeFeedback>
            <MaterialIcons name="cancel" size={30} color="red" />
          </TouchableNativeFeedback>
        </ActionCont>
      );
    }
  };

  const eachConsultUI = con => {
    let booked, date, time;
    booked = new Date(con.booked).toISOString().split('T')[0];
    date = new Date(con.data.date.seconds * 1000).toISOString().split('T')[0];
    time = new Date(con.data.time.seconds * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0];

    return (
      <EachConsult
        key={Math.random()}
        style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        {consultStatusUI(con)}
        <AllDetailsCont>
          <DetailsCont>
            <DateCont>
              <DateContText>{date}</DateContText>
            </DateCont>
            <DetailCont>
              <Label>
                <LabelText>Time</LabelText>
              </Label>
              <Info>
                <InfoText>{time}</InfoText>
              </Info>
            </DetailCont>
            <DetailCont>
              <Label>
                <LabelText>Booked</LabelText>
              </Label>
              <Info>
                <InfoText>{booked}</InfoText>
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
            <DetailCont>
              <Label>
                <LabelText>Cause</LabelText>
              </Label>
              <Info>
                <InfoText>{con.data.title}</InfoText>
              </Info>
            </DetailCont>
          </DetailsCont>
          <StatusCont>
            <StatusText>{con.status === 'Pending' ? 'Action Required' : 'Action Taken'} </StatusText>
          </StatusCont>
        </AllDetailsCont>
      </EachConsult>
    );
  };

  const notAvalibaleUI = () => {
    return (
      <NotAvalibaleCont>
        <NotAvalibaleText>
          No online consults are made till now. You will get soon, just be
          patience.
        </NotAvalibaleText>
      </NotAvalibaleCont>
    );
  };

  const allConsultsUI = () => {
    let onlineConsultsArr = consultsStore.allConsults.filter(
      con => con.data.mode === 'online',
    );
    if (!onlineConsultsArr.length > 0) {
      return notAvalibaleUI();
    }
    return onlineConsultsArr.map(con => eachConsultUI(con));
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

const ActionCont = styled.View`
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-color: ${props => props.theme.primary};
  border-width: 5px;
`;

const EachConsult = styled.View`
  height: 250px;
  background-color: ${props => props.theme.secondary};
  flex-direction: row;
  width: 90%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
  padding-top: 20px;
  padding-bottom: 50px;
`;
