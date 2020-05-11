import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import SignUpReducer from './signup-reducer';

const configureStore = combineReducers({
  auth: AuthenticationReducer,
  onboard: SignUpReducer,
});

export default configureStore;
