/* eslint-disable */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {StackPatient} from '../constants/Navigation';


export default function EachConsult(props) {
  // console.log('EachConsult');
  console.log(props);
  return (
    <EachConsultCont
      style={{
        marginTop: Dimensions.get('window').height * 0.01,
        marginBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.01,
      }}>
      <TouchableWithoutFeedback onPress={() => {
        // console.log(props.navigation);
        return props.navigation.navigate( StackPatient.doctor, {data: 'lol'})
      }}>
        <ConsultDetailCont>
          <LeftCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <Fontisto name="doctor" size={30} color="green" />
          </LeftCont>
          <MiddleCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
              paddingTop: Dimensions.get('window').height * 0.01,
              paddingBottom: Dimensions.get('window').height * 0.01,
            }}>
            <MainHeading>
              <MainHeadingText>{`${props.consultData.initailName} ${props.consultData.fName} ${props.consultData.lName}`}</MainHeadingText>
            </MainHeading>
            <WorkAtText>
              Work at
              <HospitalNameText> {props.consultData.hospitalName}</HospitalNameText>
            </WorkAtText>
          </MiddleCont>
          <RightCont
            style={{
              paddingLeft: Dimensions.get('window').width * 0.02,
              paddingRight: Dimensions.get('window').width * 0.02,
            }}>
            <IconPriceCont>
              <IconCont
                style={{
                  paddingRight: Dimensions.get('window').width * 0.01,
                }}>
                <FontAwesome name="rupee" size={32} color="red" />
              </IconCont>
              <PriceText>{props.consultData.fee}</PriceText>
            </IconPriceCont>
          </RightCont>
        </ConsultDetailCont>
      </TouchableWithoutFeedback>
      <BookCont>
        <Button title="Book Appointment" color="green" onPress={() => props.modalHandler({
          docId: props.consultData.docId,
          fee: props.consultData.fee,
          doctorName: {
            initial: props.consultData.initailName,
            fName: props.consultData.fName,
            lName: props.consultData.lName,
          }
        })} />
      </BookCont>
    </EachConsultCont>
  );
}

const ConsultDetailCont = styled.View`
  flex-direction: row;
`;
const BookCont = styled.View``;
const PriceText = styled.Text`
  font-size: 29px;
  color: red;
`;
const HospitalNameText = styled.Text`
  color: ${props => props.theme.text_primary};
`;

const WorkAtText = styled.Text`
  font-style: italic;
  color: ${props => props.theme.text_secondary};
  font-size: 18px;
`;

const MainHeadingText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.text_primary};
`;
const MainHeading = styled.View``;
const IconPriceCont = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const IconCont = styled.View``;
const RightCont = styled.View`
  justify-content: center;
  text-align: center;
`;
const MiddleCont = styled.View`
  flex: 1;
`;
const LeftCont = styled.View`
  justify-content: center;
  text-align: center;
`;
const EachConsultCont = styled.View`
  background-color: ${props => props.theme.secondary};
`;
