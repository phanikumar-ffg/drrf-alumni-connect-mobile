import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import SignUpReducer from './signup-reducer';
import AddContentReducer from './addContent-reducer'

const configureStore = combineReducers({
  auth: AuthenticationReducer,
  onboard: SignUpReducer,
  addContent: AddContentReducer
});

export default configureStore;
