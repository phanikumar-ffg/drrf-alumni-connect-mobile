import React, { memo, useState,Component } from 'react';
import { Text, StyleSheet, TouchableOpacity,ActivityIndicator,View } from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import HelpScreen from "./HelpScreen";
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { authInputChange,forgotPwd } from '../actions';
import Paragraph from '../components/Paragraph';

class ForgotPasswordScreen extends React.Component {

    componentWillReceiveProps(nextProps) {

      if (!_.isEmpty(nextProps)) {
      if(nextProps.request_success){
          this.props.navigation.navigate('ForgotPasswordMsgScreen');
          }
      }
    }

  showButton(){
    if (this.props.fgtPwd_loading) {
      return (
        <View>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return (
          <Button mode="contained" onPress={this.onSendPressed} style={styles.button}>
            Submit
          </Button>
      );
    }
  }

  showError() {
     if (this.props.error) {
       return <Paragraph>{this.props.error}</Paragraph>;
     }
     else{
       return ;
     }
  }

  onSendPressed = () => {
    const emailError = emailValidator(this.props.email.value);

    if (emailError) {
        this.props.authInputChange({field:'email',value:{value:this.props.authInputChange.value,error:emailError}});
      return;
    }
    this.props.forgotPwd(this.props.email.value);
  };

  render(){
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="Enter registered Email ID"
        returnKeyType="done"
        value={this.props.email.value}
        onChangeText={text => //this.setState({ email:{value: text, error: '' }})}
        this.props.authInputChange({ field: 'email', value: {value:text,error:'' } })}
        error={!!this.props.email.error}
        errorText={this.props.email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
        {this.showError()}
        {this.showButton()}


      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

    </Background>
  );
  }
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    email: state.getPwd.email,
    error: state.getPwd.error,
    fgtPwd_loading: state.getPwd.fgtPwd_loading,
    request_success: state.getPwd.request_success,
  };
};

//export default memo(ForgotPasswordScreen);

export default connect(mapStateToProps, {forgotPwd,authInputChange })(
  ForgotPasswordScreen
);
