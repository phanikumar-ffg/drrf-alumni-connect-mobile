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

export const addContent = ({ url, contentType, description, assessURL }) => {
  console.debug('in add Content action');
  console.debug(url);
  console.debug(contentType);
  console.debug(description);
  console.debug(assessURL)

  const content = {
    url: 'abc',
    contentType: 'Video',
    assessURL: 'abc',
    description: 'abc'
  };

  return dispatch => {
    dispatch({ type: ADD_CONTENT_SUCCESS, payload: content });
  };

  // return dispatch => {
  //   dispatch({ type: LOADING });
  //   fetch('http://10.0.2.2:8080/addContent', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       url: url,
  //       contentType: contentType,
  //       assessURL: assessURL,
  //       description: description
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.debug(res);
  //       dispatch({ type: ADD_CONTENT_SUCCESS });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       dispatch({ type: ADD_CONTENT_FAILURE });
  //     });

  // };
};
