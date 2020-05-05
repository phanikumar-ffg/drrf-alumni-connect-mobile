import React, { memo, useState, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import DatePicker from 'react-date-picker';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import { connect } from 'react-redux';

import {

} from '../core/utils';

import PropTypes from 'prop-types';

const AdminAddContentScreen = ({ navigation }) => {
  const [url, setURL] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [assessURL, setAssessURL] = useState({ value: '', error: '' });

  const _onSavePressed = () => {
    const urlError = urlValidator(url.value);
    const assessURLError = urlValidator(assessURL.value);

    if (
      urlError ||
      assessURLError
    ) {
      setURL({ ...url, error: urlError });
      setAssessURL({ ...assessURL, error: assessURLError });
      return;
    }

    navigation.navigate('SignUpSuccessScreen');
  };
  const pickerStyle = StyleSheet.create({
    inputAndroid: {
      backgroundColor: theme.colors.surface,
      paddingTop: 16,
      paddingBottom: 16,
      // paddingLeft: 8,
      paddingRight: 4,
      borderRadius: 4,
      width: '100%',
      marginVertical: 12,
      color: '#999',
      borderColor: '#808080',
    },
  });

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate('HomeScreen')} />
        <Logo />
        <Header>Dr. Reddy's Foundation</Header>
        <Header>Add New Content</Header>
        <View style={styles.formStyle}>
          <form>
            <TextInput
              label="Video URL"
              returnKeyType="next"
              value={url.value}
              onChangeText={text => setURL({ value: text, error: '' })}
              error={!!url.error}
              errorText={url.error}
            />

            <TextInput
              label="Description"
              returnKeyType="next"
              value={description.value}
              onChangeText={text => setDescription({ value: text, error: '' })}
              error={!!description.error}
              errorText={description.error}
            />
            <TextInput
              label="Assessment URL"
              returnKeyType="next"
              value={assessURL.value}
              onChangeText={text => setAssessURL({ value: text, error: '' })}
              error={!!assessURL.error}
              errorText={assessURL.error}
            />
          </form>
        </View>

          <Button mode="contained" >
                    SAVE
                  </Button>
          <Button mode="contained"
                    onPress={() => navigation.navigate('AdminContentManagement')} >
                    RESET
           </Button>

      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  formStyle: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button: {
    marginTop: 24,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  container: {
    width: '100%',
  },
});

export default memo(AdminAddContentScreen);
