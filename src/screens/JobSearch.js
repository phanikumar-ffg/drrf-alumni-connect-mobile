import { ScrollView, View, Text,StatusBar, ActivityIndicator} from 'react-native'
import {  Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, Image,StyleSheet} from 'react-native';
import {Avatar, Card, DefaultTheme, Title, Paragraph , Button as PaperButton } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Button from '../components/Button';
import {connect} from 'react-redux';
import config from '../config/index.js';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#151517',
  },
};

const LeftContent = props => <Avatar.Icon {...props} theme = {theme} icon="account-box"  />

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


    //Initialising variables for alert, popup, loader and touchableOpacity components
    var showPopup = null
    var showTouchOpacity = null
    var Alert = null
    var loader = null


    //Loader view component
    const loaderComp = (
        <View style = {styles.loader}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    )


    //Popup view component
    const popup = (
        <View style={styles.popupContainer}>
            <Text  style = {styles.popupHeaderText}>Confirmation</Text>
            <Text style={{flex:1, fontSize: 18, color:'#152b73', marginBottom: '5%', marginTop: "5%", padding: '5%'}}>Are you sure you want to apply for this Job?</Text>
            <View style = {{flex:1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey'}}>
                <PaperButton mode = "contained" labelStyle = {styles.text} style={styles.noButton} onPress = {() => {setdialogVisibility(false)}}>No</PaperButton>
                <PaperButton mode = "contained"  labelStyle = {styles.text} style={styles.yesButton} onPress = {() => sendJobRequest()} loading = {yesButtonLoading}>Yes</PaperButton>
            </View>
        </View>
    )


    //Alert view Component; Created dynamically based on request response status
    const resAlert = (
        <View style = {{flexDirection: 'row', padding: '5%', alignItems: 'center',backgroundColor: alertParameters.backgroundColor}}>
            <Icon name = {alertParameters.icon} color = {alertParameters.iconColor} size = {25} />
            <Text style = {{fontSize: 20, width: '90%'}}>{alertParameters.message}</Text>
            <Icon name = 'clear' color = {alertParameters.iconColor} size = {20}  onPress = {() => setAlertVisibility(false)} />
        </View>
    )


    //Touchable opacity view component
    const TouchableOpacityView = (
        <TouchableOpacity disabled = {true} style = {styles.touchOpacity} onPress ={ ()=>{setdialogVisibility(false)}}></TouchableOpacity>
    )

    const cardTop = 20;

    //Function runs once only when Job Search screen is rendered to get job data
    useEffect(() => {
        fetch(config.baseurl+'/api/v1/jobs/'+props.user.aspirantId)
        .then(response => {
            if (response.status != 200){
                setLoaderVisibility(false)
                setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                setAlertVisibility(true)
                return "Server Error"
            }
            else{
                return response.json()
        }})
        .then(res => {
            setLoaderVisibility(false)
            if (Array.isArray(res) && res.length) {
            setData({value: res});
            setDataBackup({value: res});
            }
            else {
                if (res!="Server Error"){
                    setAlertParameters({message: "No jobs found", backgroundColor: '#f0eabd', icon: 'warning', iconColor: '#665c10'})
                    setAlertVisibility(true)
                }
            }
        })
        .catch(err => {
            setLoaderVisibility(false)
            setAlertParameters({message: "Unable to fetch jobs", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
        })
        
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
                return l.cityName.trim().toLowerCase().startsWith( searchText );
            });
            setData({value: filteredData})
        }
        else {
            setData({value: dataBackup.value})
        }
    }

    
    const applyJobHandler = (index) => {
        let jobDetails = {...data.value[index], "index": index}
        setJobSelected(jobDetails)
        setdialogVisibility(true)
     }


     //Removing job entry from list after user has applied for it
     const removeAppliedJobEntry = () => {
        let UpdatedDataJobList = [...data.value]
        let UpdatedBackupJobList = [...dataBackup.value]
        let backupIndex = dataBackup.value.findIndex((jobDetails)=>{
            return jobDetails.jobId == jobSelected.jobId
        })
        UpdatedDataJobList.splice(jobSelected.index,1)
        UpdatedBackupJobList.splice(backupIndex,1)
        setData({value: UpdatedDataJobList})
        setDataBackup({value: UpdatedBackupJobList})
     }


     //Send Job Request to the backend with job and user details
     const sendJobRequest = () => {
        setButtonLoading(true)
        fetch(config.baseurl+'/api/v1/jobrequest', {
            method: 'POST',
            body: JSON.stringify({
                studentId: props.user.aspirantId,
                studentEmail: props.user.emailId,
                studentName: props.user.firstName+' '+props.user.lastName,
                jobId: jobSelected.jobId,
                jobRole: jobSelected.designation,
                jobCompanyName: jobSelected.companyName,
                jobDescription: jobSelected.jobDescription
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            setButtonLoading(false)
            setdialogVisibility(false)
            if (response.status == 200){
                setAlertParameters({message: "Request successfully sent", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'})
                removeAppliedJobEntry();
            }
            else {
                setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            }
            setAlertVisibility(true)
        })
        .catch(err => {
            setButtonLoading(false)
            setdialogVisibility(false)
            setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
            setAlertVisibility(true)
        })

     }

    return (
        <View style = {{flex: 1}}>
                <StatusBar backgroundColor = '#262629' barStyle = 'light-content'></StatusBar>
                <SearchBar 
                    containerStyle = {{backgroundColor: "#151517"}}
                    inputContainerStyle = {{marginLeft: '10%',width:'88%', marginTop: '2%', marginBottom: '2%', backgroundColor: '#202024'}}
                    searchIcon
                    clearIcon
                    placeholder='Search Location'
                    onChangeText={text=>searchJob(text)}
                    value = {searchText.value}
                />
                <TouchableOpacity onPress={() => {props.navigation.navigate("UserHomeScreen")}} style={styles.backContainer}>
                    <Image style={styles.backImage} source={require('../assets/arrow_back.png')} />
                </TouchableOpacity>
  

            {loader}
            {Alert}

            <ScrollView>
            {data.value.map((j,index)=>(

                    <Card key = {j.jobId} style ={{ shadowOffset: {
                                        width: 1,
                                        height: 3,
                                    },
                        shadowOpacity: 0.6,
                        shadowRadius: 6.27,
                        elevation: 5,
                        borderRadius: 6, left : '5%', top: 20, marginBottom: 25, width: '90%', backgroundColor: '#fdfdfd'}}>
                    <Card.Title style = {{ backgroundColor: '#e2e2e2'}} title={j.designation} left={LeftContent} />
                    <Card.Content style ={{marginTop: '6%', marginBottom: '8%'}}> 
                        <Title style = {{fontWeight: 'bold', fontSize: 18, marginLeft: 'auto',marginRight: 'auto', marginBottom: '6%'}}>{j.companyName}</Title>
                            <View style = {{flex: 1, marginBottom: '3%', flexDirection: 'row'}}>
                                <Icon name='place' color="#414142" size={25} style = {{flex:0.5}}/>
                                <Text style = {{flex: 0.5, fontSize: 16, marginLeft: '1%'}}>{j.cityName}</Text>
                            </View>
                            <View style = {{flex: 1, flexDirection: 'row', width: '100%'}}>
                                <Icon name='message' color="#414142" size={22} style = {{flex:0.2}}/>
                                <Text style = {{flex: 0.8, fontSize: 16, marginLeft: '2%'}}>{j.jobDescription}</Text>
                            </View>
                    </Card.Content>

                    <Card.Actions style={{ height: 50, backgroundColor: '#600ee6',borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                    <PaperButton labelStyle = {styles.text} style = {{width: '100%'}} onPress = {() => {applyJobHandler(index)}}>Apply Now</PaperButton>
                    </Card.Actions>
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
    margin: '3%',
    backgroundColor: '#1b8f3a'
  },
  noButton: {
    flex: 0.5, 
     margin: '3%',
    backgroundColor: '#e0110d'
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
    marginTop: "2%",
    marginBottom: '5%',
    width: '100%', 
    fontSize: 22,
    color: '#1a2638',
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
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
  },
  backContainer: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: "#86939e"
  },
});


//Connecting to Redux and getting user details as props
const mapPropstoState = state => {
    return {
        user: state.auth.user 
    }
}

export default connect(mapPropstoState)(memo(JobSearch));
