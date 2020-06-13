import {
  AUTH_ADD_CONTENT,
  ADD_CONTENT_FAILURE,
  ADD_CONTENT_SUCCESS,
  LOADING
} from './actionTypes';

export const authContentChange = ({ field, value }) => {
  return {
    type: AUTH_ADD_CONTENT,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const addContent = ({ contentURL, contentType, contentDesc, assessmentURL }) => {
  console.debug('in add Content action');
  console.debug(contentURL);
  console.debug(contentType);
  console.debug(contentDesc);
  console.debug(assessmentURL)

  /*const content = {
    url: 'abc',
    contentType: 'Video',
    assessURL: 'abc',
    description: 'abc'
  };*/

  /*return dispatch => {
    dispatch({ type: ADD_CONTENT_SUCCESS, payload: content });
  };*/

   return dispatch => {
     dispatch({ type: LOADING });
     fetch('http://localhost:8080/api/v1/content/request', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         contentURL: contentURL,
         contentType: contentType,
         contentDesc: contentDesc,
         assessmentURL: assessmentURL
       }),
     })
       .then(response => response.json())
       .then(res => {
         console.debug(res);
         dispatch({ type: ADD_CONTENT_SUCCESS });
       })
       .catch(error => {
         console.error(error);
         dispatch({ type: ADD_CONTENT_FAILURE });
       });

   };
};
