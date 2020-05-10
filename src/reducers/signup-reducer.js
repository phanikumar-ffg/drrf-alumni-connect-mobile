import{
 SIGNUP_SUCCESS,
 SIGNUP_FAILURE,
 LOADING,
} from '../actions/actionTypes';


const initialState = {
  name: '',
  studentID: '',
  phone: '',
  dateOfBirth: '',
  email: '',
  centerName: '',
  user: {},
  error: '',
  loading: false,
  signup_valid: false,
};

export default (state = initialState, action) => {
    console.log('reducer');
  switch (action.type) {
    case SIGNUP_SUCCESS:
      console.log('SIGNUP_SUCCESS');
      return {
        ...state,
        //user: action.payload,
        signup_valid: action.payload,
        error:'dekhna hay',
        loading: false,
      };
    case SIGNUP_FAILURE:
      console.debug('SIGNUP_FAILURE');
      //console.log('SIGNUP_FAILURE');
      return {
        ...state,
        error: 'Please enter Valid Data',
        loading: false,
      };
    case LOADING:
       console.debug('loading reducer');
       return {
         ...state,
         loading: true,
       };

    default:
      return state;
  }
};
