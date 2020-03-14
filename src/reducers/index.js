import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';

const configureStore = combineReducers({
  auth: AuthenticationReducer,
});

export default configureStore;
