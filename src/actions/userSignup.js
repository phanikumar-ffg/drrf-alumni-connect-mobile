import {
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOADING,
} from './actionTypes';


export const signup=({name,studentID,phone,dateOfBirth,email,centerName})=>{
    console.log('in redux');
    signup_validation=true;
    return dispatch => {
          dispatch({ type: SIGNUP_SUCCESS ,payload: signup_validation });
          /*fetch('http://10.0.2.2:8080/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  name:name,
                  studentID:studentID,
                  phone:phone,
                  dateOfBirth:dateOfBirth,
                  email:email,
                  centerName:centerName,
            }),
          })
            .then(response => response.json())
            .then(res => {
              console.debug(res);
              const userSignup = {
                  name:res.name,
                  studentID:res.studentID,
                  phone:res.phone,
                  dateOfBirth:res.dateOfBirth,
                  email:res.email,
                  centerName:res.centerName,
              };
              dispatch({ type: SIGNUP_SUCCESS, payload: userSignup });
            })
            .catch(error => {
              console.error(error);
              dispatch({ type: SIGNUP_FAILURE });
            });
*/
          };

};