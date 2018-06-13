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


class Strains extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    this.sotd()
  }

  sotd(){
    firebase.database().ref('sotd')
    .once('value').then( strain => {
      this.setState({sotd: strain.val()})
    })

  }

  render() {
    const {navigate} = this.props.navigation;
    strain = this.state.sotd
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <MainHeader navigate={this.props.navigation} title={'STRAINS'} ptop={50}/>
          <View style={styles.top}>
            <View>
                <TouchableOpacity onPress={ () => navigate('HybridStrain', {letter: 'H', name: 'Hybrid'})}>
                <View style={styles.circle}>
                  <Text style={styles.letter}>H</Text> 
                   <Text style={styles.word}>Hybrid</Text> 
                </View>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={ () => navigate('IndicaStrain')}>
                <View style={styles.circle}>
                  <Text style={styles.letter}>I</Text> 
                   <Text style={styles.word}>Indica</Text> 
                </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => navigate('SativaStrain')}>
                <View style={styles.circle}>
                  <Text style={styles.letter}>S</Text> 
                   <Text style={styles.word}>Sativa</Text> 
                </View>
                </TouchableOpacity>
            </View>
          </View>

          <View>
            {
              this.state.sotd && 
              <Image source={{uri: strain.imgUrl}}  style={{width: '100%', height: '100%'}}>
                <Text style={{backgroundColor: 'rgba(255,255,255,0.0)', color: 'white', fontSize: 37, paddingLeft: 25, paddingTop: 30, fontWeight: '500'}}>
                  Strain <Text style={{fontWeight: '300', fontSize: 25}}>of the day</Text>
                </Text>

                <View style={{height: '65%', alignItems:'flex-end', justifyContent: 'space-between', paddingBottom: 15, paddingLeft: 25, flexDirection: 'row',}}>       
                    <View>   
                      <Text style={{fontSize: 27, color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '600'}}>{strain.name}</Text>
                      <Text style={{fontSize:20, color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '300'}}>{strain.type}</Text>
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
            }
          </View>
          
        </View>
    )
  }
}

styles = StyleSheet.create({
  top: {
    backgroundColor:'#4CAF50',
      flexDirection: 'row', 
      justifyContent: 'space-between', 
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

export default connect(mapStateToProps)(Strains);