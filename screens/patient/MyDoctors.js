/* eslint-disable */

import React, {useState} from 'react';
import {Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MyDoctors() {
  const theme = useSelector(state => state.appReducer.colors);

  const eachDoctorUI = () => {
    return (
      <EachDoctor
        style={{
          marginBottom: Dimensions.get('window').height * 0.05,
        }}>
        <DoctorHeading
          style={{
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
          }}>
          <HeadingText>Doctor Name</HeadingText>
        </DoctorHeading>
        <DoctorBody>
          <ScrollView nestedScrollEnabled={true}>
            <BodyCont
              style={{
                paddingTop: Dimensions.get('window').height * 0.02,
                paddingBottom: Dimensions.get('window').height * 0.02,
                paddingLeft: Dimensions.get('window').width * 0.02,
                paddingRight: Dimensions.get('window').width * 0.02,
              }}></BodyCont>

            <BodyText>Consult History</BodyText>
            {eachConsultUI()}
            {eachConsultUI()}
          </ScrollView>
        </DoctorBody>
        <DoctorFooter
          style={{
            paddingTop: Dimensions.get('window').height * 0.01,
            paddingBottom: Dimensions.get('window').height * 0.01,
          }}>
          <TouchableHighlight activeOpacity={1}>
            <FooterCont>
              <FooterText>More about the doctor</FooterText>
              <AntDesign
                name="right"
                size={24}
                color="green"
                style={{
                  paddingLeft: Dimensions.get('window').width * 0.01,
                }}
              />
            </FooterCont>
          </TouchableHighlight>
        </DoctorFooter>
      </EachDoctor>
    );
  };

  const eachConsultUI = () => {
    return (
      <EachConsult
        style={{
          marginBottom: Dimensions.get('window').height * 0.02,
          marginTop: Dimensions.get('window').height * 0.02,
        }}>
        <ConsultHeading>
          <ConsultDateText>22nc Oct</ConsultDateText>
          <ConsultDayText>SAT</ConsultDayText>
        </ConsultHeading>
        <ConsultBody style={{
          paddingLeft: Dimensions.get('window').width * 0.02,
          paddingRight: Dimensions.get('window').width * 0.02,
        }}>
          <ConsultDetail
            style={{
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <ConsultLabel
              style={{
                marginRight: Dimensions.get('window').width * 0.02,
              }}>
              <ConsultLabelText>Cause</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText>
                gilyfyul sgrnwho owehsgi vhiuw igfsegrhwe ioaugigaw
              </ConsultInfoText>
            </ConsultInfo>
          </ConsultDetail>
          <ConsultDetail
            style={{
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <ConsultLabel
              style={{
                marginRight: Dimensions.get('window').width * 0.02,
              }}>
              <ConsultLabelText>Cost</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText>569</ConsultInfoText>
            </ConsultInfo>
          </ConsultDetail>
          <ConsultDetail
            style={{
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <ConsultLabel
              style={{
                marginRight: Dimensions.get('window').width * 0.02,
              }}>
              <ConsultLabelText>Doctor Review</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText>gilyfyul</ConsultInfoText>
            </ConsultInfo>
          </ConsultDetail>
          <ConsultDetail
            style={{
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <ConsultLabel
              style={{
                marginRight: Dimensions.get('window').width * 0.02,
              }}>
              <ConsultLabelText>Your Review</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText>gilyfyul</ConsultInfoText>
            </ConsultInfo>
          </ConsultDetail>
        </ConsultBody>
      </EachConsult>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          nestedScrollEnabled={true}>
          {eachDoctorUI()}
          {eachDoctorUI()}
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}

const ConsultInfoText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-weight: bold;
  font-size: 20px;
`;
const ConsultLabelText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-style: italic;
  font-size: 19px;
`;
const ConsultInfo = styled.View`
  flex-shrink: 1;
`;
const ConsultLabel = styled.View``;
const ConsultDetail = styled.View`
  flex-direction: row;
`;
const ConsultBody = styled.View``;
const ConsultDayText = styled.Text`
  font-size: 17px;
  color: orange;
`;
const ConsultDateText = styled.Text`
  font-size: 20px;
  color: yellow;
`;
const ConsultHeading = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const EachConsult = styled.View``;

const FooterText = styled.Text`
  color: green;
  font-size: 18px;
`;

const DoctorFooter = styled.View`
  align-items: center;
`;

const FooterCont = styled.View`
  flex-direction: row;
`;

const BodyText = styled.Text`
  color: ${props => props.theme.text_primary};
`;

const BodyCont = styled.View``;

const DoctorBody = styled.View`
  flex: 1;
`;

const HeadingText = styled.Text`
  color: red;
  font-size: 22px;
`;

const DoctorHeading = styled.View`
  background-color: ${props => props.theme.secondary};
  align-items: center;
`;
const EachDoctor = styled.View`
  height: 400px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.text_primary};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
