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
import {authContentChange, addContent} from '../actions'

import {

} from '../core/utils';

import PropTypes from 'prop-types';

class AdminAddContentScreen extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.user)) {
          this.props.navigation.navigate('Dashboard', nextProps.user);
        }
      }

    submitContent() {
          console.debug('submitContent');
          const { url, description, assessURL } = this.props;
          this.props.addContent({ url, description, assessURL });
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
      };

    render(){
        return (
            <ScrollView>
              <Background>
                <BackButton goBack={() => this.props.navigation.navigate('HomeScreen') } />
                <Logo />
                <Header>Dr. Reddy's Foundation</Header>
                <Header>Add New Content</Header>
                <View style={styles.formStyle}>
                  <form>
                     <TextInput  label="Video URL" returnKeyType="next" value={this.props.url}
                              onChangeText={text => this.props.authContentChange({ field: 'url', value: text }) }
                              autoCapitalize="none" />
                     <TextInput  label="Description" returnKeyType="next" value={this.props.description}
                                 onChangeText={text => this.props.authContentChange({ field: 'description', value: text }) }
                                 autoCapitalize="none" />
                     <TextInput  label="Assessment URL" returnKeyType="next" value={this.props.assessURL}
                                  onChangeText={text => this.props.authContentChange({ field: 'assessURL', value: text }) }
                                  autoCapitalize="none" />
                  </form>
                </View>

                  <Button mode="contained" onPress={this.submitContent.bind(this)} >
                            SAVE
                          </Button>
                  <Button mode="contained" onPress={() => this.props.navigation.navigate('AdminAddContentScreen') }>
                            RESET
                   </Button>

              </Background>
            </ScrollView>
          );
    }
}

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
    url: state.auth.url,
    description: state.auth.description,
    assessURL: state.auth.assessURL,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { authContentChange, addContent })(
  AdminAddContentScreen
);
