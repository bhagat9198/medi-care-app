/* eslint-disable */

import React from 'react';
import {ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import EachConsult from './../../components/EachConsult';

export default function onlineConsults() {
  const theme = useSelector(state => state.appReducer.colors);

  const allConsultsUI = () => {
    return(
      <AllConsults>
        <EachConsult></EachConsult>
        <EachConsult></EachConsult>
      </AllConsults>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          {allConsultsUI()}
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const AllConsults = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
