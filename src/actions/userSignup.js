import {
  AUTH_INPUT_CHANGE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOADING,
} from './actionTypes';

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
          fetch('http://10.0.2.2:8080/api/v1/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  firstName:details.name.value,
                  studentID:details.studentID.value,
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
              console.error(error);
              dispatch({ type: SIGNUP_FAILURE });
            });
          };
};