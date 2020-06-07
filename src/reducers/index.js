import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import SignUpReducer from './signup-reducer';
import AddContentReducer from './addContent-reducer';
import helpScreenReducer from './helpScreen-reducer';

const configureStore = combineReducers({
  auth: AuthenticationReducer,
  onboard: SignUpReducer,
  addContent: AddContentReducer,
  help: helpScreenReducer
});

export default configureStore;
