import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
const { width } = Dimensions.get("window");
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';


export default class AdminHomeScreen extends Component {
  render() {
    return (
     <View>
      <ScrollView>
      <Background>
          <Logo />
          <Header>Better Skills Better Jobs</Header>
          <View style = {{justifyContent: "flex-start",flexWrap: "wrap", marginLeft: 0}} >
          <View style ={{flex:1, flexDirection: 'row'}} >
            <Card containerStyle={{width:'50%'}}   style = {styles.icon}>
               <Icon name='help'  size={100} onPress={() => this.props.navigation.navigate('AdminHelpScreen')} />
               <Text style = {styles.text} > Help </Text>
            </Card>
            <Card containerStyle={{width:'50%'}}  style = {styles.icon}  >
               <Icon name='search'  size={100}  onPress={() => this.props.navigation.navigate('AdminJobEntryScreen')}/>
               <Text style = {styles.text} > Job Admin </Text>
            </Card>
          </View>
          <View style ={{flex:1, flexDirection: 'row'}} >
             <Card containerStyle={{width:'50%'}}   style = {styles.icon} >
                 <Icon name='user'  size={100}  onPress={() => this.props.navigation.navigate('ProfileScreen')}/>
                 <Text style = {styles.text} > Profile Admin </Text>
             </Card>
             <Card containerStyle={{width:'50%'}} style = {styles.icon} >
                  <Icon name='image'  size={100} onPress={() => this.props.navigation.navigate('AdminContentManagement')} />
                  <Text style = {styles.text} > Manage Content </Text>
             </Card>
          </View>
          </View>

       </Background>
       </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start",
     flexDirection: "row",
     flexWrap: "wrap",
     marginTop: 30
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
//    fontSize: 20
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