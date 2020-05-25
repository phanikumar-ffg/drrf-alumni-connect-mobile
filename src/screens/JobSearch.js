import { ScrollView, View, Text, ActivityIndicator} from 'react-native'
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Button from '../components/Button';
import {connect} from 'react-redux';

//Main Job Search React Component
const JobSearch = (props) => {

    //defining states
    var [data, setData] = useState({value:[]})
    var [dataBackup, setDataBackup] = useState({value:[]})    
    var [searchText, setSearchText] = useState({value:''})
    var [dialogVisibility, setdialogVisibility] = useState(false)
    var [jobSelected, setJobSelected] = useState({})
    var [yesButtonLoading, setButtonLoading] = useState(false)
    var [showAlert, setAlertVisibility] = useState(false)
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''})
    var [showLoader, setLoaderVisibility] = useState(true)


    //Initialising variables for alert, popup, loader and touchableOpacuty components
    var showPopup = null
    var showTouchOpacity = null
    var Alert = null
    var loader = null


    //Loader view component
    const loaderComp = (
        <View style = {styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )


    //Popup view component
    const popup = (
        <View style={styles.popupContainer}>
            <Text  style = {styles.popupHeaderText}>Confirmation<hr /></Text>
            <View style = {{flex: 1, flexDirection: 'row', marginLeft: '20%', marginTop: "5%",marginBottom: '8%'}}>
                <Icon name='assignment-ind' color="#0b2652" size={25} style = {{flex:1}}/>   
                <Text style={styles.popupText}> {jobSelected.designation}</Text>
            </View>
            <View style = {{flex: 1, flexDirection: 'row', marginLeft: '20%', marginBottom: '8%'}}>
                <Icon name='location-city' color="#0b2652" size={25} style = {{flex:1}} />   
                <Text style={styles.popupText}> {jobSelected.companyName}</Text>
            </View>
            <View style = {{flex: 1, flexDirection: 'row',  marginLeft: '20%', marginBottom: '10%'}}>
                <Icon name='place' color="#0b2652" size={25} style = {{flex:1}}/>   
                <Text style={styles.popupText}> {jobSelected.city}</Text>
            </View>
            <Text style={{flex:1, width: "100%"}}><hr /></Text>
            <View style = {{flex:1, flexDirection: 'row'}}>
                <PaperButton mode = "contained" labelStyle = {styles.text} style={styles.noButton} onPress = {() => {setdialogVisibility(false)}}>No</PaperButton>
                <PaperButton mode = "contained"  labelStyle = {styles.text} style={styles.yesButton} onPress = {() => sendJobRequest()} loading = {yesButtonLoading}>Yes</PaperButton>
            </View>
        </View>
    )


    //Alert view Component; Dynamically creating component based on request response status
    const resAlert = (
        <View style = {{flex:1, flexDirection: 'row', paddingTop: "5%", paddingHorizontal: "5%", paddingBottom: "10%", backgroundColor: alertParameters.backgroundColor}}>
            <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {20} style = {{flex:1}} />
            <Text style = {{fontSize: 20, flex: 5,}}>{alertParameters.message}</Text>
            <Icon name = 'clear' color = {alertParameters.iconColor} size = {20} style = {{flex:1}} onPress = {() => setAlertVisibility(false)} />
        </View>
    )


    const TouchableOpacityView = (
        <TouchableOpacity style = {styles.touchOpacity} onPress ={ ()=>{setdialogVisibility(false)}}></TouchableOpacity>
    )

    //Function runs once only when Job Search screen is rendered to get job data
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/jobs')
        .then(response => response.json())
        .then(json => {
            setLoaderVisibility(false)
            setData({value: json});
            setDataBackup({value: json});
        })
        .catch(err => {
            console.log(err);
            setLoaderVisibility(false)
            setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
        })
        console.log("rendered", props.user) //printing user details getting {email: 'abc', password: 'abc'}
    },[])

    
    //Conditionally rendering popup
    if (dialogVisibility) {
        showPopup = popup
        showTouchOpacity = TouchableOpacityView
    }


    //Conditionally rendering alert
    if (showAlert){
        Alert = resAlert
    }


    //Conditionally rendering loader
    if (showLoader){
        loader = loaderComp
    }


    //Filtering job data according to city provided by the user in serch box   
    const searchJob = (text) => {
        setSearchText({value: text})
        searchText = text.trim().toLowerCase();
        if (!searchText == "") {
            var filteredData = dataBackup.value.filter(l => {
                return l.city.trim().toLowerCase().startsWith( searchText );
            });
            setData({value: filteredData})
        }
        else {
            setData({value: dataBackup.value})
        }
    }

    
    const applyJobHandler = (index) => {
        let jobDetails = data.value[index]
        console.log(jobDetails)
        setJobSelected(jobDetails)
        setdialogVisibility(true)
     }


     //Send Job Request to the backend with job and user details
     const sendJobRequest = () => {
        setButtonLoading(true)
        let student_details = props.user

        fetch('http://localhost:8080/api/v1/jobrequest', {
            method: 'POST',
            body: JSON.stringify({
                studentId: 1234,        //hardcoding user details for testing
                studentName: "ABC",
                jobId: jobSelected.jobId,
                jobRole: jobSelected.role,
                jobCompanyName: jobSelected.companyName,
                jobCity: jobSelected.city
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            response.json();
            setButtonLoading(false)
            setdialogVisibility(false)
            setAlertParameters({message: "Your request was successfully sent", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'})
            setAlertVisibility(true)
            setTimeout(()=>{
                setAlertVisibility(false)
            }, 6000)                        // Alert gets automatically cleared after 6 sec
        })
        .then(json => console.log(json))
        .catch(err => {
            setButtonLoading(false)
            setdialogVisibility(false)
            setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
            setTimeout(()=>{
                setAlertVisibility(false)
            }, 6000)
        })

     }

    return (
        <View style = {{flex: 1}}>
            <SearchBar 
                clearIcon
                placeholder='Search Location'
                onChangeText={text=>searchJob(text)}
                value = {searchText.value}
            />

            {loader}
            {Alert}

            <ScrollView>
                {data.value.map((j,index)=>(
                <Card
                key={j.jobId}
                title={j.designation}
                style={{marginTop: 20 ,width: '95%'}} >
                <Text style={{marginBottom: 8}}>
                        Company: {j.companyName}
                    </Text>
                    <Text style={{marginBottom: 8}}>
                        Location: {j.city}
                    </Text>
                    <Text style={{marginBottom: 8}}>
                        Description: {j.jobDescription}
                    </Text>
                <Button mode="contained" onClick = {() => {applyJobHandler(index)}}>Apply Now</Button>
                </Card>))}
            </ScrollView>
            
            {showTouchOpacity}
            {showPopup}
        </View>  
    );

};


//StyleSheet object
const styles = StyleSheet.create({
    text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: 'white'
  },
  yesButton: {
    flex: 0.5,
    marginRight: "20%",
    marginLeft: "2%",
    marginVertical: '3%',
    backgroundColor: '#3f9e3a'
  },
  noButton: {
    flex: 0.5, 
    marginLeft: "20%",
    marginRight: "2%",
    marginVertical: '3%',
    backgroundColor: '#e35b5b'
  },
popupContainer: {
    borderRadius: 20,
    position: 'absolute',
    zIndex: 5,
    flex: 1,
    width: '70%', 
    marginTop: '25%',
    marginHorizontal: '15%',
    flexDirection: 'column',
    padding: '3%',
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width:2, height: 2},
    borderBottomWidth: 1,
    borderBottomColor: '#1c3466'
  },
popupHeaderText: {
    flex: 1, 
    textAlign: 'center', 
    marginTop: "2%", width: '100%', 
    fontSize: 22,
    color: '#1a2638',
    fontWeight: "bold"
  },
popupText: {
    flex: 1,
    fontSize: 18, 
    marginLeft: "1%",
    color:'#426db3'
  },
loader: {
    flex:1, 
    justifyContent: 'center',
    padding: "5%"
  },
touchOpacity: {
    width: "100%", 
    height: "100%",
    backgroundColor: "black", 
    opacity: 0.7, 
    position: "absolute"
  }
});


//Connecting to Redux and getting user details as props
const mapPropstoState = state => {
    return {
        user: state.auth.user
    }
}


export default connect(mapPropstoState)(memo(JobSearch));
