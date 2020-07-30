import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOADING,
  FRGT_PWD_SUCCESS,
  FRGT_PWD_FAILURE,
  FRGT_PWD_LOADING,
} from './actionTypes';
import config from '../config/index.js';

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    payload: {}
  };
};

export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const forgotPwd = (emailId) => {
    console.log('userLogin');
    return dispatch => {
        dispatch({ type: FRGT_PWD_LOADING });
        fetch(config.baseurl + '/api/v1/forgotpassword/'+emailId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        .then(response => response)
          .then(res => {
            console.log(res);
            if (res=="Error occured while checking the user account information " +  emailId) {
              dispatch({ type: FRGT_PWD_FAILURE, payload: res });
            } else {
              dispatch({ type: FRGT_PWD_SUCCESS});
            }
          })
          .catch(error => {
          console.log(error);
            console.error(error);
            dispatch({ type: FRGT_PWD_FAILURE });
          });
        };
};

export const login = ({ emailId, password }) => {
  return dispatch => {
    dispatch({ type: LOADING });
    fetch(config.baseurl + '/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: emailId,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.debug(res);
        const user = res;
        if (res.errorMessage) {
          dispatch({ type: LOGIN_FAILURE, payload: res.errorMessage });
        } else {
          dispatch({ type: LOGIN_SUCCESS, payload: user });
        }
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: LOGIN_FAILURE });
      });
  };
};
