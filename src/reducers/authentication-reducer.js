import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOADING,
} from '../actions/actionTypes';

const initialState = {
  email: '',
  password: '',
  user: {},
  error: '',
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        //email: action.email,
        //password: action.password,
      };
    case LOGIN_SUCCESS:
      console.debug('LOGIN_SUCCESS');
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_FAILURE:
      console.debug('LOGIN_FAILURE');
      return {
        ...state,
        error: 'Authentication Failed',
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
