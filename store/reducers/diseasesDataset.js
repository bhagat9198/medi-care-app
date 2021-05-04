/* eslint-disable */

import {
  UPDATE_DISEASES_SYMTOMS_STATE,
  UPDATE_PRECAUTION_DESCRIBTION_STATE,
} from './../actions/patient';

const initialDoctorState = {
  allDiseases: [],
  allSymtoms: [],
  diseasesPrecaution: [],
  diseasesDescription: [],
};

const diseasesDatasetReducer = (state = initialDoctorState, action) => {
  switch (action.type) {
    case UPDATE_DISEASES_SYMTOMS_STATE:
      return {
        ...state,
        allDiseases: action.data.allDiseases,
        allSymtoms: action.data.allSymtoms,
      };
    case UPDATE_PRECAUTION_DESCRIBTION_STATE:
      return {
        ...state,
        diseasesPrecaution: action.data.precations,
        diseasesDescription: action.data.description,
      };
    default:
      return state;
  }
};

export default diseasesDatasetReducer;
