import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOADING,
} from './actionTypes';
import firebase from 'firebase';

export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'
  };
};

/* export const login = ({ email, password }) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {},
  };
}; */
export const login = ({ email, password }) => {
  console.debug('in login action');
  user = {
    name: 'phani',
  };
  console.debug(email);
  return dispatch => {
    dispatch({ type: LOADING });
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    /* return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.debug('login success');
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      })
      .catch(function(error) {
        console.debug('login failure');
        dispatch({ type: LOGIN_FAILURE });
      }); */
  };
};
