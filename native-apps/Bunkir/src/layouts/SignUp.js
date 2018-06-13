import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { Actions } from 'react-native-router-flux';


class SignUp extends Component {

  constructor(){
    super()
    this.state = {
      name: '', 
      email: '',
      password: '',
      dob: '',
    }
  }

  // Login Btn calls firebase login method from actions
  createUser(){
      nav = this.props.navigation
      const { email, password, name, dob } = this.state;
      this.props.createUser({ email, password, name, dob, nav });
  }
  // Go to create account route
  goToLogin(){
    Actions.login()
  }

  render(){
    nav = this.props.navigation
    return(
      <View style={styles.container}>
          <Image
            source={require('../../assets/images/up.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
            >

          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-person-outline" color="white" style={styles.icon} ></Icon2>
            <TextInput
              placeholder={'Name'}
              style={styles.input}
              onChangeText={ name => this.setState({name})}
              placeholderTextColor= '#E0E0E0'
            />
          </View>
          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-mail-outline" color="white" style={styles.icon} ></Icon2>
            <TextInput
              autoCapitalize={'none'}
              placeholder={'Email'}
              style={styles.input}
              onChangeText={email => this.setState({email})}
              placeholderTextColor= '#E0E0E0'
            />
          </View>

          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-lock-outline" color="white" style={styles.icon} />
            <TextInput
              placeholderTextColor= '#E0E0E0'
              placeholder={'Password'}
              style={styles.input}
              onChangeText={ psw => this.setState({password: psw})}
              secureTextEntry 
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.inputConatiner1}>
            <Icon2 name="ios-lock-outline" color="white" style={styles.icon}/> 
            <TextInput
              placeholderTextColor= '#E0E0E0'
              placeholder={'Confirm Password'}
              style={styles.input}
              secureTextEntry 
              autoCapitalize={'none'}
            />
          </View>

                    <View style={styles.inputConatiner}>
            <Icon2 name="ios-flame-outline" color="white" style={styles.icon}/>
            <TextInput
              autoCapitalize={'none'}
              placeholderTextColor= '#E0E0E0'
              placeholder={'Date of Birth'}
              style={styles.input}
              onChangeText={dob => this.setState({dob})}
              value={this.props.birthday}
            />
          </View>
          <View style={{ width: '85%', marginTop: 10}}>
            <Text style={{backgroundColor: 'transparent', textAlign: 'center', color: 'white'}}>By using Bunkir you agree to the</Text>
            <Text  style={{backgroundColor: 'transparent', textAlign: 'center', color: 'white'}}><Text style={{color: '#81C784'}}>Terms of Services</Text> and <Text style={{color: '#81C784'}}>Privacy Policy</Text> </Text>
          </View>
          <View style={{ width: '85%', marginTop: 40}}>
          <Button
            onPress={this.createUser.bind(this)}
            title='Register'
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
          <View style={{position: 'absolute', bottom: 50, width: '100%', alignItems: 'center'}}>
            <TouchableOpacity style={{paddingTop: 40, width: '85%'}} onPress={ () =>  nav.navigate('Auth')}>
              <Text style={{fontSize: 17, width: '100%', textAlign: 'center', color: '#E0E0E0', backgroundColor: 'transparent'}}>Already have account?</Text>
            </TouchableOpacity>
          </View>
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
    createUser
}) (SignUp);