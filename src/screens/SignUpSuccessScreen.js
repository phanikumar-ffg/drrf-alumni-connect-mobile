import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const SignUpSuccessScreen = ({ navigation }) => (
    <Background>
        <Logo />
        <Header>Let’s start</Header>
           <Paragraph> Your Login ID and password will be sent to register email-id and mobile number.</Paragraph>
           <Paragraph> If you didnt get details in 5 min, please contact admin</Paragraph>
           <Paragraph >Admin emil id:</Paragraph>
           <Paragraph>Admin phone no:</Paragraph>
        <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
            Login
        </Button>
    </Background>
);

export default memo(SignUpSuccessScreen);
