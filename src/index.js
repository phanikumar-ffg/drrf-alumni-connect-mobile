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
  HomePage,
  AdminContentManagement,
  AdminAddContentScreen,
  AdminHelpScreen,
  UserHomeScreen,
  AdminHomeScreen

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
    HomePage,
    AdminContentManagement,
    AdminAddContentScreen,
    UserHomeScreen,
    AdminHelpScreen,
    AdminHomeScreen
  },
  {
    initialRouteName: 'AdminHomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
