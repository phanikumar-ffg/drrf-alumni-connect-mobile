import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
const { width } = Dimensions.get("window");
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import {changePassword} from '../actions'


export default class AdminHomeScreen extends Component {
  render() {
    return (
     <ScrollView>
        <Background>
          <Logo />
          <Header>Better Skills Better Jobs</Header>
          <View style ={{flex:1, flexDirection: 'row'}} >
            <Card containerStyle={styles.container}   style = {styles.icon}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminHelpScreen')} >
                   <Image source={require('../assets/home-page-logos/help_center.svg')} style={styles.image}/>
                   <Text style = {styles.text} > Help </Text>
               </ TouchableOpacity>
            </Card>
            <Card containerStyle={styles.container}  style = {styles.icon}  >
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminJobEntryScreen')} >
                   <Image source={require('../assets/home-page-logos/search.svg')} style={styles.image}/>
                   <Text style = {styles.text} > Job Admin </Text>
               </TouchableOpacity>
            </Card>
          </View>
          <View style ={{flex:1, flexDirection: 'row'}} >
             <Card containerStyle={styles.container}   style = {styles.icon} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')} >
                     <Image source={require('../assets/home-page-logos/person.svg')} style={styles.image}/>
                     <Text style = {styles.text} > Profile Admin </Text>
                 </ TouchableOpacity>
             </Card>
             <Card containerStyle={styles.container} style = {styles.icon} >
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminContentManagement')} >
                      <Image source={require('../assets/home-page-logos/local_library.svg')} style={styles.image}/>
                      <Text style = {styles.text} > Manage Content </Text>
                  </TouchableOpacity>
             </Card>
          </View>
          <View style ={{flex:1, flexDirection: 'row'}} >
            <Card containerStyle={styles.container}   style = {styles.icon}>
                <TouchableOpacity onPress={{changePassword}} >
                    <Image source={require('../assets/home-page-logos/lock_open.svg')} style={styles.image}/>
                    <Text style = {styles.text} > Change Password </Text>
                </TouchableOpacity>
            </Card>
            <Card containerStyle={styles.container}  style = {styles.icon}  >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')} >
                    <Image source={require('../assets/home-page-logos/exit_to_app.svg')} style={styles.image}/>
                    <Text style = {styles.text} > Logout </Text>
                </TouchableOpacity>
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
     height: 100,
  },
  container: {
     justifyContent: "flex-start",
     flexDirection: "row",
     flexWrap: "wrap",
     marginTop: 30
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10
  },
  icon: {
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20,
     marginRight: "50%",
     marginVertical: '3%',
     flex : 0.5,
     backgroundColor: '#eee',
     height : '100%',
     width : 100
  }
  });