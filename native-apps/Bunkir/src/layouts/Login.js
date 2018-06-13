import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser, currentUser } from '../actions';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import { AsyncStorage } from 'react-native'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  componentWillMount(){
    const that = this
    const {navigate} = this.props.navigation;
    // Methosd checks if user is logged in with account ot not
    firebase.auth().onAuthStateChanged( (user) => {
        if (user){
            // send signed in user i
            // that.props.currentUser(user.uid)
            AsyncStorage.setItem('token', user.uid);
            this.props.currentUser(user.uid)
            navigate('Home')
        }else{
            console.log('not loged in')
        }
    });
}

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
      const { email, password } = this.state;
      console.log(email);
      this.props.loginUser({ email, password });
  }
  // Go to create account route
  goToSignup(){
    Actions.signup()
  }

  render(){
    return(
      <View style={styles.container}>
          <Image
            source={require('../../assets/images/gl.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
            >

          <Text style={{marginBottom: 40, color: 'white', fontSize: 20, backgroundColor: 'transparent', fontWeight: '500', letterSpacing: 2}}>
            LET'S GET STARTED
          </Text>
          <View style={styles.line}></View>
          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-mail-outline" color="white" style={styles.icon} ></Icon2>
            <TextInput
              placeholder={'Email'}
              style={styles.input}
              onChangeText={text => this.setState({email: text})}
              placeholderTextColor= '#E0E0E0'
            />
          </View>
          <View style={styles.inputConatiner}>
            <Icon2 name="ios-lock-outline" color="white" style={styles.icon}/>
            <TextInput
              placeholderTextColor= '#E0E0E0'
              placeholder={'Password'}
              style={styles.input}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry 
            />
          </View>
          <View style={{flexDirection: 'row', width: '75%', marginTop: 7}}>
            <TouchableOpacity  onPress={ () =>this.props.navigation.navigate('SignUp')} style={{position: 'absolute', left: 0}}>
              <Text style={{color: 'white', fontSize: 13, backgroundColor: 'transparent'}}>Create Account</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={ () => Actions.forgot() } style={{position: 'absolute', right: 0}}>
              <Text style={{color: 'white', fontSize: 13, backgroundColor: 'transparent'}}>Forgot Password</Text>
            </TouchableOpacity> */}
          </View>
          <View style={{ width: '85%', marginTop: 40}}>
          <Button
            onPress={this.loginBtn.bind(this)}
            title='Login'
            fontSize={17} 
            borderRadius={20}
            backgroundColor='#4CAF50'
            color='white'
            buttonStyle={{
                height: 40,
                width: '100%',
            }}/>
          </View>
          
          <View style={{position: 'absolute', bottom: 50, width: '100%', borderTopWidth: 1, borderColor: 'rgba(255,255,255, 0.4)', alignItems: 'center'}}>
            <View style={{paddingTop: 40, width: '85%'}}>
              <TouchableOpacity onPress={ () =>this.props.navigation.navigate('Main')}>
                <Text style={{fontSize: 17, width: '100%', textAlign: 'center', color: '#E0E0E0', backgroundColor: 'transparent'}}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>
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
  inputConatiner: {
    width: '80%',
    flexDirection: 'row',
    padding: 7,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
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
  },
  line: {
    height: 20,
    backgroundColor: 'black',
    opacity: .5
  },
  btn: {
  },
  loginBtn: {
    width: '100%',
    height: 45,
    backgroundColor: '#488aff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
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
    currentUser, 
    emailChanged, 
    passwordChanged, 
    loginUser, 
    createUser
}) (Login);