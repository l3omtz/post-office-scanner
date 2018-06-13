import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { ProfileHeader } from '../components';
import MainHeader from '../components/MainHeader';
import { currentUser } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';
import { PostCard } from '../components'

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            text: '',
            me: null,
            posts: null,
            num: 0
        }
    }

    componentWillMount(){
        this.setState({me: this.props.me})
        this.getPost()
    }

    componentWillReceiveProps(nextProps){
        this.setState({me: nextProps.props.me})
    }

    getPost() {
        const me = this.props.me
        firebase.database().ref('posts/')
        .once('value').then( posts => {
            posts = _.toArray(posts.val());
            myPosts = _.filter(posts, {'user': me.userId})
            this.setState({posts: myPosts})
            console.log(this.state.posts);
        })
    }

    renderPosts(){
        if(this.state.posts){
            return (
                <View style={{marginBottom: 1000}}> 
                <FlatList
                style={{marginBottom: 1000,}}
                data={this.state.posts}
                keyExtractor={item => Math.random()}
                showsHorizontalScrollIndicator={false}
                renderItem={ ({item}) => (
                    <View style={{ marginTop:25}}>
                    <TouchableOpacity>
                        <PostCard me={this.props.me} post={item}/>
                      </TouchableOpacity>
                    </View>
                )}
              />
              </View>
            )
        }else{
            console.log(this.state.posts)
            return (
                // <ActivityIndicator/>
                <Text>No posts Yet</Text>
            )
        }
    }

  render() {
    const me = this.state.me
    return (
        <View style={{}}>
            {/* <MainHeader navigate={this.props.navigation}/> */}
            <ProfileHeader navigate={this.props.navigation}/>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: -50,}}>
                <Image source={{uri: me.profile.img}}
                style={{height: 120, width: 120, borderRadius: 60, borderColor: 'white', borderWidth: 5}}/>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{paddingTop:20 ,color: '#424242', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent', fontWeight: '400'}}>{me.profile.name}</Text>
                {/* <Text style={{color: '#9E9E9E', width: '80%', textAlign: 'center', fontSize: 15, backgroundColor: 'transparent', fontWeight: '300'}}>A 24/7 medicinal marijuana smoker that loves hot fries and horror movies</Text> */}
            </View>

            <View style={{borderTopWidth: 1, borderBottomWidth:1, borderColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', marginTop: 30}}>
                <View style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 37, paddingRight: 37}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {
                        this.state.posts &&
                        <Text>{this.state.posts.length}</Text>
                    }
                        <Text>Post</Text>
                    </View>
                </View>
                <View style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 37, paddingRight: 37, borderRightWidth: 1, borderLeftWidth:1, borderColor: 'rgba(0,0,0,0.1)' }}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#424242', textAlign: 'center', backgroundColor: 'transparent', fontWeight: '400'}}>0</Text>
                        <Text style={{color: '#9E9E9E', width: '100%', textAlign: 'center', fontSize: 12, backgroundColor: 'transparent', fontWeight: '300'}}>Followers</Text>
                    </View>
                </View>
                <View style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 37, paddingRight: 37}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#424242', textAlign: 'center', backgroundColor: 'transparent', fontWeight: '400'}}>0</Text>
                        <Text style={{color: '#9E9E9E', width: '100%', textAlign: 'center', fontSize: 12, backgroundColor: 'transparent', fontWeight: '300'}}>Following</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingLeft: 25, paddingRight: 25, marginBottom: 100}}>
        {this.renderPosts()}
            </View>
        </View>
    )
  }
}

const mapStateToProps = state =>{
    return {
        me: state.auth.user
    }
};

export default connect(mapStateToProps)(Profile);
