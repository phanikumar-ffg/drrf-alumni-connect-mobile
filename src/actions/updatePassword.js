import {   
    AUTH_INPUT_CHANGE,
    PASSWORD_UPDATE_FAILURE,
    PASSWORD_UPDATE_SUCCESS,
    LOADING,
  } from './actionTypes';
  
  export const authInputChange2 = ({ field, value }) => {
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
  export const updatePassword = ({ userPassword }) => {
    console.debug('in login action');  
   /* return dispatch => {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    };*/
    
  
    return dispatch => {
    dispatch({ type: LOADING });
    fetch('http://10.0.2.2:8080/updatePassword', {
    method: 'PUT',
    headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           userPassword: userPassword
         }),
       })
       .then(response => response.json())
       .then(res => {
        console.debug(res);
        const msg = res.msg;
        dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: msg });
        })
        .catch(error => {
         console.error(error);
         dispatch({ type: PASSWORD_UPDATE_FAILURE });
        });
    }
}