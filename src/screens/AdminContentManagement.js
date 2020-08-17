import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native'
import { Card, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState, useEffect} from 'react';
import { TouchableOpacity, StatusBar,StyleSheet, TouchableHighlight} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Background from '../components/Background';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { connect } from 'react-redux';
import config from '../config/index.js';
import * as Linking from 'expo-linking';

const AdminContentManagement = ({ props, navigation }) => {
    var [data, setData] = useState({value:[]})
    var [dataBackup, setDataBackup] = useState({value:[]})
    var [searchText, setSearchText] = useState({value:''})
    var [dialogVisibility, setdialogVisibility] = useState(false)
    var [contentSelected, setContentSelected] = useState({})
    var [showLoader, setLoaderVisibility] = useState(true)
    const [loading, setloading] = useState(true)
    var [alertParameters, setAlertParameters] = useState({message:'', backgroundColor: '', icon: '', iconColor: ''})
    var [yesButtonLoading, setButtonLoading] = useState(false)
    var [showAlert, setAlertVisibility] = useState(false)

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
                <View style = {{flex: 1, flexDirection: 'row', marginLeft: '10%', marginTop: "5%",marginBottom: '8%'}}>
                    <View style = {{flex: 0.2,justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image style={styles.imagePopup} source={require('../assets/content-type/web.png')} />
                    </View>
                    <View style = {{flex: 0.8,justifyContent: 'center'}}>
                        <Text style={styles.popupText}> {contentSelected.contentURL}</Text>
                    </View>
                </View>
                <View style = {{flex: 1, flexDirection: 'row', marginLeft: '10%', marginBottom: '8%'}}>
                    <View style = {{flex: 0.2,justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image style={styles.imagePopup} source={require('../assets/content-type/file.png')} />
                    </View>
                    <View style = {{flex: 0.8, justifyContent: 'center'}}>
                        <Text style={styles.popupText}> {contentSelected.contentDesc}</Text>
                    </View>
                </View>
                <View style = {{flex: 1, flexDirection: 'row',  marginLeft: '10%', marginBottom: '10%'}}>
                    <View style = {{flex: 0.2,justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image style={styles.imagePopup} source={require('../assets/content-type/play.png')} />
                    </View>
                    <View style = {{flex: 0.8, justifyContent: 'center'}}>
                        <Text style={styles.popupText}> {contentSelected.contentType}</Text>
                    </View>
                </View>
                <Text style={{flex:1, width: "100%"}}></Text>
                <View style = {{flex:1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey'}}>
                    <PaperButton mode = "contained" labelStyle = {styles.text} style={styles.noButton} onPress = {() => {setdialogVisibility(false)}}>No</PaperButton>
                    <PaperButton mode = "contained"  labelStyle = {styles.text} style={styles.yesButton} onPress = {() => deleteContent()} loading = {yesButtonLoading}>Yes</PaperButton>
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

    useEffect(() => {
              fetch(config.baseurl+"/api/v1/content/details")
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
                    console.log("contents - ");
                    data.value.map((j,index)=>(
                    console.log(j.contentDesc + ", views - "+ j.contentViews)
                    ));
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

          },[data])

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


    const searchContent = (text) => {
        setSearchText({value: text})
        searchText = text.trim().toLowerCase();
        if (!searchText == "") {
            var filteredData = dataBackup.value.filter(l => {
                return l.contentDesc.trim().toLowerCase().startsWith( searchText );
            });
            setData({value: filteredData})
        }
        else {
            setData({value: dataBackup.value})
        }
    }

    const deleteContentHandler = (index) => {
            let contentDetails = {...data.value[index], "index": index}
            setContentSelected(contentDetails)
            setdialogVisibility(true)
    }

    const removeDeletedContent = () => {
            console.log('delete content in UI');
            let UpdatedDataContentList = [...data.value]
            let updatedBackupContentList = [...dataBackup.value]
            let backupIndex = dataBackup.value.findIndex((contentDetails)=>{
              return contentDetails.contentDesc == contentSelected.contentDesc
            })
            UpdatedDataContentList.splice(contentSelected.index,1)
            updatedBackupContentList.splice(backupIndex,1)
            setData({value: UpdatedDataContentList})
            setDataBackup({value: updatedBackupContentList})
    }

    const deleteContent = () => {
          console.log('handle submit method');
          console.log( 'content url : ' + contentSelected.contentURL)
          setButtonLoading(true)
          fetch(config.baseurl+'/api/v1/content/delete', {
             method: 'POST',
             body: JSON.stringify({
             contentURL: contentSelected.contentURL,
             contentType: contentSelected.contentType,
             contentDesc: contentSelected.contentDesc,
             assessmentURL: contentSelected.assessmentURL
          }),
          headers: {
                     "Content-type": "application/json; charset=UTF-8"
          }})
           .then(response => {
                console.log('reponse received with status - ' + response.status);
                setButtonLoading(false)
                setdialogVisibility(false)
               if (response.status == 200 ){
                        alert("Successfully deleted content");
                        setAlertParameters({message: "Request sent successfully", backgroundColor: '##b6e0bc', icon: 'check-circle', iconColor: '#146110'})
                        removeDeletedContent();
               }
               else {
                         setAlertParameters({message: "Request not sent, Internal Server Error", backgroundColor: '#e6c8c8', icon: 'error', iconColor: '#611010'})
                     }
                     setAlertVisibility(true)
               })
               .catch(err => {
                     setButtonLoading(false)
                     setdialogVisibility(false)
                     console.log("error occurred internally");
                 })
    }
     const isDisabled = (val) => {
            if(val == "" || val == null)
                return true;
            return false;
      }
     const getIconName = (name) => {
        if(name == "Video")     return require('../assets/content-type/play.png');
        if(name == "Document")  return require('../assets/content-type/file.png');
        if(name == "Website")   return require('../assets/content-type/web.png');
        else return require('../assets/content-type/play.png');
  }
  const incrementCountAndRedirect = (content) => {
    console.log("content before redirection - " + content.contentDesc);
    Linking.openURL(content.contentURL)
    fetch(config.baseurl+'/api/v1/content/incrementViews', {
                 method: 'POST',
                 body: JSON.stringify({
                 contentId : content.contentId,
                 contentURL: contentSelected.contentURL,
                 contentType: contentSelected.contentType,
                 contentDesc: contentSelected.contentDesc,
                 assessmentURL: contentSelected.assessmentURL
              }),
              headers: {
                         "Content-type": "application/json; charset=UTF-8"
              }})
               .then(response => {
                    console.log('reponse received with status - ' + response.status)
                    })
                   .catch(err => {
                         console.log("error occurred internally")
                     })
  }


    return (
        <View>
        <ScrollView>
        <StatusBar backgroundColor = '#262629' barStyle = 'light-content'></StatusBar>
        <SearchBar
             containerStyle = {{backgroundColor: "#151517"}}
             inputContainerStyle = {{marginLeft: '10%',width:'88%', marginTop: '2%', marginBottom: '2%', backgroundColor: '#202024'}}
             clearIcon
             placeholder='Search Content'
            onChangeText={text=>searchContent(text)}
            value = {searchText.value}
        />
        <TouchableOpacity onPress={() => {navigation.navigate("AdminHomeScreen")}} style={styles.backContainer}>
               <Image style={styles.backImage} source={require('../assets/arrow_back.png')} />
        </TouchableOpacity>

            {loader}
            {Alert}
            {data.value.map((j,index)=>(
            <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Card key={index} wrapperStyle={styles.content} containerStyle={styles.container} >
                    <View style={styles.column}>
                       <TouchableOpacity onPress={ () => {incrementCountAndRedirect(j)}} >
                          <Image source={getIconName(j.contentType)}  style={styles.image}/>
                          <View style={{flex:1, flexDirection: 'row'}}>
                            <Image source={require('../assets/content-type/eye_black.png')} style={{ width:10, height:10, justifyContent:'center', alignItems:'center'}}/>
                            <Text style = {styles.viewText}>{j.contentViews}</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.popupText}>{j.contentDesc}</Text>
                    <TouchableOpacity onPress={()=>{j.assessmentURL? Linking.openURL(j.assessmentURL) : Linking.openURL()}}>
                    <Button mode="contained" containerStyle={styles.icon} disabled = {isDisabled(j.assessmentURL)} >Quiz</Button>
                    </TouchableOpacity>
                    <Icon name='delete'  containerStyle={styles.iconDELETE} size={40} onPress={() => deleteContentHandler(index)}/>
                </Card>
            </View>
            ))}
            <View style = {{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Button mode="contained" style={styles.addContent} onPress={() => navigation.navigate('AdminAddContentScreen')} > Add Content </Button>
            </View>
            </ScrollView>
            {showTouchOpacity}
            {showPopup}
         </View>
    );
};

//StyleSheet object
const styles = StyleSheet.create({
    image: {
          width: 40,
          height: 40,
    },
    imagePopup: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width:'80%',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 25,
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
    iconDelete: {
        alignItems:'center',
        justifyContent:'center',
        marginRight: '2%',
        marginLeft: '5%',
    },
    icon: {
        alignItems:'center',
        justifyContent:'center',
    },
    addContent: {
        width:'80%',
        margin: '2%',
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        color: 'white'
  },
  yesButton: {
      flex: 0.5,
      margin: '3%',
      backgroundColor: '#3f9e3a'
    },
    noButton: {
      flex: 0.5,
       margin: '3%',
      backgroundColor: '#e35b5b'
    },
    popupContainer: {
        borderRadius: 20,
        position: 'absolute',
        zIndex: 5,
        flex: 1,
        width: '70%',
        marginTop: '10%',
        marginHorizontal: '15%',
        flexDirection: 'column',
        padding: '3%',
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: {width:2, height: 2},
        borderBottomWidth: 1,
        borderBottomColor: '#1c3466',
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
        borderBottomColor: 'grey',
      },
    viewText:{
        flex: 0.5,
        fontSize: 10
    },
    popupText: {
        flex: 1,
        fontSize: 18,
        flexDirection: 'column',
        marginLeft: "1%",
        color:'#426db3',
        textAlign: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexShrink: 1
      },
    column:{
        flex: 1,
        flexDirection: 'column',
//        paddingLeft: 10,

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
        top: 22,
        left: 10,
      },
      backImage: {
        width: 24,
        height: 24,
        tintColor: "#86939e"
      },
});

const mapStateToProps = state => {
return {
        content: state.auth.content
    }
};

export default connect(mapStateToProps)(memo(AdminContentManagement));
