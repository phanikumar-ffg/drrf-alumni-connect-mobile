import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication-reducer';
import SignUpReducer from './signup-reducer';
import AddContentReducer from './addContent-reducer';
import helpScreenReducer from './helpScreen-reducer';
import AdminHelpRequestReducer from './adminHelpRequest-reducer';
import ForgotPwdReducer from './forgotPwd-reducer';


const configureStore = combineReducers({
  auth: AuthenticationReducer,
  onboard: SignUpReducer,
  addContent: AddContentReducer,
  help: helpScreenReducer,
  helpRequestAdmin: AdminHelpRequestReducer,
  getPwd: ForgotPwdReducer

});

export default configureStore;
