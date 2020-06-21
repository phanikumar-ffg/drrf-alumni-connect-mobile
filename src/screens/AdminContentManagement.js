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

import { ScrollView, View, Text, Image } from 'react-native'
import { Card, ListItem, Icon, SearchBar } from 'react-native-elements'
import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { connect } from 'react-redux';
import {authContentGet, getContent } from '../actions';
import {authContentDelete, deleteContent} from '../actions';

const AdminContentManagement = ({ navigation }) => {
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
                 darkTheme
                 clearIcon
                 placeholder='Search Content'
                onChangeText={text=>searchContent(text)}
                value = {searchText.value}
            />
            {data.value.map(j=>(
            <View style={styles.viewStyle}>
            <Card
            key={j.content_id}
            wrapperStyle={styles.content}
            containerStyle={{width:'80%'}}
            >
             <a href={j.content_url}>
                <Image source={require('../assets/video-icon.png')} style={styles.image} to={j.assessment_url}/>
             </a>
             <Text>
                 {j.content_title}
             </Text>
             <a href={j.assessment_url} class="button">
                <Button mode="contained" >Quiz</Button>
             </a>

            </Card>
             <Icon name='delete'  containerStyle={styles.icon} size={40} />
            </View>
             ))}

            <Button mode="contained"  mode="contained"
                onPress={() => navigation.navigate('AdminAddContentScreen')} >
                Add Content
            </Button>
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
    url: state.auth.url,
    contentType: state.auth.contentType,
    description: state.auth.description,
    assessURL: state.auth.assessURL,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps,{authContentGet, deleteContent, authContentDelete, deleteContent})(AdminContentManagement);