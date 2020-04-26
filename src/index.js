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
    AdminJobEntryScreen,
    HomeScreen,
    NavigationScreen,
    HomeContentScreen,

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
      AdminJobEntryScreen,
      HomeScreen,
     NavigationScreen,
     HomeContentScreen,
  },
  {
    initialRouteName: 'HomeContentScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
