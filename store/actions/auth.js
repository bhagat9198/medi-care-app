import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./../firebase";

export const AUTHENTICATION = "AUTHENTICATION";
export const LOGOUT = "LOGOUT";

export const loginAction = (email, password, userType) => {
  return (dispatch, getState) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        let storeData = {
          userType: userType,
        };
        storeUserInfoInApp(storeData);

        return db
          .collection(userType)
          .doc(user.user.uid).get();

      }).then(doc => {
        let docData = doc.data();
        dispatch({
          type: AUTHENTICATION,
          data: {
            ...docData,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signupAction = (data) => {
  return (dispatch, getState) => {
    let U_DATA = {};
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        // let token = user.user.toJSON().stsTokenManager;
        let storeData = {
          userType: data.userType,
        };
        storeUserInfoInApp(storeData);
        console.log("userId", user.user.uid);
        delete data.password;
        U_DATA.userId = user.user.uid;
        U_DATA = {
          ...U_DATA,
          ...data
        }
        let collectionName = "patients";
        if (data.userType === "doctor") {
          collectionName = "doctors";
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
        console.log(U_DATA);

        return db
          .collection(collectionName)
          .doc(user.user.uid)
          .set({
            ...U_DATA
          });
      })
      .then(() => {
        dispatch({
          type: AUTHENTICATION,
          data: {
            ...U_DATA,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    // let extractAsyncData = async () => {
    //   let extractedData = await AsyncStorage.getItem("@loggedIn_user");
    //   let userData = await JSON.parse(extractedData);
    //   let currentDate = new Date();
    //   let expirationTime = new Date(new Date().getTime() + +userData.expirationTime * 1000);
    //   if(expirationTime > currentDate) {
    //     // console.log(expirationTime.getTime(), currentDate.getTime());
    // login user
    //   }
    // };
    // extractAsyncData()
    //   .then()
    //   .catch((error) => console.log(error));

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('sgflvsgiufgisg----------');
        let U_DATA = {};
        // change screen to dashbaord
        let extractedData = await AsyncStorage.getItem("@userType");
        let userData = await JSON.parse(extractedData);
        let collectionName = "patients";
        if (userData.userType === "doctors") {
          collectionName = "doctors";
        }

        db.collection(collectionName)
          .doc(user.uid)
          .get()
          .then((doc) => {
            let docData = doc.data();
            U_DATA = { ...docData};
            dispatch({
              type: AUTHENTICATION,
              data: {
                ...U_DATA,
              },
            });
          });
      } else {
        // keep screen to login
      }
    });
  };
};

const storeUserInfoInApp = async (data) => {
  try {
    const stringfyValue = JSON.stringify(data);
    await AsyncStorage.setItem("@userType", stringfyValue);
  } catch (e) {
    // saving error
  }
};


export const logout = () => {
  return(dispatch, state) => {
    auth.signOut().then(async() => {
      await AsyncStorage.clear();
      dispatch({
        type: LOGOUT,
      });
    })
  }
}