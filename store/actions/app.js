/* eslint-disable */

export const DARK_THEME = 'DARK_THEME';
export const LIGHT_THEME = 'LIGHT_THEME';

export const darkThemeAction = () => {
  return dispatch => {
    dispatch({type: DARK_THEME});
  };
};

export const lightThemeAction = () => {
  return dispatch => {
    dispatch({type: LIGHT_THEME});
  };
};


