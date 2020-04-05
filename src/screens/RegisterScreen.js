import React, { memo, useState,Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import DatePicker from 'react-date-picker';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import { connect } from 'react-redux';

//import SingleDatePicker from 'single-datepicker';
//import datepicker from 'js-datepicker'
import {
    nameValidator,
    studentIDValidator,
    phoneValidator,
    dateOfBirthValidator,
    emailValidator,
    centerNameValidator
} from '../core/utils';
const options=[
            {label: 'select a center Name', value: ''},
            {label:'center1', value:'center1',},
            {label:'center2', value:'center2',},
            ];
//const picker = datepicker(document.querySelector('.date') );
/*export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {date: "15-05-2018"}
  }
}*/
const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState({ value: '', error: '' });
  const [studentID, setStudentID] = useState({value:'', error: ''});
  const [phone, setPhone] = useState({value:'', error: ''});
  const [dateOfBirth, setDateOfBirth] = useState({value:'', error: ''});
  const [email, setEmail] = useState({ value: '', error: '' });
  const [centerName, setCenterName] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const studentIDError = studentIDValidator(studentID.value);
    const phoneError = phoneValidator(phone.value);
    const dateOfBirthError = dateOfBirthValidator(dateOfBirth.value);
    const emailError = emailValidator(email.value);
    const centerNameError = centerNameValidator(centerName.value);
    // const passwordError = passwordValidator(password.value);

    if (nameError || studentIDError || phoneError || dateOfBirthError || emailError || centerNameError) {
      setName({ ...name, error: nameError });
      setStudentID({...studentID, error: studentIDError});
      setPhone({...phone, error: phoneError});
      setDateOfBirth({...dateOfBirth, error: dateOfBirthError});
      setEmail({ ...email, error: emailError });
      setCenterName({ ...centerName, error: centerNameError });
      // setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('SignUpSuccessScreen');
  };
  const pickerStyle=StyleSheet.create({
      inputAndroid: {
          backgroundColor: theme.colors.surface,
          paddingTop: 16,
          paddingBottom: 16,
         // paddingLeft: 8,
          paddingRight: 4,
          borderRadius: 4,
          width: '100%',
          marginVertical: 12,
          color: '#999',
          borderColor: '#808080'
      }
  });

  return (
  <ScrollView>
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <Logo />
      <Header>Create Account</Header>
      <View style={styles.formStyle}>
      <form>
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />

            <TextInput
                label="Student ID"
                returnKeyType="next"
                value={studentID.value}
                onChangeText={text => setStudentID({ value: text, error: '' })}
                error={!!studentID.error}
                errorText={studentID.error}
            />

            <TextInput
                label="Phone"
                returnKeyType="next"
                value={phone.value}
                onChangeText={text => setPhone({ value: text, error: '' })}
                error={!!phone.error}
                errorText={phone.error}
            />
         {/* <DatePicker
              selected={this.state.date}
              onChange={date => setDateOfBirth({value:date,error:''})}
          />*/}
           {/* <DatePicker
                name="DOB"
                onDateChange={date => setDateOfBirth({value:date,error:''})}
                //label="Date of Birth"
                //returnKeyType="next"
                //value={dateOfBirth.value}
                style={{width: '100%'}}
                date={dateOfBirth.value}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1980-05-01"
                //maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                //error={!!dateOfBirth.error}
                //errorText={dateOfBirth.error}
            />*/}
            <TextInput
                label="Date Of Birth"
                returnKeyType="next"
                value={dateOfBirth.value}
                onChangeText={text => setDateOfBirth({ value: text, error: '' })}
                error={!!dateOfBirth.error}
                errorText={dateOfBirth.error}
            />

          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />


          <View style={styles.container}>
          <RNPickerSelect
               useNativeAndroidPickerStyle = 'false'
                placeholder = {{
                    label : 'Select a Center Name',
                    value : null
                }}
                returnKeyType="next"
                options={options}
                value = {centerName.value}
                error={!!centerName.error}
                errorText={centerName.error}
                style={pickerStyle}
                onValueChange={(value) => console.log(value)}
                items={options}
                  />
           {centerName.error ? <Text style={styles.error}>{centerName.error}</Text> : null}
           </View>
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>
     </form>
     </View>
      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  formStyle: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
   button: {
      marginTop: 24,
    },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
   container: {
          width: '100%',
          flex: 1,
          flexDirection: 'row',
    }
});


export default memo(RegisterScreen);
