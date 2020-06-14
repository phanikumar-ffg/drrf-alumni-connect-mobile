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
import { authContentChange, addContent } from '../actions';

import {} from '../core/utils';

import PropTypes from 'prop-types';

const contentTypeOptions = [
  { label: 'Video', value: 'Video' },
  { label: 'Document', value: 'Document' },
  { label: 'Website', value: 'Website' },
];

class AdminAddContentScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.user)) {
      this.props.navigation.navigate('Dashboard', nextProps.user);
    }
  }

  submitContent() {
    console.log('submitContent');
    const { contentURL, contentType, contentDesc, assessmentURL } = this.props;
    console.log(contentURL);
    this.props.addContent({
      contentURL,
      contentType,
      contentDesc,
      assessmentURL,
    });
  }

  showButton() {
    if (this.props.loading) {
      return (
        <View>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return (
        <Button mode="contained" onPress={this.submitContent.bind(this)}>
          SAVE
        </Button>
      );
    }
  }

  showError() {
    if (this.props.error) {
      return <Paragraph>{this.props.error}</Paragraph>;
    }
  }
  _onSave() {
    return (
      //   <Alert>Saved Successfully</Alert>
      <View style={styles.container}>
        <Paragraph>Saved Successfully</Paragraph>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <Background>
          <BackButton
            goBack={() => this.props.navigation.navigate('HomeScreen')}
          />
          <Logo />
          <Header>Dr. Reddy's Foundation</Header>
          <Header>Add New Content</Header>
          <View style={styles.formStyle}>
            <form>
              <TextInput
                label="Video URL"
                returnKeyType="next"
                value={this.props.contentURL}
                required
                onChangeText={value =>
                  this.props.authContentChange({
                    field: 'contentURL',
                    value: value,
                  })
                }
                autoCapitalize="none"
              />
              <RNPickerSelect
                useNativeAndroidPickerStyle="false"
                placeholder={{ label: 'Content Type', value: null }}
                value={this.props.contentType}
                style={pickerStyle}
                onValueChange={value => console.log(value)}
                items={contentTypeOptions}
              />
              <TextInput
                label="Description"
                returnKeyType="next"
                value={this.props.contentDesc}
                required
                onChangeText={value =>
                  this.props.authContentChange({
                    field: 'contentDesc',
                    value: value,
                  })
                }
                autoCapitalize="none"
              />
              <TextInput
                label="Assessment URL"
                returnKeyType="next"
                value={this.props.assessmentURL}
                required
                onChangeText={value =>
                  this.props.authContentChange({
                    field: 'assessmentURL',
                    value: value,
                  })
                }
                autoCapitalize="none"
              />
            </form>
          </View>

          <Button mode="contained" onPress={this.submitContent.bind(this)}>
            SAVE
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate('AdminAddContentScreen')
            }
          >
            RESET
          </Button>
        </Background>
      </ScrollView>
    );
  }
}
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    backgroundColor: theme.colors.surface,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 4,
    borderRadius: 4,
    width: '100%',
    marginVertical: 12,
    color: '#999',
    borderColor: '#808080',
  },
});

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

const mapStateToProps = state => {
  return {
    contentURL: state.addContent.contentURL,
    contentType: state.addContent.contentType,
    contentDesc: state.addContent.contentDesc,
    assessmentURL: state.addContent.assessmentURL,
    loading: state.addContent.loading,
  };
};

export default connect(mapStateToProps, { authContentChange, addContent })(
  AdminAddContentScreen
);
