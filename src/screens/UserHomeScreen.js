import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
const { width } = Dimensions.get("window");
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import {changePassword} from '../actions'


export default class UserHomeScreen extends Component {
  render() {
    return (
    <ScrollView>
         <Background>
              <Logo />
              <Header>Better Skills Better Jobs</Header>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <Image source={require('../assets/home-page-logos/person.svg')} onPress={() => this.props.navigation.navigate('ProfileScreen')} style={styles.image}/>
                   <Text style = {styles.text} > Profile Maintenance </Text>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon}  >
                   <Image source={require('../assets/home-page-logos/search.svg')} onPress={() => this.props.navigation.navigate('JobSearch')} style={styles.image}/>
                   <Text style = {styles.text} > Job Search </Text>
                </Card>
              </View>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <Image source={require('../assets/home-page-logos/help_center.svg')} onPress={() => this.props.navigation.navigate('HelpScreen')} style={styles.image}/>
                   <Text style = {styles.text} > DRF Help </Text>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon}  >
                   <Image source={require('../assets/home-page-logos/local_library.svg')} onPress={() => this.props.navigation.navigate('HomePage')} style={styles.image}/>
                   <Text style = {styles.text} > Learning </Text>
                </Card>
              </View>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <Image source={require('../assets/home-page-logos/lock_open.svg')} onPress={{changePassword}} style={styles.image}/>
                   <Text style = {styles.text} > Change Password </Text>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon}  >
                   <Image source={require('../assets/home-page-logos/exit_to_app.svg')} onPress={() => this.props.navigation.navigate('HomeScreen')} style={styles.image}/>
                   <Text style = {styles.text} > Logout </Text>
                </Card>
              </View>
            </Background>
          </ScrollView >
    );
  }
}
const styles = StyleSheet.create({
  image: {
      width: 100,
      height: 100   ,
  },
  container: {
     justifyContent: "center",
     flexDirection: "row",
     flexWrap: "wrap",
     marginTop: 30,
     width:'40%',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10
  },
  icon: {
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 0,
     marginRight: "50%",
     marginVertical: '3%',
     flex : 0.5,
     backgroundColor: '#eee',
     width : 100
  }
  });