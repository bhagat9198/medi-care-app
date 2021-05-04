/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConsultsSnapshot from './../../components/helpers/ConsultsSnapshot';
import {StackPatient} from './../../constants/Navigation';

export default function MyDoctors(props) {
  const theme = useSelector(state => state.appReducer.colors);
  let consultsStore = useSelector(state => state.consultsReducer);
  let consultsStoreArr = consultsStore.allConsults;
  let acceptedConsults = consultsStoreArr.filter(
    cs => cs.status === 'Scheduled',
  );

  const eachDoctorUI = () => {
    return acceptedConsults.map((con, index) => {
      return (
        <EachDoctor key={index}
          style={{
            marginBottom: Dimensions.get('window').height * 0.05,
          }}>
          <DoctorHeading
            style={{
              paddingTop: Dimensions.get('window').height * 0.02,
              paddingBottom: Dimensions.get('window').height * 0.02,
            }}>
            <HeadingText>{`${con.doctor.initailName} ${con.doctor.fName} ${con.doctor.lName}`}</HeadingText>
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
              {eachConsultUI(con)}
            </ScrollView>
          </DoctorBody>
          <DoctorFooter
            style={{
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <TouchableHighlight
              activeOpacity={1}
              onPress={() => props.navigation.navigate(StackPatient.doctor, {
                uid: con.doctor.docId,
                userType: con.doctor.docType
              })}>
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
    });
  };

  const eachConsultUI = con => {
    let booked = new Date(con.booked).toISOString().split('T')[0];
    let date = new Date(con.data.date).toISOString().split('T')[0];
    let time = new Date(con.data.time.seconds * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0];
    return (
      <EachConsult
        style={{
          marginBottom: Dimensions.get('window').height * 0.02,
          marginTop: Dimensions.get('window').height * 0.02,
          paddingLeft: Dimensions.get('window').width * 0.02,
            paddingRight: Dimensions.get('window').width * 0.02,
        }}>
        <ConsultHeading >
          <ConsultDateText>{date} </ConsultDateText>
          <ConsultDayText> {time}</ConsultDayText>
        </ConsultHeading>
        <ConsultBody
          style={{
            marginTop: Dimensions.get('window').height * 0.02,
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
              <ConsultInfoText>{con.data.title}</ConsultInfoText>
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
              <ConsultInfoText>{con.data.fee}</ConsultInfoText>
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
              <ConsultLabelText>Booked On</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText> {booked}</ConsultInfoText>
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
              <ConsultInfoText>
                {' '}
                {con.doctor.review ? con.doctor.review : 'Not Given yet'}
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
              <ConsultLabelText>Your Review</ConsultLabelText>
            </ConsultLabel>
            <ConsultInfo>
              <ConsultInfoText>
                {' '}
                {con.data.review ? con.data.review : 'Not Given yet'}
              </ConsultInfoText>
            </ConsultInfo>
          </ConsultDetail>
        </ConsultBody>
      </EachConsult>
    );
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
      <MainContainer>
        <ConsultsSnapshot />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          nestedScrollEnabled={true}>
          {acceptedConsults.length > 0 ? eachDoctorUI() : notAvalibaleUI()}
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
