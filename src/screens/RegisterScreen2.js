import React, { memo, useState, useEffect,Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
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
import { onboardInputChange,signup } from '../actions';
import Paragraph from '../components/Paragraph';

import {
  nameValidator,
  studentIDValidator,
  phoneValidator,
  dateOfBirthValidator,
  emailValidator,
  centerNameValidator,
} from '../core/utils';
const options = [
  { label: 'Panjagutta', value: 'Panjagutta' },
  { label: 'Nalgonda', value: 'Nalgonda' },
  { label: 'Medchal', value: 'Medchal' },
  { label: 'Patancheru', value: 'Patancheru' },
];
class RegisterScreen2 extends Component {

    state={
          name:{value:'',error:''},
          studentID:{value:'',error:''},
          phone:{value:'',error:''},
          dateOfBirth:{value:'',error:''},
          email:{value:'',error:''},
          centerName:{value:'',error:''},
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        //console.log(nextProps.loading);
        console.log(nextProps.signup_valid);
        console.log(nextProps.error);
        if(nextProps.signup_valid==true){
        //if (!_.isEmpty(nextProps.user)) {
            this.props.navigation.navigate('SignUpSuccessScreen', nextProps.user);
        }
    }

    showButton(){
        console.log(this.props.loading);
      if (this.props.loading) {
        return (
          <View>
            <ActivityIndicator size="small" />
          </View>
        );
      } else {
        return (
          <Button mode="contained" onPress={this.onSignUpPressed}>
            Signup
          </Button>
        );
      }
    }

    showError() {
      if (this.props.error) {
        return <Paragraph>{this.props.error}</Paragraph>;
      }
    }

  onSignUpPressed = () => {
       console.log('fref');
       console.log(this.state.name.value);
       const nameError = nameValidator(this.state.name.value);
       const studentIDError = studentIDValidator(this.state.studentID.value);
       const phoneError = phoneValidator(this.state.phone.value);
       const dateOfBirthError = dateOfBirthValidator(this.state.dateOfBirth.value);
       const emailError = emailValidator(this.state.email.value);
       const centerNameError = centerNameValidator(this.state.centerName.value);
       // const passwordError = passwordValidator(password.value);
       console.log('onsignup');
       if (
         nameError ||
         studentIDError ||
         phoneError ||
         dateOfBirthError ||
         emailError ||
         centerNameError
       ) {
         this.setState({
            name:{...this.state.name.value,error:nameError},
            studentID:{error:studentIDError},
            phone:{error:phoneError},
            dateOfBirth:{error:dateOfBirthError},
            email:{error:emailError},
            centerName:{error:centerNameError},
         });
         return ;
       }
       console.log('before redux');
       this.props.signup(this.state);

  };

  render(){
    return (
        <ScrollView>
          <Background>
            <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />
            <Logo />
            <Header>Create Account</Header>
            <View style={styles.formStyle}>

                <TextInput
                  label="Name"
                  returnKeyType="next"
                  value={this.state.name.value}
                  onChangeText={text => this.setState({ name:{value:text,error:''} })}
                  //this.props.onboardInputChange({ field: 'name', value: text })}

                  error={!!this.state.name.error}
                  errorText={this.state.name.error}
                />

                <TextInput
                  label="Student ID"
                  returnKeyType="next"
                  value={this.state.studentID.value}
                  onChangeText={text => this.setState({ studentID:{value: text, error: ''} })}
                  error={!!this.state.studentID.error}
                  errorText={this.state.studentID.error}
                />
                <TextInput
                  label="Date Of Birth"
                  returnKeyType="next"
                  value={this.state.dateOfBirth.value}
                  onChangeText={text => this.setState({ dateOfBirth:{value: text, error: '' }})}
                  error={!!this.state.dateOfBirth.error}
                  errorText={this.state.dateOfBirth.error}
                />
                <TextInput
                  label="Mobile"
                  returnKeyType="next"
                  value={this.state.phone.value}
                  onChangeText={text => this.setState({ phone:{value: text, error: '' }})}
                  error={!!this.state.phone.error}
                  errorText={this.state.phone.error}
                />

                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={this.state.email.value}
                  onChangeText={text => this.setState({ email:{value: text, error: '' }})}
                  error={!!this.state.email.error}
                  errorText={this.state.email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />

                <View style={styles.container}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle="false"
                    placeholder={{
                      label: 'Select a Center Name',
                      value: null,
                    }}
                    value={this.state.centerName.value}
                    error={!!this.state.centerName.error}
                    errorText={this.state.centerName.error}
                    style={pickerStyle}
                    onValueChange={value => console.log(value)}
                    items={options}
                  />
                  {this.state.centerName.error ? (
                    <Text style={styles.error}>{this.state.centerName.error}</Text>
                  ) : null}
                </View>
                <Button mode="contained" onPress={this.onSignUpPressed}>
                    Signup
                  </Button>
            </View>
            {this.showError}
            {this.showButton}
            <View style={styles.row}>
              <Text style={styles.label}>Already have an account? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </Background>
        </ScrollView>
      );
  }
}
const pickerStyle = StyleSheet.create({
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
      borderColor: '#808080',
    },
  });

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
  },
});

const mapStateToProps = state => {
  return {
    name: state.onboard.name,
    studentID: state.onboard.studentID,
    phone: state.onboard.phone,
    dateOfBirth: state.onboard.dateOfBirth,
    email: state.onboard.email,
    centerName: state.onboard.centerName,
    user: state.onboard.user,
    error: state.onboard.error,
    loading: state.onboard.loading,
    signup_valid: state.onboard.signup_valid
  };
};

export default connect(mapStateToProps, { onboardInputChange,signup })(
  RegisterScreen2
);