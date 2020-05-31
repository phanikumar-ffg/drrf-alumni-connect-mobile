import {
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_INPUT_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOADING,
} from '../actions/actionTypes';

const initialState = {
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
        error: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
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
