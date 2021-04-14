import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'

import {
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN, 
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID, 
};


// const firebaseConfig = {
//   authDomain: "medicare-rn.firebaseapp.com",
//   apiKey: "AIzaSyD8CfOT2MhVIMIx7cGDVNoBsbihKyjZpjY",
//   projectId: "medicare-rn",
//   storageBucket: "medicare-rn.appspot.com",
//   messagingSenderId: "40117785931",
//   appId: "1:40117785931:web:3c6763391d3b01874dc4ce", 
// };

let app;
// if(!firebase.apps.length) {
 app =  firebase.initializeApp(firebaseConfig);
// } else {
  // app = firebase.app()
// }
export const auth = app.auth();
console.log(auth);   
export const db = app.firestore();
