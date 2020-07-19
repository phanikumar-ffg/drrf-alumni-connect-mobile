import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOADING,
  AUTH_INPUT_CHANGE,
} from '../actions/actionTypes';


const initialState = {
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' },
  studentID: { value: '', error: '' },
  phone: { value: '', error: '' },
  dateOfBirth: { value: '', error: '' },
  email: { value: '', error: '' },
  centerName: { value: '', error: '' },
  user: {},
  error: '',
  loading: false,
  signup_valid: false,
  centres: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        //{value:action.payload.value,error:''},
        //email: action.email,
        //password: action.password,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        //signup_valid: action.payload,
        loading: false,
      };
    case SIGNUP_FAILURE:

      return {
        ...state,
        error: "You already have an account/Your details doesn't match records",
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
