/* eslint-disable */

import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableNativeFeedback} from 'react-native';

import {StackDoctor} from './../../constants/Navigation';

export default MyArticles = props => {
  const theme = useSelector(state => state.appReducer.colors);

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <EachArticle>
          <TouchableNativeFeedback onPress={() => props.navigation.navigate(StackDoctor.article, {data: 'lol'})}>
            <Text>My Aticles</Text>
          </TouchableNativeFeedback>
        </EachArticle>
      </MainContainer>
    </ThemeProvider>
  );
};

const EachArticle = styled.View`
  flex: 1;
  color: ${props => props.theme.text_primary};
  background-color: ${props => props => props.theme.secondary};
`;

const Text = styled.Text`
  flex: 1;
  color: ${props => props.theme.text_primary};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
