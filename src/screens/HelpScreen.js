import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { emailValidator } from '../core/utils';
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { userSubmitHelp,authInputChange } from '../actions';
import config from '../config/index.js'

class HelpScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.user)) {
      this.props.navigation.navigate('Dashboard', nextProps.user);
    }
  }
  state={
    problemType:[],
    selectedProblemType:"",
    validationError:"",
    problemDetails:[],
    selectedProblemDetails:"",
    additionalDetails:"",
    dummyvl:["test1","test2"]
  };

  submitDetails(){
    const { prblmType,prblmDesc,additionalDetails,user } = this.props;
    console.debug('submit Details');
    console.log("inside submit "+this.state.selectedProblemType);

   let studentId=1 ; // should use this.props.user.studentId;
   let centerId=1;
    console.debug(this.props.additionalDetails);

    this.props.userSubmitHelp(this.state.selectedProblemType,this.state.selectedProblemDetails, this.state.additionalDetails,studentId,centerId );
  }

  showError() {
    if(prblmType=='' || prblmDesc=='' || additionalDetails==''){
      console.log("error");
    }
    if (this.props.error) {
      return <Paragraph>{this.props.error}</Paragraph>;
    }
  }
  componentDidMount(){
    const headers = { 'Content-Type': 'application/json' }

    fetch(config.baseurl+"/api/v1/helpDetails/help_type='Problem Type'",{headers},{mode:"no-cors"})
    .then(response =>
      response.json()

    )
       .then(data =>{
        console.log("data=>"+data);
        console.log("problemType=>"+data);
        this.setState({
          problemType: data,
        });

      }).catch(error=>{
        console.error();
      });

    fetch(config.baseurl+"/api/v1/helpDetails/help_type='Problem Details'",{headers},{mode:"no-cors"})
    .then(response =>
      response.json()

    )
       .then(data =>{
        console.log("data=>"+data);
        console.log("problemType=>"+data);
        this.setState({
        //  problemType: data,
          problemDetails:data
        //problemType:[{ value:'', display:'(Select your Problem Type)'}].concat(prblmTypeApi)
        });

      }).catch(error=>{
        console.error();
      });
  }
  render(){
    return(
      <Background>
    <BackButton goBack={() => this.props.navigation.navigate('Dashboard')} />
    <Logo />
    <Paragraph>Need help - Tell us more</Paragraph>
    <View style={styles.container}>
      <select
      style={{height: 4+'em'}}
        value={this.state.selectedProblemType}
        onChange={e =>
        this.setState({
          selectedProblemType: e.target.value,
          validationError:
            e.target.value === ""
            ? "Please select a problem type"
            :""
        })
      }
      >
        <option value="" disabled selected>Select Problem Type</option>
        {this.state.problemType.map(prtype =>(
          <option
          key={prtype.helpValue}
          value={prtype.helpValue}
          >
            {prtype.helpValue}
          </option>))
          }
      </select>
      <div style={{ color:"red", marginTop:"5px"}}>
        {this.state.validationError}
      </div>
      </View>
    <View style={styles.container}>
    <select
        value={this.state.selectedProblemDetails}
        onChange={e =>
        this.setState({
          selectedProblemDetails: e.target.value,
          validationError:
            e.target.value === ""
            ? "Please select a problem type"
            :""
        })
      }
     style={{height: 4+'em'}} >
        <option value="" disabled selected>Select Problem Details</option>
        {this.state.problemDetails.map(prtype =>(
          <option
          key={prtype.helpValue}
          value={prtype.helpValue}
          >
            {prtype.helpValue}
          </option>))
          }
      </select>
      <div style={{ color:"red", marginTop:"5px"}}>
        {this.state.validationError}
      </div>
    </View>
    <TextInput
      label="Additional-Details"
      multiline={true}
      style={styles.input}
      value= {this.state.additionalDetails}
      onChangeText={text =>
        this.setState({additionalDetails:text})
       // this.props.userSubmitHelp({additionalDetails:text})
      }
    />
    <Button mode="contained" onPress={this.submitDetails.bind(this) }>
      Submit
    </Button>
  </Background>
    );
  }
}
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    backgroundColor: theme.colors.surface,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    borderColor: '#808080',
  },
  placeholder: {
    placeholderColor: '#808080',
  },
});
const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    height: 120,
  },
  container: {
    width: '100%',
    marginVertical: 12,
  },
});
const mapStateToProps = state => {
  return {
    user:state.auth.user,
    prblmType:state.help.problemType,
    prblmDesc:state.help.prblmDesc,
    additionalDetails: state.help.additionalDetails,
    userHelpDetails: state.help.userHelpDetails,
    error:state.help.error,
  };
};
export default connect(mapStateToProps, { userSubmitHelp })(
  HelpScreen
);