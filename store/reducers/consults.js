/* eslint-disable */

import {UPDATE_CONSULTS_STATE} from './../actions/auth';


const initialDoctorState = {
  allConsults : [],
}

const consultsReducer = (state = initialDoctorState, action) => {
  switch(action.type) {
    case UPDATE_CONSULTS_STATE:
      return {
        ...state,
        allConsults: action.data
      }
    default:
      return state;
  }
}

export default consultsReducer;