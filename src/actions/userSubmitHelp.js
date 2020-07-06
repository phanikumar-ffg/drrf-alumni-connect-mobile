import config from '../config/index.js'
import {SUBMIT_HELP_SUCCESS, SUBMIT_HELP_FAILURE,HELP_EMPTY_DETAILS,LOADING,HELP_CLEAR} from './actionTypes';

/*export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value },
  };
}; */
export const userSubmitEmptyDetails = (prblmType, prblmDesc, additionalDetails) =>{

  if(prblmDesc =='' || prblmType == ''){
   // error ='Please Fill All The Required Details';
   // return HELP_EMPTY_DETAILS;
    return dispatch => {
      dispatch({ type: HELP_EMPTY_DETAILS });
    }
  }
}

export const clearDetails = () =>{
 //  clear = true;
  //if(clear){
    return dispatch =>{
      dispatch({type: HELP_CLEAR});
    }
  //}
  
}
export const userSubmitHelp = ( prblmType, prblmDesc, additionalDetails,aspirantId,centerId ) =>{
    const userHelpDetails={
        prblmType:'abc',
        prblmDesc:'abc',
        additionalDetails:'',
        aspirantId:''
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
        fetch(config.baseurl+'/api/v1/help', {
          method: 'POST',
          body: JSON.stringify({
            aspirantId:aspirantId,
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
          .then(response => {
            if(response.status == 200){
              dispatch({ type: SUBMIT_HELP_SUCCESS });
            }
            response.json()})
         /* .then(res => {
            console.log(res);
            const userHelpDetails = {
                aspirantId: res.aspirantId,
                prblmType: res.prblmType,
                prblmDesc: res.prblmDesc,
                additionalDetails: res.additionalDetails,
                centerId:1,
            };
            dispatch({ type: SUBMIT_HELP_SUCCESS, payload: res });
          })*/
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


