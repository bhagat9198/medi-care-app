/* eslint-disable*/

export const ADD_CONSULTS = 'ADD_CONSULTS';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { log } from 'react-native-reanimated';

export const extractAllConsults = () => {
  return async dispatch => {
    return await firestore()
      .collection('doctors')
      .get()
      .then(snaps => {
        let docs = snaps.docs;

        let allConsults = [];
        docs.map(doc => {
          let docData = doc.data();
          if (!docData.hospital) return;
          allConsults.push({
            initailName: docData.initailName,
            fName: docData.fName,
            lName: docData.lName,
            hospitalName: docData.hospital.name,
            docId: doc.id,
            userType: docData.userType,
            fee: docData.hospital.fee
          });
        });
        return {
          status: true,
          data: allConsults,
        };
      })
      .catch(error => {
        return {
          status: false,
          title: 'Failed to Fetch',
          message: error.message,
        };
      });
  };
};

export const bookConsult = (data) => {
  return async(dispatch, getState) => {
    let authReducer = getState().authReducer;
    let userRef = await firestore().collection(authReducer.userType).doc(authReducer.userId);
    let docRef = await firestore().collection('doctors').doc(data.docId);
    let consultRefId;
    return firestore().collection('consults').add({
      data: {
        time: data.time,
        date: data.date,
        title: data.title,
        fee: data.fee,
        review: null,
        mode: data.mode
      },
      booked: new Date().valueOf(),
      user : {
        userId: authReducer.userId,
        userType: authReducer.userType,
      },
      doctor : {
        docId: data.docId,
        docType: 'doctors',
        review: null,
        initailName: data.doctorName.initial,
        fName: data.doctorName.fName,
        lName: data.doctorName.lName
      },
      status : 'Pending'
    }).then(async(consultRef) => {
      consultRefId = consultRef.id;
      return  userRef.get();
    }).then(doc => {
      let docData = doc.data();
      docData.consults.push({collection : 'consults', id: consultRefId})
      return userRef.update(docData);
    }).then(() => {
      return docRef.get();
    }).then(docDoc => {
      let docDocData = docDoc.data();
      docDocData.consults.push({collection : 'consults', id: consultRefId})
      return docRef.update(docDocData);
    }).then(() => {
      return {
        status: true,
      }
    }).catch(error => {
      return {
        status: false,
        title: 'Cant make consultation with doctor',
        message: error.message
      }
    })
  }
}

export const bookReminder = data => {
  return async(dispatch, getState) => {
    let authReducer = getState().authReducer;

    try {
      let ref = await firestore().collection(authReducer.userType).doc(authReducer.userId);
      let doc = await ref.get();
      let docData = doc.data();
      docData.reminders.push(data);
      console.log(docData);
      ref.update(docData);
      console.log('doneeeeeee');
      return {
        status: true
      }

    } catch(error) {
      return {
        status: false,
        title: 'Something went wrong',
        message: `Check your network. ${error.message}`
      }
    }
  }
}

