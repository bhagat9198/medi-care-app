/* eslint-disable */

import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import BookAppointment from './../../components/BookAppointment';

import EachConsult from './../../components/EachConsult';
import {DrawerPatient} from './../../constants/Navigation';
import {extractAllConsults, bookConsult} from './../../store/actions/patient';

export default function OfflineConsults(props) {
  const theme = useSelector(state => state.appReducer.colors);
  const [bookAppointmentToggle, setbookAppointmentToggle] = useState(false);
  const [consultsList, setConsultsList] = useState([]);
  const [selectedConsult, setSelectedConsult] = useState(null);

  const dispatch = useDispatch();

  async function fetchData() {
    let res = await dispatch(extractAllConsults());
    // console.log('oofline consults res', res);
    if (res.status) {
      setConsultsList(res.data);
    } else {
      Alert.alert(res.title, res.message);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const bookConsultHandler = async(data) => {
    data = {
      ...data,
      mode: 'offline',
      ...selectedConsult,
    };
    let res = await dispatch(bookConsult(data));
    // console.log('res each consult', res);
    if (res.status) {
      props.navigation.navigate(DrawerPatient.appointmentsDrawer);
    } else {
      Alert.alert(res.title, res.message);
    }
  };

  const allConsultsUI = () => {
    return consultsList.map((consult, index) => {
      return (
        <AllConsults key={index}>
          <EachConsult
            consultData={consult}
            navigation={props.navigation}
            modalHandler={(flag) => bookAppointmentToggleHandler(flag)}
           ></EachConsult>
          <BookAppointment
            theme={theme}
            modalStatus={bookAppointmentToggle}
            modalStatusHandler={bookAppointmentToggleHandler}
            bookConsultHandler={data => bookConsultHandler(data)}
            consultData={consult}
          />
        </AllConsults>
      );
    });
  };

  const bookAppointmentToggleHandler = (flag = false) => {
    if (flag) {
      setSelectedConsult(flag);
    }
    // console.log(bookAppointmentToggle);
    setbookAppointmentToggle(!bookAppointmentToggle);
  };

  const notAvalibaleUI = () => {
    <NotAvalibaleCont>
      <NotAvalibaleText>No Doctors for consultantion yet.</NotAvalibaleText>
    </NotAvalibaleCont>;
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MainContainer>
          {consultsList.length > 0 ? allConsultsUI() : notAvalibaleUI()}
        </MainContainer>
      </ScrollView>
    </ThemeProvider>
  );
}

const NotAvalibaleText = styled.Text`
  color: orange;
  font-size: 20px;
`;
const NotAvalibaleCont = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AllConsults = styled.View``;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
`;
