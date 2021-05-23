/* eslint-disable*/

import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';

import {updateConsultsState} from './.././../store/actions/auth';

export default function ConsultsSnapshot() {
  let authReducer = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;
    if(authReducer.userType === "doctors") {
      unsubscribe = firestore()
      .collection('consults')
      .where('doctor.docId', '==', authReducer.userId)
      .onSnapshot(snaps => {
        let docs = snaps.docs;
        let allConsults = [];
        docs.map(doc => {
          let data = doc.data();
          allConsults.push(data);
        });
        dispatch(updateConsultsState(allConsults));
      });
    } else {
      unsubscribe = firestore()
      .collection('consults')
      .where('user.userId', '==', authReducer.userId)
      .onSnapshot(snaps => {
        let docs = snaps.docs;
        let allConsults = [];
        docs.map(doc => {
          let data = doc.data();
          allConsults.push(data);
        });
        dispatch(updateConsultsState(allConsults));
      });
    }
    
    return () => unsubscribe();
  }, []);

  return <View></View>;
}
