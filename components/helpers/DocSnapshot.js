/* eslint-disable */

import React, {useEffect} from 'react';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {useDispatch} from 'react-redux';
import {updateDoctorState} from './../../store/actions/doctor';

export default Snapshot = props => {
  // let doctorReducer = useSelector(state => state.doctorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = firestore()
      .collection('doctors')
      .onSnapshot(snaps => {
        const docs = snaps.docs;
        const AllDocs = [];
        docs.map(doc => {
          let data = doc.data();
          AllDocs.push(data);
        });
        dispatch(updateDoctorState(AllDocs));
      });

    return () => unsubscribe();
  }, []);

  return <View></View>;
};
