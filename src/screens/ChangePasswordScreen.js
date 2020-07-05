import React, { memo, connect,useState } from 'react';
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
  passwordValidator,
  changePasswordValidator
} from '../core/utils';

const ChangePasswordScreen = ({ navigation }) => {
  class ProfileTable extends Component {
    constructor(props) {
      super(props);
    }
  }

  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    
    const passwordError = changePasswordValidator(password);
    if (passwordError || !passwordError2){
      setPassword({password, error: passwordError });
      return;
    }
    // TODO- SET DRFID HERE !
    const updatePassword={
      newPassword: password,
      drfId: drfid
    };
    this.props.updatePassword({updatePassword});
    navigation.navigate('ProfileScreen');
  };

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate('ProfileScreen')} />
        <Logo />
        <Header>Dr. Reddy's Foundation</Header>
  
        <TextInput
          label="Change Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />        
  
        <Button
          mode="contained"
          onPress={_onSendPressed}
          style={styles.button}
        >            Submit
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


export default ChangePasswordScreen;
 /*const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()),
  };
}; 
{ authInputChange, login } mapDispatchToProps
export default connect(mapStateToProps, { authInputChange, updateProfile })(
  ProfileScreen
);
*/

