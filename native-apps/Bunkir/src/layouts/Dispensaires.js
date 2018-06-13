import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { StoreCard } from '../components'
import MainHeader  from '../components/MainHeader';
import { Icon } from 'react-native-elements';
import _ from 'lodash'

class Dispensaries extends Component {

    constructor(){
        super()
        this.state = {
            disp : null
        }
    }

    componentWillMount(){
        firebase.database().ref('dispensaries')
        .once('value').then( data => {
            disp = _.toArray(data.val())
            this.setState({disp})
            console.log(disp)
        })
    }

    renderDisp(){
        if(this.state.disp){
            nav = this.props.navigation
            return (
                <View style={{}}> 
                <FlatList
                data={this.state.disp}
                keyExtractor={item => Math.random()}
                renderItem={ ({item}) => (
                    <TouchableOpacity  onPress={ () => nav.navigate('DetailDispensatie', { strain: item })}>
                        <StoreCard  strain={item} navigate={this.props.navigation}/>
                    </TouchableOpacity>
                )}
              />
              </View>
            )
        }else{
            return (

                <ActivityIndicator/>
            )
        }
    }

  render() {
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state
    return (
        <View style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)'}}>
            <MainHeader navigate={this.props.navigation} title={'Dispensaries'} back={true} ptop={70}/>
          <View style={{paddingBottom: 140}}>
            {this.renderDisp()}
          </View>
        </View>
    )
  }
}

Styles = StyleSheet.create({
  tops: {
      justifyContent: 'center', 
      alignItems: 'center',
      paddingLeft:15, 
      paddingRight: 15, 
      paddingBottom: 10,
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
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter: {
    color: '#4CAF50',
    fontSize: 20
  },
  word: {
    color: '#4CAF50', 
    fontSize: 13, 
    fontWeight: '300', 
    backgroundColor: 'transparent'
  }
})



export default Dispensaries;