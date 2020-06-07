import {SUBMIT_HELP_SUCCESS, SUBMIT_HELP_FAILURE,AUTH_INPUT_CHANG,LOADING} from './actionTypes';

/*export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value },
  };
}; */

export const userSubmitHelp = ( prblmType, prblmDesc, additionalDetails,studentId,centerId ) =>{
    const userHelpDetails={
        prblmType:'abc',
        prblmDesc:'abc',
        additionalDetails:'',
        studentId:''
    }
   /* return dispatch => {
        dispatch({ type: SUBMIT_HELP_SUCCESS, payload: userHelpDetails});
       /* .catch(error => {
          console.error(error);
          dispatch({ type: SUBMIT_HELP_FAILURE });
        }); */
      /*  console.log("ProblemType====>"+prblmType);
        console.log("Help dispatch ");

    } */

   return dispatch => {
        dispatch({ type: LOADING });
        fetch('http://localhost:8080/api/v1/help', {
          method: 'POST',
          body: JSON.stringify({
            studentId:studentId,
            reason: prblmType,
            details: prblmDesc,
            description: additionalDetails,
            centerId:centerId
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;  charset=UTF-8',
          }
        })
          .then(response => response.json())
          .then(res => {
            console.debug(res);
            const userHelpDetails = {
                studentId: res.studentId,
                prblmType: res.prblmType,
                prblmDesc: res.prblmDesc,
                additionalDetails: res.additionalDetails,
                centerId:1

            };
            dispatch({ type: SUBMIT_HELP_SUCCESS, payload: userHelpDetails });
          })
          .catch(error => {
            console.error(error);
            dispatch({ type: SUBMIT_HELP_FAILURE });
          });
   }
  }
        /* return firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            console.debug('login success');
            dispatch({ type: LOGIN_SUCCESS, payload: user });
          })
          .catch(function(error) {
            console.debug('login failure');
            dispatch({ type: LOGIN_FAILURE });
          }); */
   //   };


