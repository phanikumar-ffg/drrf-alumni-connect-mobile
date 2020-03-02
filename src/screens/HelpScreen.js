import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput  from '../components/TextInput';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Select from 'react-native';
import {emailValidator} from "../core/utils";
import {theme} from "../core/theme";
import {Dropdown} from "../components/Dropdown";

const HelpScreen = ({ navigation }) => (
    <Background>
        <Logo />
        <Header>Better Skills Better Jobs</Header>

        <Paragraph>
            Need help - Tell us more
        </Paragraph>
        <Text style={styles.text}>Problem Type </Text>
        <Dropdown style={styles.dropdown}/>
        <Text style={styles.text}>Problem Description </Text>
        <Dropdown style={styles.dropdown}/>
        <Text style={styles.text}> Any details if any: </Text>
        <TextInput style={styles.textInput}
                   label="Additional-Details"/>
        <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            Submit
        </Button>
    </Background>
);
const styles = StyleSheet.create({
    text:{
        fontWeight : 'bold',
        fontSize:15,
        marginRight : 150,
        marginTop: 20
    },
    dropdown:{
        width:100,
        height:40
    },
    textInput:{
        marginTop: -15
    }
});
export default memo(HelpScreen);