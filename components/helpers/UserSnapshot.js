/* eslint-disable*/

import React from 'react';
import {useEffect} from 'react';
import { View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserState} from '../../store/actions/auth';
import firestore from '@react-native-firebase/firestore';

export default function UserSnapshot() {
  let authReducer = useSelector(state => state.authReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe = firestore()
      .collection(authReducer.userType).doc(authReducer.userId)
      .onSnapshot(doc => {
        const docData = doc.data();
        let wholeData = {
          ...docData,
        }
        dispatch(updateUserState(wholeData));
      });
    return () => unsubscribe();
  }, []);

  return <View></View>;
}
