/* eslint-disable */

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_STATE = 'UPDATE_USER_STATE';
export const UPDATE_CONSULTS_STATE = 'UPDATE_CONSULTS_STATE';

const db = firestore();

export const loginAction = (email, password, userType) => {
  return (dispatch, getState) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user) {
          return {userStatus: false, message: 'Invalid Creditionals'};
        }
        // console.log('user.user', user.user);
        let storeData = {
          userType: userType,
        };
        storeUserInfoInApp(storeData);

        return db.collection(userType).doc(user.user.uid).get();
      })
      .then(async doc => {
        let docData = doc.data();
        if (!docData) {
          return {
            userStatus: false,
            message:
              'Invalid Creditionals. Please double check your user type ie doctor or patient',
          };
        }
        await dispatch({
          type: UPDATE_USER_STATE,
          data: {
            ...docData,
          },
        });
        return {userStatus: true, message: 'User LogedIn'};
      })
      .catch(error => {
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
        // let token = user.user.toJSON().stsTokenManager;
        let storeData = {
          userType: data.userType,
        };
        storeUserInfoInApp(storeData);

        delete data.password;
        U_DATA = {
          ...data,
          created: new Date().valueOf(),
          loginHistory: [],
          userId: user.user.uid,
        };

        let collectionName = data.userType;
        if (data.userType == 'doctors') {
          U_DATA.consults = [];
          U_DATA.articles = [];
        } else {
          U_DATA.diseases = [];
          U_DATA.reminders = [];
          U_DATA.consults = [];
          U_DATA.medReports = [];
        }

        return db
          .collection(collectionName)
          .doc(user.user.uid)
          .set({
            ...U_DATA,
          });
      })
      .then(() => {
        dispatch({
          type: UPDATE_USER_STATE,
          data: {
            ...U_DATA,
          },
        });
        return {userStatus: true, message: 'User Created'};
      })
      .catch(error => {
        // console.log(error);
        return {userStatus: false, message: `AUTH ${error.message}`};
      });
  };
};

export const autoLogin = () => {
  return dispatch => {
    return auth().onAuthStateChanged(async user => {
      if (user) {
        let U_DATA = {};
        let extractedData = await AsyncStorage.getItem('@userType');
        let userData = await JSON.parse(extractedData);
        let collectionName = userData.userType;

        let ref = await db.collection(collectionName).doc(user.uid);
        return await ref
          .get()
          .then(async(doc) => {
            let docData = doc.data();
            U_DATA = {...docData};
            await dispatch({
              type: UPDATE_USER_STATE,
              data: {
                ...U_DATA,
              },
            });
            return {userStatus: true, message: 'Auto Login Success'};
          })
          .catch(error => {
            return {userStatus: false, message: error.message};
          });
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

export const updateUserState = data => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_STATE,
      data: data
    })
  }
}

export const updateConsultsState = data => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CONSULTS_STATE,
      data: data
    })
  }
}




