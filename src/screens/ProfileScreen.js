import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-elements';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';
import RNPickerSelect from 'react-native-picker-select';
import { Component } from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {updateProfile} from '../actions/userProfile';
import config from '../config/index.js';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {
  emailValidator,
  mobileValidator,
  nameValidator,
  stateValidator,
  cityValidator,
} from '../core/utils';

class ProfileTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['Company Name', 'Profile', 'From', 'To'],
      DataTable: [
        ['Lemon Tree Hotel', 'FrontDesk Executive', 'Jan-19', 'Aug-19'],
        ['Skywalk Hospitality', 'DataEntry operator', 'Sep-19', 'Jan-20'],
      ],
    };
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={state.HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={state.DataTable} textStyle={styles.TableText} />
        </Table>
      </View>
    );
  }
}

const ProfileScreen = (props) => {
  var [name, setName] = useState({ value: props.user.firstName + ' ' + props.user.lastName, error: '' });
  var [email, setEmail] = useState({ value: props.user.emailId, error: '' });
  var [mobile, setMobile] = useState({ value: props.user.phone, error: '' });
  
    var [city, setCity] = useState({value: []});
    var[state, setState] = useState({value:[]});
    var[ cityData, setCityData]= useState([]);
    var[ stateData, setStateData] = useState([]);
    var [cityId, setCityId] = useState(null);
    var stateId = null;
    var [selectedStateItem,setSelectedState]= useState({value: '', error:''});
    var [selectedCityItem,setSelectedCityItem]=useState({value:'',error:''}) ;
  var [CurrentCompany, setCurrentCompany] = useState({ value: props.user.currentOrganization, error: '' });
  var [showAlert, setAlertVisibility] = useState(false);
  var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''});
  var Alert = null;

  const resAlert = (
    <View style = {{flex:1, flexDirection: 'row', paddingHorizontal: "5%", backgroundColor: alertParameters.backgroundColor}}>
          <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {25} style = {{flex:1}} />
          <Paragraph style = {{fontSize: 20, flex: 5,}}>{alertParameters.message}</Paragraph>
          <Icon name = 'clear' color = {alertParameters.iconColor} size = {25} style = {{flex:1}} onPress = {() => setAlertVisibility(false)} />
      </View> 
);
if (showAlert){
  Alert = resAlert;
}
  

  const stateFetch=() =>{
    fetch(config.baseurl+'/api/v1/stateDetails') 
    .then(response => {
      if (response.status != 200){
          setLoaderVisibility(false)
          setAlertParameters({message: "Unable to fetch jobs, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
          setAlertVisibility(true)
      }
      else{
          return response.json()
  }})
    .then(json => {
      console.log(json);
      setStateData(json);
      let citylist=[];
      let statelist=[];
      json.forEach(i =>{
        statelist.push({label:i.stateName, value: i.stateName});
      })
      console.log(citylist);
     // setCity({value:citylist});
      setState({value:statelist});
      console.log(city);
    })
    .catch(err => {
      
    })
  }
  useEffect(() => {
   stateFetch();
},[]);
const getCityId=(selectedCity)=>{
  console.log(selectedCity);
  setSelectedCityItem(selectedCity);
  if(selectedCity != '' && selectedCity != null){
   let selectedcityList= cityData.filter(i => {
     return i.cityName == selectedCity;
   });
   console.log(selectedcityList[0].cityId);
   setCityId(selectedcityList[0].cityId);
  }
 
}


const getState=(selectedState)=>{
 let citylist=[];
 console.log(selectedState);
 setSelectedState(selectedState);
//  selectedStateItem = selectedState;
if(selectedState !='' && selectedState != null){   
 let selectedStateList = stateData.filter(i => {
   return i.stateName == selectedState;
 });
 console.log(selectedStateList[0].stateId);
 stateId = selectedStateList[0].stateId;
 console.log("stateId"+stateId);
 const headers = { 'Content-Type': 'application/json' }
 fetch(config.baseurl+'/api/v1/cityDetails/'+stateId,{headers},{mode:"no-cors"})
 .then(response =>  {
   if (response.status != 200){
       setLoaderVisibility(false)
       setAlertParameters({message: "Unable to fetch jobs, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
       setAlertVisibility(true)
   }
   else{
       return response.json()
}})
 .then(json => {
   setCityData(json);
   json.forEach(i =>{
     citylist.push({label: i.cityName, value: i.cityName});
     cityData.push(i.cityName);
   })
   setCity({value:citylist});
 }).catch(err => {})

}
}


  const _onSavePressed = () => {
    
  
      console.log("Sending details ");
      fetch(config.baseurl+'/api/v1/updateProfile', {
        method: 'POST',
        headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            emailId:props.user.emailId,
            phone:mobile.value,
            cityId:cityId,
            currentOrganization:CurrentCompany.value
             }),
           })
           .then(response => {
           if (response.status == 200){
            setAlertParameters({message: "Profile details successfully updated", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'});
            setAlertVisibility(true);
              setTimeout(()=>{
                setAlertVisibility(false)
            }, 6000)
          }
          else{
            setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'});
            setAlertVisibility(true);
            setTimeout(()=>{
              setAlertVisibility(false)
          }, 6000)
          }
        })
            .catch(error => {
              setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'});
              setAlertVisibility(true);
              console.log(" error occured while saving Details");
                setTimeout(()=>{
                  setAlertVisibility(false)
              }, 6000)
             
            });
      
    }

    const _onPasswordChange = () => {
      console.log('on password change method');
      props.navigation.navigate('ChangePasswordScreen');
    };

    //navigation.navigate('ProfileScreen');
  

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => props.navigation.navigate('UserHomeScreen')} />
        <Logo />
        {Alert}

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          editable={false}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Mobile"
          returnKeyType="next"
          value={mobile.value.toString()}
          onChangeText={text => setMobile({ value: text, error: '' })}
          error={!!mobile.error}
          errorText={mobile.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          editable={false}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />


<View style={styles.container}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a State',
              value: null,
            }}
      value={selectedStateItem}
            onValueChange={e => getState(e)}
            items={state.value}
            style={pickerStyle}
          />
        </View>

        <View style={styles.container}>
           <RNPickerSelect
            placeholder={{
              label: 'Select a City',
              value: null,
            }}
            value={selectedCityItem}
            onValueChange={e => getCityId(e)}
            items={city.value}
            style={pickerStyle}
          />

        </View>


<TextInput
          label="Current Company"
          returnKeyType="next"
          value={CurrentCompany.value}
          onChangeText={text => setCurrentCompany({ value: text, error: '' })}
          error={!!CurrentCompany.error}
          errorText={CurrentCompany.error}
        />

        <Button
          mode="contained"
          onPress={_onSavePressed}
          style={styles.button}
        >
          Save
        </Button>

        <Button
          mode="contained"
          onPress={_onPasswordChange}
          style={styles.button}
        >            Change Password
          </Button>

      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  container: {
    width: '100%',
    paddingTop: 17,
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
});
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    backgroundColor: theme.colors.surface,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    borderColor: '#808080',
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
  };
}; */
//{ authInputChange, login } mapDispatchToProps
export default connect(mapStateToProps, {  updateProfile })(
  ProfileScreen
);


