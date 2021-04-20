/* eslint-disable */

import React from 'react';
import {SafeAreaView} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

export default function Account(props) {
  const theme = useSelector(state => state.appReducer.colors);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Text>Account</Text>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;

const Text = styled.Text`
  color: ${props => props.theme.text_primary};
`;
