/* eslint-disable */

import React from 'react';
import {ScrollView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

export default function DiseaseAnalysis() {
  const theme = useSelector(state => state.appReducer.colors);
  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer></MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
