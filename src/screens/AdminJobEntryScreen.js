import React, { memo,useState, useEffect } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { StyleSheet, View, Alert } from 'react-native';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import RNPickerSelect from 'react-native-picker-select';
import { Paragraph } from 'react-native-paper';

const AdminJobEntryScreen = ({ navigation },props) => {
    var [yesButtonLoading, setButtonLoading] = useState(false)
    const [jobId, setJobId] = useState({ value: '', error: '' });
    const [companyName, setcompanyName] = useState({ value: '', error: '' });
    const [role, setrole] = useState({ value: '', error: '' });
    const [qualification,setqualification] = useState({value: '', error:''});
    const[vacancyCount,setVacancyCount]=useState({value:'',error:''});
    const [jobDescription, setjobDescription] = useState({ value: '', error: '' });
    var [city, setCity] = useState({value:[]});
    var[state, setState] = useState({value:[]});
    var[ cityData, setCityData]= useState([]);
    var [showAlert, setAlertVisibility] = useState(true);
    var [cityId, setCityId] = useState(null);
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''});
    var Alert = null;

    const resAlert = (
      <View>
          <Text>Test</Text>
      </View>
  );
  const resetForm = () => {
    setJobId({value:"",error:""});
    setcompanyName({value:"",error:""});
    setrole({value:"",error:""});
    setVacancyCount({value:"",error:""});
    setjobDescription({value:"",error:""});
  };
  if (showAlert){
    Alert = resAlert;
  }
  useEffect(() => {
    //hardcoding url with studentId=1234 for testing
    fetch('http://localhost:8080/api/v1/cityDetails') //should be 'http://localhost:8080/api/v1/jobs/'+props.user.studentId
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setCityData(json);
      let citylist=[];
      let statelist=[];
      json.forEach(i =>{
      //  citylist.push({label:i.city, value: i.city});
        statelist.push({label:i.state, value: i.state});
      })
      console.log(citylist);
     // setCity({value:citylist});
      setState({value:statelist});
      console.log(city);
    })
    .catch(err => {
        console.log(err);
        setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
        setAlertVisibility(true)
    })

},[]);
  const sendJobDetails=()=>{
    let student_details = props.user
    console.log("JobId"+jobId.value);
    console.log("Qualification required"+qualification.value);
    console.log("City Id"+cityId);
    fetch('http://localhost:8080/api/v1/saveJobInfo', {
        method: 'POST',
        body: JSON.stringify({
            companyName:companyName.value,
            designation:role.value,
            jobDescription:jobDescription.value,
            cityId:cityId,
            vacancyCount:vacancyCount.value,
            qualificationReq:qualification.value
        }),
        headers: {
          Accept: 'application/json',
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
      if (response.status == 200){
      setAlertParameters({message: "Your request was successfully sent", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'});
      setAlertVisibility(true);
      console.log("Details saved successfully");
        setButtonLoading(false);
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
    .catch(err => {
      setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'});
      setAlertVisibility(true);
      console.log(" error occured while saving Details");
        setButtonLoading(false);
        setTimeout(()=>{
          setAlertVisibility(false)
      }, 6000)
    })

  }
  const getCityId=(selectedCity)=>{
     console.log(selectedCity);
    let selectedcityList= cityData.filter(i => {
       return i.city == selectedCity;
     });
     console.log(selectedcityList[0].cityId);
     setCityId(selectedcityList[0].cityId);
  }

  const getState=(selectedState)=>{
    let citylist=[];
    console.log(selectedState);
    cityData.forEach(i =>{
      if(i.state == selectedState){
        citylist.push({label:i.city, value: i.city});
      }
    });
    console.log(citylist);
    setCity({value:citylist});
    let selectedStateList= cityData.filter(i => {
      return i.state == selectedState;
    });

  }
  return (
       <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate('LoginScreen')} />
        <Logo />
        <Header>New Job Entry - Admin</Header>

        <TextInput label="Company Name"  value= {companyName.value}
      onChangeText={text =>
        setcompanyName({value:text, error:''})
      } />

        <TextInput label="Role/Designation"  value= {role.value}
      onChangeText={text =>
        setrole({value:text,error:''})
      } />

        <TextInput label="Job Description"  value= {jobDescription.value}
      onChangeText={text =>
       setjobDescription({value:text,error:''})
      } />
       <TextInput label="No. of Vacancies"  value= {vacancyCount.value}
      onChangeText={text => setVacancyCount({ value: text, error: '' })} />
      <TextInput label="Qualification Required"  value= {qualification.value}
      onChangeText={text =>
        setqualification({value:text, error:''})
      } />
       <View style={styles.container}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a State',
              value: null,
            }}
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
            onValueChange={e => getCityId(e)}
            items={city.value}
            style={pickerStyle}
          />

        </View>

        <Button mode="contained" onPress={() => sendJobDetails()} loading={yesButtonLoading}>
          SAVE
        </Button>
        <Button
          mode="contained"
          onPress={() => resetForm()}
        >
          RESET
        </Button>
        </Background>
     </ScrollView>

  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
    marginTop: 20,
  },
  container: {
    width: '100%',
    paddingTop: 17,
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
  },
  placeholder: {
    placeholderColor: '#808080',
  },
});


export default memo(AdminJobEntryScreen);
