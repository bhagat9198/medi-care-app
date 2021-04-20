/* eslint-disable */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';

export default function AllDoctors(props) {
  const theme = useSelector(state => state.appReducer.colors);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ScrollView>
          <TouchableNativeFeedback
            onPress={() => {
              console.log('clicked');
              return props.navigation.navigate('doctor', {data: 'lol'});
            }}>
            <EachDoc>
              <Text>abcd</Text>
            </EachDoc>
          </TouchableNativeFeedback>
        </ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
}
const MainContainer = styled.View`
  background-color: ${props => props.theme.primary};
  flex: 1;
`;

const Text = styled.Text`
  color: ${props => props.theme.text_primary}; ;
`;

const EachDoc = styled.View`
  background-color: ${props => props.theme.secondary};
  flex: 1;
`;

const styles = StyleSheet.create({});
