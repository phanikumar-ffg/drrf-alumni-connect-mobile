import {SUBMIT_HELP_SUCCESS, SUBMIT_HELP_FAILURE} from './../actions/actionTypes';

const initialHelpState={
    studentId:'',
    prblmType:'',
    prblmDesc:'',
    additionalDetails:'',
    centerId:'',
    error:''
};

export default (state = initialHelpState, action) => {
    switch(action.type){
        case SUBMIT_HELP_SUCCESS:
            return{
                ...state,
                studentId:action.studentId,
                prblmType : action.prblmType,
                prblmDesc : action.prblmDesc,
                additionalDetails : action.additionalDetails ,
                centerId:action.centerId
            };
        case SUBMIT_HELP_FAILURE:
            return{
                ...state,
                error: 'Help History Details Submission failed'
            };
        default:
            return state;
    }
};