import {   
    AUTH_INPUT_CHANGE,
    PROFILE_UPDATE_FAILURE,
    PROFILE_UPDATE_SUCCESS,
    LOADING,
  } from './actionTypes';
  
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
    console.debug('in login action');
    console.debug(email);

  
   /* return dispatch => {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    };*/
    
  
    return dispatch => {
    dispatch({ type: LOADING });
    fetch('http://10.0.2.2:8080/updateProfile', {
    method: 'POST',
    headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           userProfile: userProfile
         }),
       })
       .then(response => response.json())
       .then(res => {
        console.debug(res);
        const msg = res.msg;
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: msg });
        })
        .catch(error => {
         console.error(error);
         dispatch({ type: PROFILE_UPDATE_FAILURE });
        });
    }
}