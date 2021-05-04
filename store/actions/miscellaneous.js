/* eslint-disable */

import datasetData from '../all_Diseases.json';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import firestore from '@react-native-firebase/firestore';
import symptomsDescriptionData from '../symptom_Description.json';
import symptomPrecautionData from '../symptom_precaution.json';

export const storeSymptomsDescription = () => {
  return dispatch => {
    firestore()
      .collection('miscellaneous')
      .doc('symptomsDescriptio')
      .set({data: [...symptomsDescriptionData]})
      .then(() => {
      }).catch(error => {
        // console.log(error);
      })
  };
};

export const storeSymptomPrecaution = () => {
  return dispatch => {
    firestore()
      .collection('miscellaneous')
      .doc('symptomPrecaution')
      .set({data: [...symptomPrecautionData]})
      .then(() => {
      }).catch(error => {
        // console.log(error);
      })
  };
};

export const storeDataSet = () => {
  return async dispatch => {

    let obj = [];
    obj = data.filter(el => {
      if (el.Symptom_6 == '' || el.Symptom_6 == '  ') {
        return el;
      } else {
        el.id = nanoid();
      }
    });
    let ref = await firestore().collection('miscellaneous').doc('dataset');
    await ref.get().then(async doc => {
      let docData = doc.data();
      // console.log(obj.length);
      docData.data.push(...obj);
      await ref.update(docData);
    });
  };
};

export const modifyDataset = () => {
  return dispatch => {
    let ref = firestore().collection('miscellaneous').doc('dataset');
    ref.get().then(async doc => {
      let docData = doc.data();
      let shouldDelete = [];
      docData.data.map((el, index) => {
        if (el.Symptom_6) {
          shouldDelete.push(index);
        } else {
          delete el.Symptom_6;
          delete el.Symptom_7;
          delete el.Symptom_8;
          delete el.Symptom_9;
          delete el.Symptom_10;
          delete el.Symptom_11;
          delete el.Symptom_12;
          delete el.Symptom_13;
          delete el.Symptom_14;
          delete el.Symptom_15;
          delete el.Symptom_16;
          delete el.Symptom_17;
        }
      });
      await ref.update(docData);
    });
  };
};

export const displayDataSet = () => {
  return dispatch => {
    // let ref = firestore().collection('miscellaneous').doc('dataset');
    // ref.get().then(doc => {
    //   let data = doc.data();
    //   console.log(data);
    // })
  };
};
