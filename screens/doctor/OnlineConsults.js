/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView, TouchableNativeFeedback} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Consults() {
  const theme = useSelector(state => state.appReducer.colors);

  const eachConsultUI = () => {
    return (
      <EachConsult
        style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        <ActionCont>
          <TouchableNativeFeedback>
            <MaterialIcons name="cancel" size={30} color="red" />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <MaterialIcons name="check-circle" size={30} color="green" />
          </TouchableNativeFeedback>
        </ActionCont>
        <AllDetailsCont>
          <DetailsCont>
            <DateCont>
              <DateContText>27th Aprail,21</DateContText>
            </DateCont>
            <DetailCont>
              <Label>
                <LabelText>Time</LabelText>
              </Label>
              <Info>
                <InfoText>12:30</InfoText>
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
                <LabelText>Cause</LabelText>
              </Label>
              <Info>
                <InfoText>Fever</InfoText>
              </Info>
            </DetailCont>
          </DetailsCont>
          <StatusCont>
            <StatusText>Action Required</StatusText>
          </StatusCont>
        </AllDetailsCont>
      </EachConsult>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <AllConsults style={{flex: 1}}>
            {eachConsultUI()}
            {eachConsultUI()}
            {eachConsultUI()}
            {eachConsultUI()}
          </AllConsults>
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}

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
  flex: 1;
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
