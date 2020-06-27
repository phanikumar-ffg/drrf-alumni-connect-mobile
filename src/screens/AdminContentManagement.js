import { ScrollView, View, Text, Image } from 'react-native'
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { connect } from 'react-redux';
import {authContentGet, getContent } from '../actions';
import {authContentDelete, deleteContent} from '../actions';

const AdminContentManagement = ({ props, navigation }) => {
    var [data, setData] = useState({value:[]})
    var [dataBackup, setDataBackup] = useState({value:[]})
    var [searchText, setSearchText] = useState({value:''})
    var [contentSelected, setContentSelected] = useState({})
    var [showLoader, setLoaderVisibility] = useState(true)
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''})
    var [yesButtonLoading, setButtonLoading] = useState(false)
    var [showAlert, setAlertVisibility] = useState(false)

    useEffect(() => {
              fetch("http://localhost:8080/api/v1/content/details")
              .then(response => {
                  if (response.status != 200){
                      setLoaderVisibility(false)
                      setAlertParameters({message: "Unable to fetch content, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                      setAlertVisibility(true)
                  }
                  else{
                      return response.json()
              }})
              .then(contents => {
                  setLoaderVisibility(false)
                  if (Array.isArray(contents) && contents.length) {
                  setData({value: contents});
                  setDataBackup({value: contents});
                  }
                  else {
                      setAlertParameters({message: "No contents found", backgroundColor: '#f0eabd', icon: 'warning', iconColor: '#665c10'})
                      setAlertVisibility(true)
                  }
              })
              .catch(err => {
                  setLoaderVisibility(false)
                  setAlertParameters({message: "Unable to fetch contents", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                  setAlertVisibility(true)
              })

          },[])
    const searchContent = (text) => {
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
    const handleSubmit = (content,index) => {
          console.log('handle submit method');
          setButtonLoading(true)
          let contentDetails = {...data.value[index], "index": index}
          setContentSelected(contentDetails)
          fetch('http://localhost:8080/api/v1/content/delete', {
             method: 'POST',
             body: JSON.stringify({
             contentURL: content.contentURL,
             contentType: content.contentType,
             contentDesc: content.contentDesc,
             assessmentURL: content.assessmentURL
          }),
          headers: {
             'Content-Type': 'application/json',
           }})
           .then(response => {
                console.log('reponse received!');
               if (response.status == 200){
                        console.log("delete successful");
//                         setAlertParameters({message: "Your delete request was successfully sent", backgroundColor: '#b6e0bc', icon: 'check-circle', iconColor: '#146110'})
                         removeDeletedContent();
               }
               else {
                         setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                     }
                     setAlertVisibility(true)
                     setTimeout(()=>{
                         setAlertVisibility(false)
                     }, 6000)                        // Alert gets automatically cleared after 6 sec
               })
               .catch(err => {
                     setButtonLoading(false)
//                     setdialogVisibility(false)
                     setAlertParameters({message: "Request not sent", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                     setAlertVisibility(true)
                     setTimeout(()=>{
                         setAlertVisibility(false)
                     }, 6000)
                 })
    }
    const removeDeletedContent = () => {
        console.log('delete content in UI');
        let updatedContentList = [...data.value]
        let updatedBackupContentList = [...dataBackup.value]
        let backupIndex = dataBackup.value.findIndex((contentDetails)=>{
          return contentDetails.content_id == jobSelected.jobId
        })
        UpdatedDataContentList.splice(contentSelected.index,1)
        UpdatedBackupContentList.splice(backupIndex,1)
        setData({value: UpdatedDataContentList})
        setDataBackup({value: UpdatedBackupContentList})
    }
    return (
        <ScrollView style={{marginTop:28}}>
            <SearchBar  clearIcon placeholder='Search Content' onChangeText={text=>searchContent(text)} value={searchText.value} />
            {data.value.map((j,index)=>( <View style={styles.viewStyle}>
                <Card key={j.content_id} wrapperStyle={styles.content} containerStyle={{width:'80%'}} >
                    <a href={j.contentURL}> <Image source={require('../assets/video-icon.png')} style={styles.image} to={j.assessment_url}/></a>
                    <Text> {j.contentDesc} </Text>
                    <a href={j.assessmentURL} className="button"> <Button mode="contained" >Quiz</Button></a>
                </Card>
                <Icon name='delete'  containerStyle={styles.icon} size={40} onPress={() => handleSubmit(j,index)}/>
            </View>))}

            <Button mode="contained"  mode="contained" onPress={() => navigation.navigate('AdminAddContentScreen')} > Add Content </Button>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
  image: {
      width: 40,
      height: 40,
  },
  content: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewStyle: {
   flexDirection:'row',
   justifyContent:'space-around',
  },
  icon: {
    marginLeft:'0.25%',
    alignItems:'center',
    justifyContent:'center'
  }
});

const mapStateToProps = state => {
  return {
    contentURL: state.auth.contentURL,
    contentType: state.auth.contentType,
    contentDesc: state.auth.contentDesc,
    assessmentURL: state.auth.assessmentURL,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(memo(AdminContentManagement));