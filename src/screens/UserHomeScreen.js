import React, {memo, Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
const { width } = Dimensions.get("window");
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import {userLogout} from '../actions'
import {connect} from 'react-redux';


class UserHomeScreen extends Component {
  backAction = () => {
         BackHandler.exitApp()
        return true;
      };

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
      );
    }

    componentWillUnmount() {
      this.backHandler.remove();
    }
  
  render() {
    return (
    <ScrollView>
         <Background>
              <Logo />
              <Header>Better Skills Better Jobs</Header>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')} >
                       <Image source={require('../assets/home-page-logos/profile2.png')}  style={styles.image}/>
                       <Text style = {styles.text} > Profile Maintenance </Text>
                   </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon}  >
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('JobSearch')} >
                       <Image source={require('../assets/home-page-logos/job_search2.png')} style={styles.image}/>
                       <Text style = {styles.text} > Job Search </Text>
                   </TouchableOpacity>
                </Card>
              </View>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpScreen')} >
                       <Image source={require('../assets/home-page-logos/help2.png')} style={styles.image}/>
                       <Text style = {styles.text} > DRF Help </Text>
                   </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon} >
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage')}>
                       <Image source={require('../assets/home-page-logos/content2.png')} style={styles.image}/>
                       <Text style = {styles.text} > Learning </Text>
                   </TouchableOpacity>
                </Card>
              </View>
              <View style ={{flex:1, flexDirection: 'row'}} >
                <Card containerStyle={styles.container}   style = {styles.icon}>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePasswordScreen')} >
                       <Image source={require('../assets/home-page-logos/change_password2.png')}  style={styles.image}/>
                       <Text style = {styles.text} > Change Password </Text>
                   </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.container}  style = {styles.icon} >
                   <TouchableOpacity onPress={() => {
                            this.props.userLogout();  
                            this.props.navigation.navigate('HomeScreen');                      
                        }}>
                       <Image source={require('../assets/home-page-logos/logout2.png')} style={styles.image}/>
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
      height: 100   ,
  },
  container: {
     justifyContent: "center",
     flexDirection: "row",
     flexWrap: "wrap",
     marginTop: 30,
     width:'40%',
     shadowOffset: {
     	width: 1,
     	height: 5,
     },
     shadowOpacity: 0.5,
     shadowRadius: 6.27,
     elevation: 10,
     borderRadius: 25,
  },
  text: {
    textAlign: "center",
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

const mapPropstoState = state => {
  return {
      user: state.auth.user 
  }
}

export default connect(mapPropstoState, {userLogout})(memo(UserHomeScreen))
