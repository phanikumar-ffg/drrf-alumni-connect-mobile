import {
  AUTH_INPUT_CHANGE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOADING,
} from './actionTypes';
import config from '../config/index.js';

export const onboardInputChange = ({ field, value }) => {
  return dispatch => {
    dispatch({ type: AUTH_INPUT_CHANGE,payload:{field,value} });
    /*type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'*/
  };
};


export const signup=(details)=>{
    console.log('in redux');
    const signup_validation=true;
    return dispatch => {
          //dispatch({ type: SIGNUP_SUCCESS ,payload: signup_validation });
          //dispatch({type:SIGNUP_FAILURE});
          dispatch({type:LOADING});
          fetch(config.baseurl+'/api/v1/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  firstName:details.firstName.value,
                  lastName:details.lastName.value,
                  studentId:details.studentID.value,
                  mobile:details.phone.value,
                  dob:details.dateOfBirth.value,
                  email:details.email.value,
                  centerId:details.centerName.value,
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.debug(res);
              const userSignup = {
                  name:res.firstName,
                  email:res.email,
              };
              dispatch({ type: SIGNUP_SUCCESS, payload: userSignup });
            })
            .catch(error => {

              dispatch({ type: SIGNUP_FAILURE });
            });
          };
};