import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
const { width } = Dimensions.get("window");
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';


export default class UserHomeScreen extends Component {
  render() {
    return (
    <ScrollView>
         <Background>
              <Logo />
              <Header>Better Skills Better Jobs</Header>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <Icon name='person'  size={100} onPress={() => this.props.navigation.navigate('ProfileScreen')} />
                   <Text style = {styles.text} > Profile Maintenance </Text>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon}  >
                   <Icon name='search'  size={100}  onPress={() => this.props.navigation.navigate('JobSearch')}/>
                   <Text style = {styles.text} > Job Search </Text>
                </Card>
              </View>
              <View style ={{flex:1, flexDirection: 'row'}} >
                 <Card containerStyle={styles.container}   style = {styles.icon} >
                     <Icon name='help'  size={100}  onPress={() => this.props.navigation.navigate('HelpScreen')}/>
                     <Text style = {styles.text} > DRF Help </Text>
                 </Card>
                 <Card containerStyle={styles.container} style = {styles.icon} >
                      <Icon name='image'  size={100} onPress={() => this.props.navigation.navigate('HomePage')} />
                      <Text style = {styles.text} > New Content </Text>
                 </Card>
              </View>
              </Background>
          </ScrollView >
    );
  }
}
const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start",
     flexDirection: "row",
     flexWrap: "wrap",
     marginTop: 30,
     width:'40%',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
//    fontSize: 20
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