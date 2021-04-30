/* eslint-disable */

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
export const AUTHENTICATION = 'AUTHENTICATION';
export const LOGOUT = 'LOGOUT';

export const loginAction = (email, password, userType) => {
  return (dispatch, getState) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if(!user) {
          return {userStatus: false, message: 'Invalid Creditionals'};
        }
        console.log('user.user', user.user);
        let storeData = {
          userType: userType,
        };
        storeUserInfoInApp(storeData);

        return db.collection(userType).doc(user.user.uid).get();
      })
      .then(async(doc) => {
        let docData = doc.data();
        if(!docData) {
          return {userStatus: false, message: 'Invalid Creditionals. Please double check your user type ie doctor or patient'};
        }
        await dispatch({
          type: AUTHENTICATION,
          data: {
            ...docData,
          },
        });
        return {userStatus: true, message: 'User LogedIn'}; 
      })
      .catch(error => {
        console.log('hello ERRORRR');
        console.log(error);
        return {userStatus: false, message: error.message};
      });
  };
};

export const signupAction = data => {
  return (dispatch, getState) => {
    let U_DATA = {};
    return auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(user => {
        console.log('user ss', user);
        // let token = user.user.toJSON().stsTokenManager;
        let storeData = {
          userType: data.userType,
        };
        storeUserInfoInApp(storeData);

        delete data.password;
        U_DATA.userId = user.user.uid;
        U_DATA = {
          ...U_DATA,
          ...data,
        };
        console.log('U_DATA', U_DATA);
        let collectionName = 'patients';
        console.log('data.userType', data.userType, data.userType=='doctors');
        if (data.userType == 'doctors') {
          collectionName = 'doctors';
          U_DATA.registeredPatients = [];
          U_DATA.appointments = [];
          U_DATA.onlineConsult = [];
          U_DATA.offlineConsult = [];
          U_DATA.articles = [];
        } else {
          U_DATA.diseases = [];
          U_DATA.reminders = [];
          U_DATA.onlineConsult = [];
          U_DATA.offlineConsult = [];
          U_DATA.doctorsVisited = [];
        }

        return db
          .collection(collectionName)
          .doc(user.user.uid)
          .set({
            ...U_DATA,
          });
      })
      .then(() => {

        console.log('one creadting');
        dispatch({
          type: AUTHENTICATION,
          data: { 
            ...U_DATA,
          },
        });
        return {userStatus: true, message: 'User Created'};
      })
      .catch(error => {
        console.log(error);
        return {userStatus: false, message: error.message};
      });
  };
};

export const autoLogin = () => {
  return dispatch => {
    return auth().onAuthStateChanged(async(user) => {
      if (user) {
        let U_DATA = {};
        // change screen to dashbaord
        console.log('USER', user);
        let extractedData = await AsyncStorage.getItem('@userType');
        let userData = await JSON.parse(extractedData);
        console.log('userData', userData);

        let collectionName = 'patients';
        if (userData.userType == 'doctors') {
          collectionName = 'doctors';
        }
        console.log('collectionName', collectionName);
        return await db.collection(collectionName)
          .doc(user.uid)
          .get()
          .then(async(doc) => {
            let docData = doc.data();
            U_DATA = {...docData};
            await dispatch({
              type: AUTHENTICATION,
              data: {
                ...U_DATA,
              },
            });
            console.log('done');
            return {userStatus: true, message: 'Auto Login Success'}
          }).catch(error => {
            return {userStatus: false, message: error.message}
          })
      } else {
        // keep screen to login
        return {userStatus: false, message: 'User Not Found'};
      }
    });
  };
};

const storeUserInfoInApp = async data => {
  try {
    const stringfyValue = JSON.stringify(data);
    await AsyncStorage.setItem('@userType', stringfyValue);
  } catch (e) {
    // saving error
  }
};

export const logout = () => {
  return (dispatch, state) => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.clear();
        dispatch({
          type: LOGOUT,
        });
      });
  };
};
