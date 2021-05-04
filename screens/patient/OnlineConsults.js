/* eslint-disable */

import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import BookAppointment from './../../components/BookAppointment';

import EachConsult from './../../components/EachConsult';

export default function onlineConsults(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [bookAppointmentToggle, setbookAppointmentToggle] = useState(false);

  const allConsultsUI = () => {
    return(
      <AllConsults>
        <EachConsult navigation={props.navigation} modalHandler={bookAppointmentToggleHandler}></EachConsult>
      </AllConsults>
    )
  }

  const bookAppointmentToggleHandler = () => {
    // console.log(bookAppointmentToggle);
    setbookAppointmentToggle(!bookAppointmentToggle);
  }

  return (

    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          {allConsultsUI()}
        </MainContainer>
      </ScrollView>
      <BookAppointment theme={theme} modalStatus={bookAppointmentToggle} modalStatusHandler={bookAppointmentToggleHandler} />
    </ThemeProvider>

  );
}

const AllConsults = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
