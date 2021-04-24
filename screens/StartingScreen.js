import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LogIn from './../components/LogIn';
import {autoLogin} from './../store/actions/auth';
import DoctorNavigation from '../navigation/doctor/doctor';
import PatientNavigation from '../navigation/patient/patient';
import {View, Text} from 'react-native';

export default function StartingScreen(props) {
  const [doctorComp, setDoctorComp] = useState(false);
  const [patientComp, setPatientComp] = useState(false);
  const [appLoad, setAppLoad] = useState(false);

  const appUserState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (appUserState.userId) {
      if (appUserState.userType === 'doctors') {
        setDoctorComp(true);
      }
      if (appUserState.userType === 'patients') {
        setPatientComp(true);
      }
    } else {
      setDoctorComp(false);
      setPatientComp(false);
    }
    setAppLoad(true);
  }, [appUserState, appLoad]);

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  let ComponentToRender;
  if (!doctorComp && !patientComp) {
    ComponentToRender = <LogIn />;
  }
  if (doctorComp && !patientComp) {
    ComponentToRender = <DoctorNavigation />;
  }
  if (!doctorComp && patientComp) {
    ComponentToRender = <PatientNavigation />;
  }

  return (
    <>
      {!appLoad ? (
        <View>
          <Text>Loshuiguyd</Text>
        </View>
      ) : (
        ComponentToRender
      )}
    </>
  );
}
