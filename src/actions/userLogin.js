import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOADING,
} from './actionTypes';

export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const login = ({ email, password }) => {
  console.debug('in login action');
  console.debug(email);

  const user = {
    email: 'abc',
    password: 'abc',
  };

  // TO RUN IN LOCAL UNCOMMENT THIS AND COMMENT DISPATCH BELOW
  // return dispatch => {
  //   dispatch({ type: LOGIN_SUCCESS, payload: user });
  // };
  
  return dispatch => {
    dispatch({ type: LOADING });
    fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: email,
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
