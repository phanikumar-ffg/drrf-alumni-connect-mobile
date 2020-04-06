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

/* export const login = ({ email, password }) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: {},
  };
}; */
export const login = ({ email, password }) => {
  console.debug('in login action');
  console.debug(email);

  const user={
    email:'abc',
    password:'abc'
  }

  return dispatch=>{
    dispatch({type:LOGIN_SUCCESS,payload:user});
  }

  // return dispatch => {
  //   dispatch({ type: LOADING });
  //   fetch('http://10.0.2.2:8080/login', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.debug(res);
  //       const user = {
  //         email: res.email,
  //         password: res.password,
  //       };
  //       dispatch({ type: LOGIN_SUCCESS, payload: user });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       dispatch({ type: LOGIN_FAILURE });
  //     });

  //   /* return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(user => {
  //       console.debug('login success');
  //       dispatch({ type: LOGIN_SUCCESS, payload: user });
  //     })
  //     .catch(function(error) {
  //       console.debug('login failure');
  //       dispatch({ type: LOGIN_FAILURE });
  //     }); */
  // };
};
