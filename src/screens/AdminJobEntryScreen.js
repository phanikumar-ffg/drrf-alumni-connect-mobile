import React, { memo } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput  from '../components/TextInput';
import {StyleSheet,  View, Alert} from "react-native";
import {ScrollView} from 'react-native';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import RNPickerSelect from 'react-native-picker-select';
import { Paragraph } from 'react-native-paper';

 const  AdminJobEntryScreen = ({ navigation }) => {
    const  _onSave = ()=>{
        return(
         //   <Alert>Saved Successfully</Alert>
           <View style= {styles.container}>
               <Paragraph>Saved Successfully</Paragraph>
           </View>
        )
    };
     return(
    <ScrollView >
    <Background>
    <BackButton goBack={() => navigation.navigate('LoginScreen')} />
        <Logo />
        <Header>New Job Entry - Admin</Header>
        <TextInput label="Job ID"  />
        
        <TextInput label="Company Name" />
       
        <TextInput label="Role/Designation"  />
        
        <TextInput label="Job Description"   />
        <View style={styles.container}>
<RNPickerSelect
     placeholder={{
        label:"Select a City",
        value:null,
     }}
    onValueChange={(value) => console.log(value)}
    items={[
         { label: 'Hyderabad', value: 'Hyderabad' },
         { label: 'Bangalore', value: 'Bangalore' },
         { label: 'Chennai', value: 'Chennai' },
         { label: 'Kolkata', value: 'Kolkata' },
         { label: 'Delhi', value:'Delhi' },
         { label: 'Mumbai', value:'Mumbai'},
     ]}
    style={pickerStyle}
/>
</View>
<View style={styles.container}>
<RNPickerSelect
     placeholder={{
        label:"Select a State",
        value:null,
     }}
    onValueChange={(value) => console.log(value)}
    items={[
         { label: 'Telangana', value: 'Telangana' },
         { label: 'Karnataka', value: 'Karnataka' },
         { label: 'Tamil Nadu', value: 'Tamil Nadu' },
         { label: 'West Bengal', value:'West Bengal' },
         { label: 'Maharastra', value:'Maharastra' },
     ]}
    style={pickerStyle}
/>
</View>
        <TextInput label="Salary Scale"/>
        <Button mode="contained" onPress={_onSave} >
            SAVE
        </Button>
        <Button mode="contained"  onPress={() => navigation.navigate('AdminJobEntryScreen')}>
            RESET
        </Button>
       
    </Background>
    </ScrollView>
    );
 }
const styles = StyleSheet.create({

    text:{
        fontWeight : 'bold',
        fontSize:12,
        marginRight : 10,
        marginTop: 20
    },
    container: {
        width: '100%',
        paddingTop:17
      }
});
const pickerStyle=StyleSheet.create({
    inputAndroid: {
        backgroundColor: theme.colors.surface,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        borderRadius: 4,
        borderColor: '#808080'
    },
    placeholder: {
        placeholderColor: '#808080',
    }
});

export default memo(AdminJobEntryScreen);

