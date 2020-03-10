import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

class Dashboard extends React.Component {
  componentDidMount() {
    // const { user } = this.props.navigation.state.user;
    //console.debug(user);
  }
  render() {
    return (
      <Background>
        <Logo />
        <Header>Let’s start</Header>
        <Paragraph>Hi welcome to Dr Reddy's Foundation.</Paragraph>
        <Button
          mode="outlined"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
          Logout
        </Button>
      </Background>
    );
  }
}
export default memo(Dashboard);
