import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  JobSearch,
  ForgotPasswordMsgScreen,
    HelpScreen,
    ProfileScreen,
    SignUpSuccessScreen,
    AdminJobEntryScreen

} from './screens';

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    JobSearch,
    ForgotPasswordMsgScreen,
      HelpScreen,
      ProfileScreen,
      SignUpSuccessScreen,
      AdminJobEntryScreen
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
