import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import JobSearch from './JobSearch';
import HelpScreen from './HelpScreen';
import Dashboard from './Dashboard';
import ProfileScreen from './ProfileScreen';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


export default createMaterialBottomTabNavigator(
      {
        Home: {
                screen: Dashboard,
                navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='home' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        JobSearch: { screen: JobSearch,
        navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='search' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        Help: { screen: HelpScreen,
                navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='help' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        Profile: { screen: ProfileScreen,
                navigationOptions: {
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='person' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
      },
      {
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#6b6b6b',
        barStyle: { backgroundColor: '#0f161c' },
      }
    );
