/* eslint-disable */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';
import openMap from 'react-native-open-maps';

export default function Doctor(props) {
  const theme = useSelector(state => state.appReducer.colors);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Button
          onPress={() => {
            console.log('click');
            openMap({latitude: 13.0830973, longitude: 77.5467358});
          }}>
          <Text>open MAP</Text>
        </Button>
      </MainContainer>
    </ThemeProvider>
  );
}
const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  flex: 1;
`;

const Text = styled.Text`
  color: ${props => props.theme.text_primary};
`;

const Button = styled.TouchableOpacity`
  color: #f0f;
  background-color: #ff0011;
`;

const styles = StyleSheet.create({});
