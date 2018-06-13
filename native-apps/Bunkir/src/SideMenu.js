import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { currentUser } from './actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'
import firebase from 'firebase';

class Search extends Component {

    constructor(){
        super();
        this.state = {
            users: [],
            text: ''
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('token')
        .then(value => {
            this.setState({token: value})
        })
    }

    logOut() {
        firebase.auth().signOut()
        .then( function(a){
            Actions.login();
            console.log('out');
        })
        .catch(function(error) {
        // Handle Errors here.
        });
    }

    homeIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Home'){
            return (
                <TouchableOpacity style={styles.onRow}
                onPress={ () => navigate('Home')}>
                    <Icon
                    name='md-home'
                    type='ionicon'
                    color='#2E7D32'
                    />
                    <Text style={styles.onLabel}>Home</Text>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.row}
                onPress={ () => navigate('Home')}>
                    <Icon
                    name='md-home'
                    type='ionicon'
                    color='#BDBDBD'
                    />
                    <Text style={styles.label}>Home</Text>
                </TouchableOpacity>
            )
        }
    }
    profileIcon() {
        const { navigate } = this.props.navigation;
        if(this.state.token) {
            if(this.props.activeItemKey == 'Profile'){
                return (
                    <TouchableOpacity style={styles.onRow}
                    onPress={ () => navigate('Profile')}>
                        <Icon
                        name='md-person'
                        type='ionicon'
                        color='#2E7D32'
                        />
                        <Text style={styles.onLabel}>Profile</Text>
                    </TouchableOpacity>
                )
            }else{
                return (
                    <TouchableOpacity style={styles.row}
                    onPress={ () => navigate('Profile')}>
                        <Icon
                        name='md-person'
                        type='ionicon'
                        color='#BDBDBD'
                        />
                        <Text style={styles.label}>Profile</Text>
                    </TouchableOpacity>
                )
            }
        }else {
            return null;
        }
    }
    strainIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Strains'){
            return (
                <TouchableOpacity style={styles.onRow}
                onPress={ () => navigate('Strains')}>
                    <Icon
                    name='md-leaf'
                    type='ionicon'
                    color='#2E7D32'
                    />
                    <Text style={styles.onLabel}>Strains</Text>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.row}
                onPress={ () => navigate('Strains')}>
                    <Icon
                    name='md-leaf'
                    type='ionicon'
                    color='#BDBDBD'
                    />
                    <Text style={styles.label}>Strains</Text>
                </TouchableOpacity>
            )
        }
    }
    dispensariesIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Store'){
            return (
                <TouchableOpacity style={styles.onRow}
                onPress={ () => navigate('Store')}>
                    <Icon
                    name='store'
                    type='materialcommunityicons'
                    color='#2E7D32'
                    />
                    <Text style={styles.onLabel}>Dispensaries</Text>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.row}
                onPress={ () => navigate('Store')}>
                    <Icon
                    name='store'
                    type='materialcommunityicons'
                    color='#BDBDBD'
                    />
                    <Text style={styles.label}>Dispensaries</Text>
                </TouchableOpacity>
            )
        }
    }
    storiesIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Stories'){
            return (
                <TouchableOpacity style={styles.onRow}>
                    <Icon
                    name='md-flag'
                    type='ionicon'
                    color='#BDB2E7D32DBD'
                    />
                    <Text style={styles.onLabel}>Stories</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.row}>
                    <Icon
                    name='md-flag'
                    type='ionicon'
                    color='#BDBDBD'
                    />
                    <Text style={styles.label}>Stories</Text>
                </TouchableOpacity>
            )
        }
    }
    newsIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'News'){
            return (
                <TouchableOpacity style={styles.onRow}>
                    <Icon
                    name='bell'
                    type='font-awesome'
                    color='#2E7D32'
                    size={15}
                    />
                    <Text style={styles.onLabel}>News</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.row}>
                    <Icon
                    name='bell'
                    type='font-awesome'
                    color='#BDBDBD'
                    size={15}
                    />
                    <Text style={styles.label}>News</Text>
                </TouchableOpacity>
            )
        }
    }
    learnIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Learn'){
            return (
                <TouchableOpacity style={styles.onRow}>
                    <Icon
                    name='md-book'
                    type='ionicon'
                    color='#2E7D32'
                    size={23}
                    />
                    <Text style={styles.onLabel}>Bunkir Learn</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.row}>
                    <Icon
                    name='md-book'
                    type='ionicon'
                    color='#BDBDBD'
                    size={23}
                    />
                    <Text style={styles.label}>Bunkir Learn</Text>
                </TouchableOpacity>
            )
        }
    }
    settingsIcon() {
        const { navigate } = this.props.navigation;
        if(this.props.activeItemKey == 'Settings'){
            return (
                <TouchableOpacity style={styles.onRow}>
                    <Icon
                    name='gear'
                    type='font-awesome'
                    color='#2E7D32'
                    />
                    <Text style={styles.onLabel}>Settings</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.row}>
                    <Icon
                    name='gear'
                    type='font-awesome'
                    color='#BDBDBD'
                    />
                    <Text style={styles.label}>Settings</Text>
                </TouchableOpacity>
            )
        }
    }
    renderBottomBtn() {
        const { navigate } = this.props.navigation;
        if(!this.state.token) {
            return (
                <TouchableOpacity style={styles.bottomBtn} onPress={ () => navigate('Auth')}>
                    <View>
                        <Text style={{color: 'white'}}>Log In</Text>
                    </View>
                </TouchableOpacity>
            )
        }else {
            return (
                <TouchableOpacity style={styles.bottomBtn}>
                    <View>
                        <Text style={{color: 'white'}}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={{flex: 1}}>
            <Image source={require('../assets/images/profileback.png')}
            style={{height: 150, width: '100%', paddingTop: 25, paddingLeft: 15, paddingRight: 15}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {
                        this.props.me &&
                        <View>
                            <Image source={{uri: this.props.me.profile.img}}
                            style={{height: 80, width: 80, borderRadius: 40}}/>
                            <Text style={{textAlign: 'center', paddingTop: 10, color: 'white', backgroundColor: 'rgba(255,255,255,0.0)'}}>{this.props.me.profile.name}</Text>
                        </View>
                    }
                </View>
            </Image>

            {this.homeIcon()}
            
            {this.profileIcon()}

            {this.strainIcon()}

            {this.dispensariesIcon()}

            {/* {this.storiesIcon()}

            {this.newsIcon()}

            {this.learnIcon()}

            {this.settingsIcon()} */}

            {this.renderBottomBtn()}

        </View>
    )
  }
}

const styles = StyleSheet.create({
    top: {
        marginTop: 20, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        paddingBottom: 5,
        paddingTop: 5
    },
    onRow: {
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor: '#F5F5F5',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25
    },
    onLabel:{
        color: '#2E7D32',
        paddingLeft: 10,
        fontWeight: '500'
    },
    row: {
        flexDirection:'row', 
        alignItems:'center', 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25
    },
    label:{
        color: '#BDBDBD',
        paddingLeft: 10,
        fontWeight: '500'
    },
    bottomBtn: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: '#4CAF50',
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center'
    }
    
})

const mapStateToProps = state =>{
    return {
        me: state.auth.user
    }
};

export default connect(mapStateToProps)(Search);
