import React, { memo } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput  from '../components/TextInput';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ScrollView} from 'react-native';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';

const options=[
    {value:'center1',},
    {value:'center2',},
    ];

 const  AdminJobEntryScreen = ({ navigation }) => (
    <ScrollView >
    <Background>
    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
        <Logo />
        <form>
        <Text style={styles.text}>Job ID</Text>
        <TextInput style={styles.textInput}  />
        <Text style={styles.text}>Company Name</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.text}>Role/Designation</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.text}>Job Description</Text>
        <TextInput style={styles.textInput}  />
        <Text style={styles.text}>City</Text>
        <View style={styles.container}>
        <Dropdown style={styles.input}
        label="City"
         returnKeyType="next"
         options={options}
         placeholder="Select City Name"/>
        </View>
        <Text style={styles.text}>State</Text>
        <View style={styles.container}>
        <Dropdown
            label="State"
            style={styles.input}
            returnKeyType="next"
            options={options}
            placeholder="Select State Name"
          />
        </View>
        <Text style={styles.text}>Salary Scale</Text>
        <TextInput style={styles.textInput}  />
        <Button mode="contained" style={styles.saveButton}>
            SAVE
        </Button>
        <Button mode="contained" style={styles.deleteButton} onPress={() => navigation.navigate('LoginScreen')}>
            DELETE
        </Button>
        </form>
    </Background>
    </ScrollView>
    );
const styles = StyleSheet.create({
    text:{
        fontWeight : 'bold',
        fontSize:12,
        marginRight : 10,
        marginTop: 20
    },
    container: {
        width: '84%',
        marginVertical: 12,
        marginLeft:50,
        marginTop:-20
      },
    dropdown:{
        width:100,
        height:40,
        marginTop:-20,
        marginLeft:50
    },
    textInput:{
        marginTop: -45,
        marginLeft:50
    },
    saveButton:{
        marginLeft:101,
        width:92,
        height:30
    },
    deleteButton:{
        marginTop:-40,
        marginLeft:200,
        width:100,
        height:30
    },
    input: {
        backgroundColor: theme.colors.surface,
        marginLeft:70
      }
});
export default memo(AdminJobEntryScreen);