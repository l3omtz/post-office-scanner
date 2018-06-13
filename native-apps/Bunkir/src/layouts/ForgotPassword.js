import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser } from '../actions';
import { Actions } from 'react-native-router-flux';


class ForgotPassword extends Component {

    // Get user email change
  onEmailChange(text) {
      // Call in action creator 
      this.props.emailChanged(text);
  }
  // Get user passoword change
  onPasswordChange(text){
      this.props.passwordChanged(text);
  }
  // Login Btn calls firebase login method from actions
  loginBtn(){
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
  }
  // Go to create account route
  goToSignup(){
    Actions.signup()
  }

  render(){
    console.log(this.props)
    return(
      <View style={styles.container}>
          <Image
            source={require('../../assets/images/gl.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
            >
          <View style={{width: 300}}>
          <Text style={{marginBottom: 40, color: 'white', fontSize: 17, backgroundColor: 'transparent', fontWeight: '500', textAlign: 'center'}}>
            Enter the email address associated with your account and we'll email you a reset password link.
          </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-mail-outline" color="white" style={styles.icon} ></Icon2>
            <TextInput
              placeholder={'Email'}
              style={styles.input}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              placeholderTextColor= '#E0E0E0'
            />
          </View>

          <View style={{ width: '85%', marginTop: 0}}>
          <Button
            onPress={this.loginBtn.bind(this)}
            title='Reset'
            fontSize={17} 
            borderRadius={20}
            backgroundColor='#4CAF50'
            color='white'
            buttonStyle={{
                height: 40,
                width: '100%',
            }}/>
          </View>
          
          </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputConatiner1: {
    width: '80%',
    flexDirection: 'row',
    padding: 7,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    marginBottom: 20
  },
  input: {
    height: 30,
    width: '100%',
    paddingRight: 15,
    color: 'white',
  },
  icon: {
    fontSize: 25,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 1,
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = state =>{
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        USER: state.auth.user
    }
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    loginUser, 
    createUser
}) (ForgotPassword);