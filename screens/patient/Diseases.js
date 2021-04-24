/*eslint-disable*/

import React, {useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

export default Diseases = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.appReducer.colors);

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Text>Hi</Text>
      </MainContainer>
    </ThemeProvider>
  );
};

const Text = styled.Text`
  color: white;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
