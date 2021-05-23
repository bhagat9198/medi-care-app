/* eslint-disable*/

export const UPDATE_DISEASES_SYMTOMS_STATE = 'UPDATE_DISEASES_SYMTOMS_STATE';
export const UPDATE_PRECAUTION_DESCRIBTION_STATE =
  'UPDATE_PRECAUTION_DESCRIBTION_STATE';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
            fee: docData.hospital.fee,
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

export const bookConsult = data => {
  return async (dispatch, getState) => {
    let authReducer = getState().authReducer;
    let randomId = Math.random();
    let userRef = await firestore()
      .collection(authReducer.userType)
      .doc(authReducer.userId);
    let docRef = await firestore().collection('doctors').doc(data.docId);
    let consultRefId;
    
    return firestore()
      .collection('consults')
      .add({
        data: {
          time: data.time,
          date: data.date,
          title: data.title,
          fee: data.fee,
          review: null,
          mode: data.mode,
        },
        booked: new Date().valueOf(),
        id: randomId,
        user: {
          userId: authReducer.userId,
          userType: authReducer.userType,
        },
        doctor: {
          docId: data.docId,
          docType: 'doctors',
          review: null,
          initailName: data.doctorName.initial,
          fName: data.doctorName.fName,
          lName: data.doctorName.lName,
        },
        status: 'Pending',
      })
      .then(async consultRef => {
        consultRefId = consultRef.id;
        return firestore()
          .collection('consults')
          .doc(consultRefId)
          .update('docId', consultRefId);
      })
      .then(() => {
        return userRef.get();
      })
      .then(doc => {
        let docData = doc.data();
        docData.consults.push({collection: 'consults', id: consultRefId});
        return userRef.update(docData);
      })
      .then(() => {
        return docRef.get();
      })
      .then(docDoc => {
        let docDocData = docDoc.data();
        docDocData.consults.push({collection: 'consults', id: consultRefId});
        return docRef.update(docDocData);
      })
      .then(() => {
        return {
          status: true,
        };
      })
      .catch(error => {
        return {
          status: false,
          title: 'Cant make consultation with doctor',
          message: error.message,
        };
      });
  };
};

export const bookReminder = data => {
  return async (dispatch, getState) => {
    let authReducer = getState().authReducer;
    try {
      let ref = await firestore()
        .collection(authReducer.userType)
        .doc(authReducer.userId);
      let doc = await ref.get();
      let docData = doc.data();
      docData.reminders.push(data);
      await ref.update(docData);
      scheduleNotification(data.title, data.description, data.time);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        title: 'Something went wrong',
        message: `Check your network. ${error.message}`,
      };
    }
  };
};

export const deleteReminder = id => {
  return async (dispatch, getState) => {
    let authReducer = getState().authReducer;
    try {
      let ref = await firestore()
        .collection(authReducer.userType)
        .doc(authReducer.userId);
      let refDoc = await ref.get();
      let refData = refDoc.data();
      let reminders = refData.reminders.filter(rem => rem.id !== Number(id));
      refData.reminders = reminders;
      await ref.update(refData);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        title: 'Cant delete your reminder for a moment',
        message: error.message,
      };
    }
  };
};

export const addMedReport = data => {
  return async (dispatch, getState) => {
    let authReducer = getState().authReducer;
    try {
      let ref = await firestore()
        .collection(authReducer.userType)
        .doc(authReducer.userId);
      let refDoc = await ref.get();
      let docData = await refDoc.data();
      docData.medReports.push({data});
      await ref.update(docData);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        title: 'Network Error',
        message: error.message,
      };
    }
    return;
  };
};

export const extractDataset = () => {
  return async (dispatch, getState) => {
    let filterSymtoms = [];
    let allDiseases = [];
    return await firestore()
      .collection('miscellaneous')
      .doc('dataset')
      .get()
      .then(async doc => {
        let symptoms = [];
        let data = await doc.data();
        await data.data.map(dis => {
          if (dis.Symptom_1) {
            symptoms.push(dis.Symptom_1);
          }
          if (dis.Symptom_2) {
            symptoms.push(dis.Symptom_2);
          }
          if (dis.Symptom_3) {
            symptoms.push(dis.Symptom_3);
          }
          if (dis.Symptom_4) {
            symptoms.push(dis.Symptom_4);
          }
          if (dis.Symptom_5) {
            symptoms.push(dis.Symptom_5);
          }
        });

        filterSymtoms = [...new Set(symptoms)];
        allDiseases = data.data;
        await dispatch({
          type: UPDATE_DISEASES_SYMTOMS_STATE,
          data: {
            allDiseases: allDiseases,
            allSymtoms: filterSymtoms,
          },
        });
        return {
          status: true,
        };
      })
      .catch(error => {
        return {
          status: false,
          title: 'Please Load the app again',
          message:
            'Please load the app againa and wait for a while on this screen a its involve high computation through ML',
        };
      });
  };
};

export const extractPrecationAndDescription = () => {
  return async (dispatch, getState) => {
    let allPrecations = [];
    let allDescrptions = [];

    try {
      const refPrecation = await firestore()
        .collection('miscellaneous')
        .doc('symptomPrecaution');
      const refPrecationDoc = await refPrecation.get();
      const refPrecationData = await refPrecationDoc.data();
      allPrecations = [...refPrecationData.data];
      const refDescription = await firestore()
        .collection('miscellaneous')
        .doc('symptomsDescriptio');
      const refDescriptionDoc = await refDescription.get();
      const refDescriptionData = await refDescriptionDoc.data();
      allDescrptions = [...refDescriptionData.data];
    } catch (error) {
      return {
        status: false,
        title: 'Network Error',
        message: error.message,
      };
    }

    await dispatch({
      type: UPDATE_PRECAUTION_DESCRIBTION_STATE,
      data: {
        precations: allPrecations,
        description: allDescrptions,
      },
    });

    return {
      status: true,
    };
  };
};

export const addDisease = diseases => {
  return async (dispatch, getState) => {
    let authReducer = getState().authReducer;
    try {
      const ref = await firestore()
        .collection(authReducer.userType)
        .doc(authReducer.userId);
      const refDoc = await ref.get();
      const refData = await refDoc.data();
      refData.diseases.push({
        ...diseases,
        created: new Date().valueOf(),
        id: Math.random(),
      });
      await ref.update(refData);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: true,
        title: 'Failed to store',
        message: error.message,
      };
    }
  };
};

export const addConsultReview = (docId, review) => {
  return async(dispatch, getState) => {
    let ref = await firestore().collection('consults').doc(`${docId}`); 
    return ref.get().then(doc => {
      let docData = doc.data();
      docData.data.review = review;
      return ref.update(docData);
    }).then(() => {
      return {
        status: true
      }
    }).catch(error => {
      return {
        status: false,
        title: 'Failed',
        error: error.message
      }
    })
  }
}


// PushNotification.localNotification({
//   title: 'My Notification Title', // (optional)
//   message: 'My Notification Message', // (required)
// });

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log('ACTION:', notification.action);
    // console.log('NOTIFICATION:', notification);
  },
  // requestPermissions: true,
});

const scheduleNotification = (title, message, time) => {
  let currentDate = new Date();
  let a = currentDate.getTime();
  // console.log('a', a);
  let d = currentDate.getTimezoneOffset() * 60 * 1000;
  // console.log('d', d);
  let w =  new Date(a - (d));
  // console.log('w', w);
  currentDate = w;

  currentDate = new Date(currentDate).toISOString().split('T')[0];

  // console.log('currentDate--', currentDate);
  let year = parseInt(currentDate.split('-')[0]);
  let month = parseInt(currentDate.split('-')[1]);
  let day = parseInt(currentDate.split('-')[2]);
  // console.log(day, month, year);
  let noti = new Date();

  noti = noti.setFullYear(year);
  noti = new Date(noti).setMonth(month - 1);
  noti = new Date(noti).setDate(day);  
  noti = new Date(noti).setHours(time.hours + 5);
  noti = new Date(noti).setMinutes(time.minutes + 30);
  // console.log('notifyTime!!!!', noti, new Date(noti));

  PushNotification.localNotificationSchedule({
    title: title,
    message: message, // (required)
    date: new Date(noti), // in 60 secs
    // allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  });
}

