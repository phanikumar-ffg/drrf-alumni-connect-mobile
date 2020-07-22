import {   
  AUTH_INPUT_CHANGE,
  PROFILE_UPDATE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  LOADING,
} from './actionTypes';
import config from '../config/index.js';

export const authInputChange1 = ({ field, value }) => {
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
export const updateProfile = ({ userProfile }) => {
  console.log('profile update action');
  console.log(userProfile.email);


 /* return dispatch => {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  };*/
  

  return dispatch => {
  dispatch({ type: LOADING });
  fetch(config.baseurl+'/api/v1/updateProfile', {
  method: 'POST',
  headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      emailId:userProfile.email,
      phone:userProfile.mobile,
      cityId:userProfile.cityId,
      currentOrganization:userProfile.CurrentCompany
       }),
     })
     .then(response => response.json())
     .then(res => {
      console.log(res);
      const msg = res.msg;
      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: msg });
      })
      .catch(error => {
       console.error(error);
       dispatch({ type: PROFILE_UPDATE_FAILURE });
      });
  }
}