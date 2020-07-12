import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { Component } from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {updateProfile} from '../actions/userProfile';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {
  emailValidator,
  mobileValidator,
  nameValidator,
  stateValidator,
  cityValidator,
} from '../core/utils';

class ProfileTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['Company Name', 'Profile', 'From', 'To'],
      DataTable: [
        ['Lemon Tree Hotel', 'FrontDesk Executive', 'Jan-19', 'Aug-19'],
        ['Skywalk Hospitality', 'DataEntry operator', 'Sep-19', 'Jan-20'],
      ],
    };
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={state.HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={state.DataTable} textStyle={styles.TableText} />
        </Table>
      </View>
    );
  }
}

const ProfileScreen = (props) => {
  const [name, setName] = useState({ value: props.user.firstName + ' ' + props.user.lastName, error: '' });
  const [email, setEmail] = useState({ value: props.user.email, error: '' });
  const [mobile, setMobile] = useState({ value: props.user.mobile, error: '' });
  const [state, setState] = useState({ value: props.user.centerName, error: '' });
  const [city, setCity] = useState({ value: props.user.cityName, error: '' });
  const [CurrentCompany, setCurrentCompany] = useState({ value: props.user.currentOrganization, error: '' });

  const _onSignUpPressed = () => {
    /*const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const mobileError = mobileValidator(mobile.value);
    const stateError = stateValidator(state.value);
    const cityError = cityValidator(city.value);

    if (emailError || mobileError || nameError || stateError || cityError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setMobile({ ...mobile, error: mobileError });
      setState({ ...state, error: stateError });
      setCity({ ...city, error: cityError });
      return;*/
      const userProfile = {
        email: props.user.emailId,
        name: props.user.firstName + ' ' + props.user.lastName,
        mobile: props.user.mobile,
        state: props.user.centerName,
        city: props.user.cityName,
        CurrentCompany: props.user.currentOrganization

      };
      this.props.updateProfile({userProfile});
    }

    const _onPasswordChange = () => {
      console.log('on password change method');
      props.navigation.navigate('ChangePasswordScreen');
    };

    //navigation.navigate('ProfileScreen');
  

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => props.navigation.navigate('UserHomeScreen')} />
        <Logo />
        <Header>Dr. Reddy's Foundation</Header>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Mobile"
          returnKeyType="next"
          value={mobile.value}
          onChangeText={text => setMobile({ value: text, error: '' })}
          error={!!mobile.error}
          errorText={mobile.error}
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

        <TextInput
          label="CenterName"
          returnKeyType="next"
          value={state.value}
          onChangeText={text => setState({ value: text, error: '' })}
          error={!!state.error}
          errorText={state.error}
        />

        <TextInput
          label="City"
          returnKeyType="next"
          value={city.value}
          onChangeText={text => setCity({ value: text, error: '' })}
          error={!!city.error}
          errorText={city.error}
        />

<TextInput
          label="Current Company"
          returnKeyType="next"
          value={CurrentCompany.value}
          onChangeText={text => setCurrentCompany({ value: text, error: '' })}
          error={!!CurrentCompany.error}
          errorText={CurrentCompany.error}
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Save
        </Button>

        <Button
          mode="contained"
          onPress={_onPasswordChange}
          style={styles.button}
        >            Change Password
          </Button>

      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
/* const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
  };
}; */
//{ authInputChange, login } mapDispatchToProps
export default connect(mapStateToProps, {  updateProfile })(
  ProfileScreen
);


