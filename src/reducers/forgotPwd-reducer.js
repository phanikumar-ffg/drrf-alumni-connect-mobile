import{
 FRGT_PWD_SUCCESS,
 FRGT_PWD_FAILURE,
 FRGT_PWD_LOADING,
 AUTH_INPUT_CHANGE,
} from '../actions/actionTypes';


const initialState = {
  email: {value:'',error:''},
  error: '',
  fgtPwd_loading: false,
  request_success: false,
};

export default (state = initialState, action) => {
    console.log('reducer');
  switch (action.type) {
    case AUTH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        //{value:action.payload.value,error:''},
        //email: action.email,
        //password: action.password,
      };
    case FRGT_PWD_SUCCESS:
      console.log('FRGT_PWD_SUCCESS');
      return {
        ...state,
        error:'',
        fgtPwd_loading: false,
        request_success: true,
      };
    case FRGT_PWD_FAILURE:
      console.debug('FRGT_PWD_FAILURE');
      console.log('FRGT_PWD_FAILURE');
      return {
        ...state,
        error: action.payload,
        fgtPwd_loading: false,
        request_success: false,
      };
    case FRGT_PWD_LOADING:
       console.debug('loading reducer');
       return {
         ...state,
         fgtPwd_loading: true,
         request_success: false,
       };

    default:
      return state;
  }
};
