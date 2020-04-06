import React, { memo, Component } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import JobSearch from './JobSearch';
import HelpScreen from './HelpScreen';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ProfileScreen from './ProfileScreen';
import { createAppContainer } from 'react-navigation';
import NavigationScreen from './NavigationScreen';


class Dashboard extends Component{
    render(){
        return(
            <View>
                <Text>Home Screen</Text>
                </View>
        )
    }
}
const TabNavigator= createMaterialBottomTabNavigator(
      {
        Home: {
                screen: NavigationScreen,
                navigationOptions: {
                    tabBarLabel:'Home',   
                    activeColor:"#600EE1",
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='home' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        JobSearch: { screen: JobSearch,
        navigationOptions: {
            tabBarLabel:'Job Search',   
            activeColor:"#600EE1",
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='search' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        Help: { screen: HelpScreen,
                navigationOptions: {
                    tabBarLabel:'Help',   
                    activeColor:"#600EE1",
                    tabBarIcon: ({tintColor}) => (
                        <View>
                            <Icon name='help' color={tintColor} size={26} />
                        </View>
                    )
                }
        },
        Profile: { screen: ProfileScreen,
                navigationOptions: {
                    tabBarLabel:'Profile',   
                    activeColor:"#600EE1",
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
        activeColor: '#600EE1',
        inactiveColor: '#6b6b6b',
        barStyle: { backgroundColor: '#ffffff' },
      }
    );

    export default createAppContainer(TabNavigator);
    // export default memo(TabNavigator);