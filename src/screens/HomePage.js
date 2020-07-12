const contents = [
{
    content_id: 1,
    content_title: 'React Native Tutorials',
    content_url: 'https://www.youtube.com/watch?v=qSRrxpdMpVc',
    assessment_url: 'https://www.google.co.in/'
},
{
    content_id: 2,
    content_title: 'Excel Tutorials',
    content_url: '',
    assessment_url: 'https://www.google.co.in/'
},
{
    content_id: 3,
    content_title: 'Angular Tutorials',
    content_url: 'https://www.youtube.com/watch?v=0eWrpsCLMJQ&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ',
    assessment_url: 'https://www.google.co.in/'
}
]

import React, { memo, useState } from 'react';
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
import Background from '../components/Background';
import Logo from '../components/Logo';
import { theme } from '../core/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Button from '../components/Button';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { Component } from 'react';
import Header from '../components/Header';

import PropTypes from 'prop-types';

const HomePage= ({ navigation }) => {
    var [data, setData] = useState({value:contents})
    const [dataBackup, setDataBackup] = useState({value:contents})
    var [searchText, setSearchText] = useState({value:''})

    const searchContent = (text) => {
     searchText = text
     console.log(text)
     setSearchText({value: searchText})
     searchText = searchText.trim().toLowerCase();
     setData({value: dataBackup.value})
     if (!searchText == "") {
         console.log(searchText)
         data = data.value.filter(l => {
            return l.content_title.trim().toLowerCase().startsWith( searchText );
         });
         console.log(data)
        setData({value: data})
       }
    }
    return (
<ScrollView style={{marginTop:28}}>
            <SearchBar
                 inputContainerStyle = {{marginLeft: '10%',width:'88%'}}
                 darkTheme
                 clearIcon
                 placeholder='Search Content'
                onChangeText={text=>searchContent(text)}
                value = {searchText.value}
            />
            <TouchableOpacity onPress={() => {navigation.navigate("UserHomeScreen")}} style={styles.backContainer}>
                   <Image style={styles.backImage} source={require('../assets/arrow_back.png')} />
            </TouchableOpacity>
            {data.value.map(j=>(
            <Card
            key={j.content_id}
            wrapperStyle={styles.content}
            >
             <a href={j.content_url}>
                <Image source={require('../assets/video-icon.png')} style={styles.image} to={j.assessment_url}/>
             </a>
             <Text>
                 {j.content_title}
             </Text>
             <a href={j.assessment_url} class="button">
                <Button mode="contained">Quiz</Button>
             </a>
            </Card>
            ))}
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
      alignItems: 'center'
    },
    backContainer: {
      position: 'absolute',
      top: 20 + getStatusBarHeight(),
      left: 10,
    },
    backImage: {
      width: 24,
      height: 24,
      tintColor: "#86939e"
    },
});
export default memo(HomePage);
