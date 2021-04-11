import { AUTHENTICATION, SIGNIN, SIGNUP } from "./../actions/auth";

const initialAuthState = {
  userId: null,
  fname: null,
  lname: null,
  email: null,
  phone: null,
  gender: null,
};

export default authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    default:
      return state;
  }
};
