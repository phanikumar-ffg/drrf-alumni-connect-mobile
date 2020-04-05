import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput  from '../components/TextInput';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../core/theme";
import BackButton from '../components/BackButton';

const Dashboard = ({ navigation }) => (
    <Background>
        <BackButton goBack={() => navigation.navigate('Dashboard')} />
        <Logo />
        <Header>Static Content</Header>
    </Background>
);

export default memo(Dashboard);