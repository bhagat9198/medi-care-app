/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView, TouchableNativeFeedback} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DrawerDoctor} from './../../constants/Navigation';

export default function Dashboard(props) {
  const theme = useSelector(state => state.appReducer.colors);

  const articleCardUI = () => {
    return (
      <EachCard
        style={{
          height: 350,
          marginBottom: Dimensions.get('window').height * 0.03,
          marginLeft: Dimensions.get('window').width * 0.03,
          marginRight: Dimensions.get('window').width * 0.03,
        }}>
        <CardHeading
          style={{
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
          }}>
          <HeadingText>Want to more helpful?</HeadingText>
        </CardHeading>
        <CardBody>
          <BodyText>
            Sharing is caring. Be additional helpful by writing healthcare
            articles. This will not help users and your patients but also you.
            As, more the people read you articles, more you become populat thus
            better results for you. What are you waiting for, tap below to hop
            in artcles page.
          </BodyText>
        </CardBody>
        <CardFooter
          style={{
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
            paddingRight: Dimensions.get('window').width * 0.05,
          }}>
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate(DrawerDoctor.articlesDrawer)
            }>
            <FooterCont>
              <FooterText>View All</FooterText>
              <AntDesign
                name="doubleright"
                size={24}
                color="green"
                style={{marginLeft: Dimensions.get('window').width * 0.05}}
              />
            </FooterCont>
          </TouchableNativeFeedback>
        </CardFooter>
      </EachCard>
    );
  };

  const consultCardUI = () => {
    return (
      <EachCard
        style={{
          height: 350,
          marginBottom: Dimensions.get('window').height * 0.03,
          marginLeft: Dimensions.get('window').width * 0.03,
          marginRight: Dimensions.get('window').width * 0.03,
        }}>
        <CardHeading
          style={{
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
          }}>
          <HeadingText>Play your part in pandemic</HeadingText>
        </CardHeading>
        <CardBody>
          <BodyText>
            Stitutaion is worst. Being a doctor, help other people by giving
            consultaion advice through online or offline. Help them out an be a
            saviour. Register yourslef so that users can see you and have
            consultaion.
          </BodyText>
        </CardBody>
        <CardFooter
          style={{
            paddingTop: Dimensions.get('window').height * 0.02,
            paddingBottom: Dimensions.get('window').height * 0.02,
            paddingRight: Dimensions.get('window').width * 0.05,
          }}>
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate(DrawerDoctor.doctorsDrawer)
            }>
            <FooterCont>
              <FooterText>View All</FooterText>
              <AntDesign
                name="doubleright"
                size={24}
                color="green"
                style={{marginLeft: Dimensions.get('window').width * 0.05}}
              />
            </FooterCont>
          </TouchableNativeFeedback>
        </CardFooter>
      </EachCard>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <AllCards>
            {consultCardUI()}
            {articleCardUI()}
          </AllCards>
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}

const FooterText = styled.Text`
  font-size: 18px;
  color: green;
`;
const BodyText = styled.Text`
  color: ${props => props.theme.text_primary};
  font-size: 20px;
`;
const HeadingText = styled.Text`
  font-size: 25px;
  color: orange;
`;

const FooterCont = styled.View`
  flex-direction: row;
`;
const CardFooter = styled.View`
  background-color: ${props => props.theme.secondary};
  border-top-color: ${props => props.theme.text_secondary};
  border-top-width: 1px;
  align-items: flex-end;
`;
const CardBody = styled.View`
  flex: 1;
  padding: ${props => Dimensions.get('window').width * 0.03}px;
`;
const CardHeading = styled.View`
  background-color: ${props => props.theme.secondary};
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  align-items: center;
`;
const EachCard = styled.View`
  border-radius: 10px;
  border-color: ${props => props.theme.text_secondary};
  border-width: 1px;
`;
const AllCards = styled.View`
  margin-bottom: 50px;
`;
const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
