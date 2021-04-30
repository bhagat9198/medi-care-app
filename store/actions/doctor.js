/* eslint-disable */

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const UPDATE_DOCTOR = 'UPDATE_DOCTOR'; 

export const uploadDoctor = (data) => {
  return async(dispatch, getState) => {
    // let imgsUrls = [];
    console.log(getState().authReducer);
    console.log(dispatch);
    let imgsUrls = data.imgs.map((el, i) => {
      let paths = el.path.split('/');
      let name = paths[paths.length -1];
      return{path: el.path, name: `aaaa_${name}`};
    })
    console.log('imgsUrls', imgsUrls);
    // for(let i = 0; i < imgsUrls.length; i++) {
    //   console.log(imgsUrls[i]);
    //   await storage().ref(`imgs/${imgsUrls[i].name}`).putFile(imgsUrls[i].path).then(() => {
    //     console.log('done');
    //   }).catch(error => {
    //     console.log(error);
    //   })
    // }

    return true;
  }
}