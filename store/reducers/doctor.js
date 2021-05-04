/* eslint-disable */

import {UPDATE_DOCTORS_STATE} from './../actions/doctor';

const initialDoctorState = {
  allDocs : [],
}

const doctorReducer = (state = initialDoctorState, action) => {
  switch(action.type) {
    case UPDATE_DOCTORS_STATE:
      return {
        ...state,
        allDocs: action.data
      }
    default:
      return state;
  }
}

export default doctorReducer;