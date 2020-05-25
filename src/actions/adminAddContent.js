import {
  AUTH_ADD_CONTENT,
  ADD_CONTENT_FAILURE,
  ADD_CONTENT_SUCCESS
} from './actionTypes';

export const authContentChange = ({ field, value }) => {
  return {
    type: AUTH_ADD_CONTENT,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const addContent = ({ url, description, assessURL }) => {
  console.debug('in add Content action');
  console.debug(url);
  console.debug(description);
  console.debug(assessURL)

  const content = {
    url: 'abc',
    assessURL: 'abc',
    description: 'abc'
  };

  return dispatch => {
    dispatch({ type: ADD_CONTENT_SUCCESS, payload: content });
  };

  // return dispatch => {
  //   dispatch({ type: LOADING });
  //   fetch('http://10.0.2.2:8080/url', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       url: url,
  //       assessURL: assessURL,
  //        description: description
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
