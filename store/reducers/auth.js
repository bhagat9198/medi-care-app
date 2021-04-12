import { AUTHENTICATION, LOGOUT } from "./../actions/auth";

const initialAuthState = {
  userId: null,
  fname: null,
  lname: null,
  email: null,
  phone: null,
  gender: null,
  userType: null,
};

export default authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...action.data
      };
    case LOGOUT:
      return {
        userId: null,
      };
    default:
      return state;
  }
};
