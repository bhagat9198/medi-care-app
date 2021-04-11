import AsyncStorage  from '@react-native-async-storage/async-storage'
import { auth, db } from "./../firebase";

export const AUTHENTICATION = "AUTHENTICATION";
export const SIGNIN = "SIGNIN";
export const SIGNUP = "SIGNUP";



export const signupAction = (data) => {
  return (dispatch, getState) => {
    console.log(auth); 
    console.log(data);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        let token = user.user.toJSON().stsTokenManager
        let storeData =  {
          ...token,
          email: data.email,
          password: data.password
        }
        storeUserInfoInApp(storeData)
        dispatch({
          type: SIGNUP,
          data: data, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


const storeUserInfoInApp = async(data) => {
  
  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('@loggedIn_user', jsonValue)
  } catch (e) {
    // saving error
  }
} 