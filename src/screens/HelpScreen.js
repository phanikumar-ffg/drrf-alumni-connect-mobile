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
import BackButton from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';

const HelpScreen = ({ navigation }) => (
    <Background>
        <BackButton goBack={() => navigation.navigate('Dashboard')} />
        <Logo />
        <Header>Better Skills Better Jobs</Header>

        <Paragraph>
            Need help - Tell us more
        </Paragraph>
        <View style={styles.container}>
        <RNPickerSelect
             placeholder={{
                label:"Select a Problem Type",
                value:null,
             }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Need Training', value: 'Need Training' },
                { label: 'Problem with Job', value: 'Problem with job' },
                { label: 'Need any material', value: 'Need any Material' },
            ]}
            style={pickerStyle}
        />
        </View>
        <View style={styles.container}>
        <RNPickerSelect
             placeholder={{
                label:"Select a Problem Description",
                value:null,
             }}
            onValueChange={(value) => console.log(value)}
            items={[
                 { label: 'Salary Issue', value: 'Salary Issue' },
                 { label: 'Problem with Manager', value: 'Problem with Manager' },
                 { label: 'Problem with eOffice Environment', value: 'Problem with eOffice Environment' },
             ]}
            style={pickerStyle}
        />
        </View>
        <TextInput label="Additional-Details"
          multiline={true} style={styles.input}
        />
        <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            Submit
        </Button>
    </Background>
);
const pickerStyle=StyleSheet.create({
    inputAndroid: {
        backgroundColor: theme.colors.surface,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        borderRadius: 4,
        borderColor: '#808080'
    },
    placeholder: {
        placeholderColor: '#808080',
    }
});
const styles = StyleSheet.create({
    input: {
        backgroundColor: theme.colors.surface,
        height:120,
     },
    container: {
        width: '100%',
        marginVertical: 12,
    },
});
export default memo(HelpScreen);