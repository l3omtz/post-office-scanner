import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';
import MainHeader  from '../components/MainHeader';


class Store extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    // this.sotd()
  }

  sotd(){
    firebase.database().ref('dispensaries')
    .once('value').then( stores => {
      this.setState({stores: stores.val()})
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    stores = this.state.stores
    console.log(this.state)
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <MainHeader navigate={this.props.navigation} title={'BUSINESSES'} ptop={50}/>
          <View style={Styless.top}>
            <View>
                <TouchableOpacity onPress={ () => navigate('Dispensaries')}>
                <View style={Styless.circle}>
                  <Text style={Styless.letter}>D</Text> 
                   <Text style={Styless.word}>Disp.</Text> 
                </View>
                </TouchableOpacity>
            </View>
          </View>

          <View>
              <Image source={require('../../assets/images/famacy.jpg')}  style={{width: '100%', height: '100%'}}>
                <Text style={{backgroundColor: 'rgba(255,255,255,0.0)', color: 'white', fontSize: 37, paddingLeft: 25, paddingTop: 30, fontWeight: '500'}}>
                  Store <Text style={{fontWeight: '300', fontSize: 25}}>of the day</Text>
                </Text>

                <View style={{height: '65%', alignItems:'flex-end', justifyContent: 'space-between', paddingBottom: 15, paddingLeft: 25, flexDirection: 'row',}}>       
                    <View>   
                      <Text style={{fontSize: 27, color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '600'}}>Farmacy</Text>
                      <Text style={{fontSize:20, color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '300'}}>1001 weed av La California 90210</Text>
                    </View>
                    <TouchableOpacity style={{paddingRight: 10}}>
                      <Icon
                      name='chevron-right'
                      type='materialcommunityicons'
                      color='white'
                      size={45}
                      style={{marginTop: -50}}
                      />
                    </TouchableOpacity>
                </View>
              </Image>
            
          </View>
          
        </View>
    )
  }
}

Styless = StyleSheet.create({
  top: {
    backgroundColor:'#4CAF50',
      flexDirection: 'row', 
      justifyContent: 'center', 
      paddingLeft:15, 
      paddingRight: 15, 
      paddingTop: 10,
      paddingBottom: 10,
      // marginTop: 20, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      elevation: 1,
  },
  circle: {
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    borderWidth: 2, 
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: 'white',
    fontSize: 20
  },
  word: {
    color: 'white', 
    fontSize: 13, 
    fontWeight: '300', 
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = state =>{
  return {
      me: state.auth.user
  }
};

export default connect(mapStateToProps)(Store);