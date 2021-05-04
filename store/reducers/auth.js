/* eslint-disable */

import {LOGOUT, UPDATE_USER_STATE} from './../actions/auth';

const initialAuthState = {
  userId: null,
  fname: null,
  lname: null,
  email: null,
  phone: null,
  gender: null,
  userType: null,
  consults: [],
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case UPDATE_USER_STATE:
      return {
        ...action.data,
      };
    case LOGOUT:
      return {
        userId: null,
      };
    default:
      return state;
  }
};
export default authReducer;
