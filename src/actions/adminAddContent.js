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
  console.log('in add Content action');
  console.log(contentURL);
  console.log(contentType);
  console.log(contentDesc);
  console.log(assessmentURL)


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
         dispatch({ type: ADD_CONTENT_SUCCESS, payload : 'Successfully Added the content' });
       })
       .catch(error => {
         console.error(error);
         dispatch({ type: ADD_CONTENT_FAILURE, payload: 'Cannot add data' });
       });

   };
};
