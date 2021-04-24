/* eslint-disable */

import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Dashboard() {
  const theme = useSelector(state => state.appReducer.colors);

  const eachCardUI = () => {
    return (
      <EachCard
        style={{
          height: Dimensions.get('window').height * 0.3,
          marginBottom: Dimensions.get('window').height * 0.03,
          marginLeft: Dimensions.get('window').width * 0.03,
          marginRight: Dimensions.get('window').width * 0.03,
        }}>
        <CardHeading
          style={{
            paddingTop: Dimensions.get('window').width * 0.01,
            paddingBottom: Dimensions.get('window').width * 0.01,
          }}>
          <HeadingText>Heading</HeadingText>
        </CardHeading>
        <CardBody>
          <BodyText>Body</BodyText>
        </CardBody>
        <CardFooter
          style={{
            paddingTop: Dimensions.get('window').width * 0.01,
            paddingBottom: Dimensions.get('window').width * 0.01,
            paddingRight: Dimensions.get('window').width * 0.05,
          }}>
          <FooterCont>
            <FooterText>View All</FooterText>
            <AntDesign
              name="doubleright"
              size={24}
              color="green"
              style={{marginLeft: Dimensions.get('window').width * 0.05}}
            />
          </FooterCont>
        </CardFooter>
      </EachCard>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <AllCards>
            {eachCardUI()}
            {eachCardUI()}
            {eachCardUI()}
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
`;
const HeadingText = styled.Text`
  font-size: 30px;
  color: red;
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
`;
const CardHeading = styled.View`
  background-color: ${props => props.theme.secondary};
  border-bottom-color: ${props => props.theme.text_secondary};
  border-bottom-width: 1px;
  align-items: center;
`;
const EachCard = styled.View`
  border-radius: 10;
  border-color: ${props => props.theme.text_secondary};
  border-width: 1;
`;
const AllCards = styled.View`
  margin-bottom: 50px;
`;
const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
