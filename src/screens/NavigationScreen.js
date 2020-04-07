import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { theme } from '../core/theme';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { Component } from 'react';
import Header from '../components/Header';

import PropTypes from 'prop-types';

class NavigationScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Background>
          <Logo />
          <Header>Dr. Reddy's Foundation</Header>
          <Image
            source={require('../assets/DRF_Image_1.png')}
            style={styles.image1}
          />
          <Image
            source={require('../assets/DRF_Image_2.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/DRF_Image_3.png')}
            style={styles.image2}
          />
          <Image
            source={require('../assets/DRF_Image_4.png')}
            style={styles.image2}
          />
        </Background>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: 110,
    marginBottom: 8,
  },
  image1: {
    width: '90%',
    height: 150,
    marginBottom: 8,
  },
  image2: {
    width: '90%',
    height: 120,
    marginBottom: 8,
  },
  container: {
    width: '100%',
    marginVertical: 12,
  },
});
export default memo(NavigationScreen);
