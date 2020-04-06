import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView,Platform, Alert, Image } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';

import { Card, Title, Paragraph } from 'react-native-paper';
import { Component } from 'react';
import Header from '../components/Header';


import PropTypes from 'prop-types';
import {
  emailValidator,
  mobileValidator,
  nameValidator,
  stateValidator,
  cityValidator,
} from '../core/utils';

class PriceCard extends Component {
 
  render() {
 
    return (
 
      <View style={styles.priceCard_Container}>
 
        <Text style={[styles.title, { color: this.props.titleColor }]}> {this.props.title} </Text>
     <Paragraph>Established in 1996, Dr. Reddy’s Foundation (DRF) is a non-profit partner of Dr. Reddy’s Laboratories. Driven by its belief in the inherent motivation and capacity of humankind for progress – given the appropriate environment – DRF continuously redefines its efforts to cover large groups of disadvantaged populations. DRF is mandated to undertake interventions, conducting programs for the benefit of the marginalized communities and urban poor, focusing in the areas education and livelihoods.</Paragraph>
 
     <Text style={[styles.title, { color: this.props.titleColor }]}>Dr. Reddy’s Foundation for Health and Education </Text>
     <Paragraph>Efficient healthcare delivery is not only about managing ailments, but also about effective communication between the provider and the patient. The patient wants to be heard, understood and treated as an individual. Good communication from caregiver empowers the patient to take an active role in managing his or her wellness and health conditions.Dr. Reddy's Foundation for Health Education (DRFHE) was conceived with the aim of bridging the communication gap in healthcare. DRFHE works primarily in two areas: training initiatives that enhance interpersonal skills of various healthcare stakeholders; and awareness initiatives that create awareness about disease programs amongst employees of corporations.</Paragraph>

      </View>
 
    );
  }
}

export default class NavigationScreen extends Component {

    buttonClick = () => {
  
      Alert.alert("Button Clicked");
  
    }
  
    render() {
  
      return (

        <View style={styles.MainContainer}>
         <Logo />

          <PriceCard
            title='Dr. Reddy Foundation'
            titleColor='#600EE6'
          />
  
        </View>
  
      );
    }
  }
  
  PriceCard.propTypes =
    {
      title: PropTypes.string,
      price: PropTypes.string,
      titleColor: PropTypes.string,
      priceColor: PropTypes.string,
      info: PropTypes.arrayOf(PropTypes.string),
      button_title: PropTypes.string,
      onButtonPress: PropTypes.func,
      iconURL : PropTypes.string
  
    }
  
  PriceCard.defaultProps =
    {
      title: "Default",
      price: "Default",
      titleColor: "#600EE6",
      priceColor: "#600EE6",
      info: [],
      button_title: "GET STARTED"
    }
  
  const styles = StyleSheet.create({
  
    MainContainer: {
  
      flex: 1,
      paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    priceCard_Container: {
  
      alignItems: 'center',
      justifyContent: 'center',
      width: '85%',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#78909C',
      padding: 15
  
    },
  
    title: {
      fontSize: 25,
      fontWeight: 'bold',
    },
  
    price: {
      fontSize: 29,
      fontWeight: 'bold',
    },
  
    price_Info: {
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
      color: '#B0BEC5'
    },
  
    price_Button: {
  
      width: '90%',
      marginTop: 15,
      marginBottom: 10,
      backgroundColor: '#AA00FF',
      borderRadius: 4,
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'center',
  
    },
  
    iconStyle: {
  
      width: 25,
      height: 25,
      justifyContent: 'flex-start',
      alignItems: 'center',
      tintColor: '#fff'
  
    },
  
    TextStyle: {
      color: '#AA00FF',
      textAlign: 'center',
      fontSize: 15
    }
  
  
  });

// const NavigationScreen = ({ navigation }) => {
  
// return (

// <View>
//     <Background>
//       <Logo />
//     <Card>
//     <Card.Content>
//       <Title>Dr. Reddy Foundation</Title>
//       <Paragraph>Dr.Reddy’s Foundation was founded in 1996, to enhance the dignity and well-being of socially and economically vulnerable people. We develop and test innovative solutions to address complex social problems and leverage partnerships to scale up impact. We work with Children, Youth (including Persons with Disabilities) Women and Households across 20 states in India.     </Paragraph>
//     </Card.Content>
//   </Card>
  

//     </Background>
//     </View>
// );
// };

// const styles = StyleSheet.create({
  
//   button: {
//     marginTop: 24,
//   },
// });

// export default memo(NavigationScreen);