/* eslint-disable */

import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function AllDoctors(props) {
  const theme = useSelector(state => state.appReducer.colors);

  const eachDocLeft = () => {
    return(<EachDocCont
      style={{
        marginBottom: Dimensions.get('window').height * 0.05,
        borderColor: theme.text_primary,
      }}>
      <TouchableNativeFeedback
        onPress={() => {
          console.log('clicked');
          return props.navigation.navigate('doctor', {data: 'lol'});
        }}>
        <EachDoc>
          <DetailsContLeft
            style={{
              paddingRight: Dimensions.get('window').width * 0.05,
            }}>
            <NameCont>
              <NameText>Dr. ABCD</NameText>
            </NameCont>
            <SpecialistCont>
              <SpecialistText>Dentist</SpecialistText>
            </SpecialistCont>
            <HostpitalCont>
              <HostpitalText>
                Work at <HostpitalNameText>LOL</HostpitalNameText>{' '}
              </HostpitalText>
            </HostpitalCont>
          </DetailsContLeft>
          <IconContLeft
            style={{
              paddingLeft: Dimensions.get('window').width * 0.05,
              paddingRight: Dimensions.get('window').width * 0.05,
            }}>
            <Fontisto name="doctor" color={theme.text_secondary} size={30} />
          </IconContLeft>
        </EachDoc>
      </TouchableNativeFeedback>
    </EachDocCont>)
  }

  const eachDocRight = () => {
    return (
      <EachDocCont
        style={{
          marginBottom: Dimensions.get('window').height * 0.05,
          borderColor: theme.text_primary,
        }}>
        <TouchableNativeFeedback
          onPress={() => {
            console.log('clicked');
            return props.navigation.navigate('doctor', {data: 'lol'});
          }}>
          <EachDoc>
            <IconCont
              style={{
                paddingLeft: Dimensions.get('window').width * 0.05,
                paddingRight: Dimensions.get('window').width * 0.05,
              }}>
              <Fontisto name="doctor" color={theme.text_secondary} size={30} />
            </IconCont>
            <DetailsCont
              style={{
                paddingLeft: Dimensions.get('window').width * 0.05,
              }}>
              <NameCont>
                <NameText>Dr. ABCD</NameText>
              </NameCont>
              <SpecialistCont>
                <SpecialistText>Dentist</SpecialistText>
              </SpecialistCont>
              <HostpitalCont>
                <HostpitalText>
                  Work at <HostpitalNameText>LOL</HostpitalNameText>{' '}
                </HostpitalText>
              </HostpitalCont>
            </DetailsCont>
          </EachDoc>
        </TouchableNativeFeedback>
      </EachDocCont>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          {eachDocRight()}
          {eachDocLeft()}

        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}

const HostpitalNameText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: yellow;
`;
const HostpitalText = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.text_primary};
`;
const HostpitalCont = styled.View``;
const SpecialistText = styled.Text`
  font-size: 20px;
  font-style: italic;
  color: ${props => props.theme.text_primary};
`;
const SpecialistCont = styled.View``;
const NameText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: yellow;
`;
const NameCont = styled.View``;

const DetailsContLeft = styled.View`
  width: 80%;
  align-items: flex-end;  
`;

const DetailsCont = styled.View`
  width: 80%;
`;

const IconContLeft = styled.View`
  width: 20%;
  justify-content: center;
  border-left-width: 1px;
  border-color: ${props => props.theme.text_primary};
`;

const IconCont = styled.View`
  width: 20%;
  justify-content: center;
  border-right-width: 1px;
  border-color: ${props => props.theme.text_primary};
`;

const EachDocCont = styled.View`
  width: 95%;
  border-radius: 10px;
  align-items: center;
  border-width: 1;
  border-radius: 20px;
  height: 120px;
`;

const EachDoc = styled.View`
  background-color: ${props => props.theme.secondary};
  flex: 1;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  flex: 1;
`;

const styles = StyleSheet.create({});
