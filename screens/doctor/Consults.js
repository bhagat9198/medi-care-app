/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import ConsultsSnapshot from './../../components/helpers/ConsultsSnapshot';

export default function Consults() {
  const theme = useSelector(state => state.appReducer.colors);
  const consultsStore = useSelector(state => state.consultsReducer);

  const eachConsultUI = () => {
    return (
      <EachConsult
        style={{marginBottom: Dimensions.get('window').height * 0.05}}>
        <DayTimeCont>
          <TimeCont>
            <TimeContText>12</TimeContText>
          </TimeCont>
          <TimeCont>
            <TimeContText>30</TimeContText>
          </TimeCont>
          <DayCont>
            <DayContText>SAT</DayContText>
          </DayCont>
        </DayTimeCont>
        <AllDetailsCont>
          <DetailsCont>
            <DateCont>
              <DateContText>27th Aprail,21</DateContText>
            </DateCont>
            <DetailCont>
              <Label>
                <LabelText>Mode</LabelText>
              </Label>
              <Info>
                <InfoText>Online</InfoText>
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
            <StatusText>Accepted</StatusText>
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
            {/* {consultsStore?.allConsults?.length } */}
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

const DayTimeCont = styled.View`
  width: 20%;
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

// const Text = styled.Text`
//   color: ${props => props.theme.text_primary};
// `;
