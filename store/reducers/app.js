import {appColor} from './../../constants/App';
import {DARK_THEME, LIGHT_THEME} from './../actions/app';

const initialAppState = {
  theme: 'dark',
  colors: {
    ...appColor.dark,
  },
};

const appState = (state = initialAppState, action) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        theme: 'dark',
        colors: {
          ...appColor.dark,
        },
      };
    case LIGHT_THEME:
      return {
        theme: 'light',
        colors: {
          ...appColor.light,
        },
      };
    default:
      return state;
  }
};
export default appState;
