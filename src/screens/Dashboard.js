import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('JobSearch')}>
      Job Search
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('ProfileScreen')}>
      Edit Profile
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('HelpScreen')}>
      Help Page
    </Button>
    <Button mode="contained" onPress={() => navigation.navigate('HomeScreen')}>
      Logout
    </Button>
  </Background>
);
export default memo(Dashboard);
