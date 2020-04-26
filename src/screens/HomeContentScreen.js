const contents = [
{
    content_id: 1,
    content_title: 'React Native Tutorials',
    content_url: 'https://www.youtube.com/watch?v=qSRrxpdMpVc',
    assessment_url: 'https://www.google.com/search?q=google+forms&oq=google+form&aqs=chrome.0.0j69i57j0l6.1745j0j7&sourceid=chrome&ie=UTF-8'
},
{
    content_id: 2,
    content_title: 'Angular Tutorials',
    content_url: 'https://www.youtube.com/watch?v=0eWrpsCLMJQ&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ',
    assessment_url: 'https://www.google.com/search?q=google+forms&oq=google+form&aqs=chrome.0.0j69i57j0l6.1745j0j7&sourceid=chrome&ie=UTF-8'
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

const HomeContentScreen = ({ navigation }) => {
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
            <Card
            key={j.content_id}
            wrapperStyle={styles.content}
            >
                <Image source={require('../assets/video-icon.png')} style={styles.image} href={j.assessment_url}/>
                <Text>
                    {j.content_title}
                </Text>
                <a href={j.assessment_url} class="button">Assessment</a>
            </Card>
            ))}
            <a href="https://www.youtube.com/watch?v=qSRrxpdMpVc" class="button">Continue</a>
            <Button mode="contained" onclick="location.href = 'https://www.youtube.com/watch?v=qSRrxpdMpVc';" type="button">Assessment</Button>
        </ScrollView>

      );
};
const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  image: {
      width: 40,
      height: 40,
  },
  content: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default memo(HomeContentScreen);
