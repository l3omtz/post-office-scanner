import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import firebase from 'firebase';
import { ReviewCard } from '../components'
import MainHeader  from '../components/MainHeader';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import _ from 'lodash'
import Modal from 'react-native-modal'

class DetailDispensatie extends Component {

    constructor(){
        super()
        this.state = {
            strains : null,
            isModalVisible: false,
            comment: '',
            comments: null
        }
    }

    componentWillMount() {
    }

    render() {
        strain = this.props.navigation.state.params.strain
        const { goBack } = this.props.navigation
        return (
            <View style={{backgroundColor: 'white', height: '100%'}}>
                <View style={{position: 'absolute', top: 25, zIndex: 10000, left: 25}}>
                    <TouchableOpacity onPress={ () => goBack()}>
                        <Icon
                        name='ios-arrow-back'
                        type='ionicon'
                        color='white'
                        size={25}
                        />
                    </TouchableOpacity>
                </View>
                <Image source={{uri: strain.Image}} style={{width: '100%', height: 300}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 15, paddingLeft: 25}}>          

                    </View>
                </Image>
                <View >
                    <ScrollView style={{marginBottom: 600, height: '100%'}}>
                    <View style={{backgroundColor:'white', paddingTop: 10, paddingLeft: 25, paddingRight: 25}}>
                            <Text style={Styles.header}>{strain.name}</Text>
                            <View style={{display: 'flex', flexDirection:'row' }}>
                                <Icon
                                name='md-star'
                                type='ionicon'
                                color='#4CAF50'
                                size={25}
                                />
                                <Icon
                                name='md-star'
                                type='ionicon'
                                color='#4CAF50'
                                size={25}
                                />
                                <Icon
                                name='md-star'
                                type='ionicon'
                                color='#4CAF50'
                                size={25}
                                />
                                <Icon
                                name='md-star'
                                type='ionicon'
                                color='#4CAF50'
                                size={25}
                                />
                                <Icon
                                name='md-star'
                                type='ionicon'
                                color='#4CAF50'
                                size={25}
                                />
                            </View>
                    </View>
                    <View style={{borderTopWidth: 1, borderBottomWidth:1, borderColor: 'rgba(0,0,0,0.1)', flexDirection: 'row'}}>
                        <View style={{ height: 65, paddingLeft: 37, paddingRight: 37,justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{justiyContent: 'center', alignItems: 'center'}}>
                                <Text>Follow</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 37, paddingRight: 37, borderRightWidth: 1, borderLeftWidth:1, borderColor: 'rgba(0,0,0,0.1)' }}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text>182</Text>
                                <Text>Followers</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 37, paddingRight: 37}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text>104</Text>
                                <Text>Following</Text>
                            </View>
                        </View>
                    </View>
                        <View style={{backgroundColor:'white', paddingTop: 20, paddingLeft: 25, paddingRight: 25}}>
                            {/* <Text style={Styles.textSpace}>{strain.details}</Text> */}
                            <Text style={Styles.txt}>Address: <Text style={Styles.textInfo}>{strain.Address}</Text></Text>
                            <Text style={Styles.txt}>Phone: <Text style={Styles.textInfo}>{strain.phone}</Text></Text>
                            <Text style={Styles.txt}>Website: <Text style={Styles.textInfo}>{strain.url}</Text></Text>
                            {/* <View style={{height:1, width: '100%', backgroundColor: '#BDBDBD'}}/> */}
                        </View>
                        <View>
                        <MapView
                        ref="map"
                        style={{ marginTop:20, height:175}}
                        initialRegion={{
                            latitude: strain.lat,
                            longitude: strain.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                            <MapView.Marker
                                key={strain.lat}
                                coordinate={{latitude:strain.lat, longitude:strain.lng}}
                            />
                        </MapView>
                        </View>

                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

Styles = StyleSheet.create({
    header:{
        color: '#4CAF50',
        paddingTop: 10,
        fontSize: 17,
        fontWeight: '500'
    },
    txt:{
        color: '#616161',
        fontWeight: '600'
    },
    textInfo: {
        fontWeight: '400'
    },
    textSpace:{
        color: '#616161', 
        paddingBottom: 10
    },
    input: {
        height: 100,
        backgroundColor: 'red'
    }
  
})

const mapStateToProps = state =>{
    return {
        me: state.auth.user
    }
  };
  
  export default connect(mapStateToProps)(DetailDispensatie);
