import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SplashScreen from 'expo-splash-screen';

import LogIn from "./../components/LogIn";
import { autoLogin } from "./../store/actions/auth";
import DoctorNavigation from "./../Navigation/doctor";
import PatientNavigation from "./../Navigation/patient";
import { View, Text } from "react-native";

export default function StartingScreen(props) {
  const [doctorComp, setDoctorComp] = useState(false);
  const [patientComp, setPatientComp] = useState(false);
  const [appLoad, setAppLoad] = useState(false);

  const appUserState = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  if (!appLoad) {
    return <View>
      <Text>Loading</Text>
    </View>;
  }

  const findUserState = () => {
    console.log("appUserState======================", appUserState);
    if (appUserState.userId) {
      if (appUserState.userType === "doctor") {
        setDoctorComp(true);
      }
      if (appUserState.userType === "patients") {
        setPatientComp(true);
      }
    } else {
      setDoctorComp(false);
      setPatientComp(false);
    }
    setAppLoad(true)
  };


  useEffect(() => {
    findUserState();
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
  console.log(doctorComp, patientComp);

  
  

  return <>{ComponentToRender}</>;
}
