/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LogIn from './../components/LogIn';
import {autoLogin} from './../store/actions/auth';
import DoctorNavigation from '../navigation/doctor/doctor';
import PatientNavigation from '../navigation/patient/patient';
import {View, Text, Alert} from 'react-native';

export default function StartingScreen(props) {
  const [doctorComp, setDoctorComp] = useState(false);
  const [patientComp, setPatientComp] = useState(false);
  const [appLoad, setAppLoad] = useState(false);
  const [error, setError] = useState(false);

  const appUserState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();
  let ComponentToRender;

  const setErrorHandler = message => {
    setError(message);
  };

  useEffect(() => {
    componentToRender();
  }, [appUserState]);

  useEffect(async () => {
    let result = await dispatch(autoLogin());
    if (result.userStatus) {
      if (!result.userStatus) {
        setError(result.message);
        return Alert.alert('Auto LogIn', error);
      } else {
        componentToRender();
      }
    }
  }, [dispatch]);

  const componentToRender = () => {
    if (appUserState.userId) {
      if (appUserState.userType === 'doctors') {
        setDoctorComp(true);
        setError(false);
      }
      if (appUserState.userType === 'patients') {
        setPatientComp(true);
        setError(false);
      }
    } else {
      setDoctorComp(false);
      setPatientComp(false);
    }
  };

  if (!doctorComp && !patientComp) {
    ComponentToRender = <LogIn setErrorHandler={msg => setErrorHandler(msg)} />;
  }
  if (doctorComp && !patientComp) {
    ComponentToRender = <DoctorNavigation />;
  }
  if (!doctorComp && patientComp) {
    ComponentToRender = <PatientNavigation />;
  }

  return <>{ComponentToRender}</>;
}
