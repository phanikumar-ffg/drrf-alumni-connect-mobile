import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
    nameValidator,
    studentIDValidator,
    phoneValidator,
    dateOfBirthValidator,
    emailValidator
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [studentID, setStudentID] = useState({value:'', error: ''});
  const [phone, setPhone] = useState({value:'', error: ''});
  const [dateOfBirth, setdateOfBirth] = useState({value:'', error: ''});
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const studentIDError = studentIDValidator(studentID.value);
    const phoneError = phoneValidator(phone.value);
    const dateOfBirthError = dateOfBirthValidator(dateOfBirth.value);
    const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);

    if (nameError || studentIDError || phoneError || dateOfBirthError || emailError) {
      setName({ ...name, error: nameError });
      setStudentID({...studentID, error: studentIDError});
      setPhone({...phone, error: setPhone});
      setdateOfBirth({...dateOfBirth, error: setdateOfBirth});
      setEmail({ ...email, error: emailError });
      // setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Create Account</Header>
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

        <TextInput
            label="Date of Birth"
            returnKeyType="next"
            value={dateOfBirth.value}
            onChangeText={text => setdateOfBirth({ value: text, error: '' })}
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

     {/* <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
*/}
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>
        </form>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
