import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'firebase'
import _ from 'lodash'
import { AsyncStorage } from 'react-native'


class PostCard extends Component {

    constructor(){
        super()
        this.state = {
            user : null,
            selected: false
        }   
    }

    componentWillMount() {
        this.getUser()
    }

    getUser() {
        firebase.database().ref('accounts/' + this.props.post.user)
        .once('value').then( (user) => {
            this.setState({user: user.val()})
        })
        AsyncStorage.getItem('token')
        .then(value => {
            this.setState({token: value})
        })
    }

    like() {
        // if(this.state.selected){
        //     console.log(this.state.selected, 'true')
        //     likes = this.props.post.likes - 1
        //     console.log(likes);
        //     this.setState({selected: false})
        //     firebase.database().ref('posts/' + this.props.post.id).update({likes}).then( () => this.setState({selected: false}))
        // }else{
        //     console.log(this.state.selected, 'false')
        //     likes = this.props.post.likes + 1
        //     this.setState({selected: true})
        //     console.log(likes);
        //     firebase.database().ref('posts/' + this.props.post.id).update({likes}).then( () => this.setState({selected: true}))            
        // 
        if(this.state.token) {
            firebase.database().ref('posts/' + this.props.post.id).child('likes')
            .once('value').then ( (posts) => {
                let newposts = _.toArray(posts.val());
                let isLiked = _.filter(posts.val(), {'user': this.props.me.userId});
                console.log(isLiked)
                if(isLiked.length > 0 && isLiked[0].user ===  this.props.me.userId) {
                    firebase.database().ref('posts/' + this.props.post.id + '/likes/' + isLiked[0].id).remove()
                }else {
                    firebase.database().ref('posts/' + this.props.post.id + '/likes').push({
                        user: this.props.me.userId,
                        id: ''
                    }).then( (uid) => {
                        firebase.database().ref('posts/' + this.props.post.id + '/likes/' + uid.key).update({id: uid.key});
                    })
                }
            })
        }else {
            alert('Please login or create account to like a post')
            return null
        }
    }

    renderImg() {
        post = this.props.post
        if(post.img){
            return (
                <Image source={{uri: post.img}} style={{width: '100%', height: 150}}/>
            )
        }else{
            return 
        }
    }

    renderDetails() {
        if(this.state.user){
            user = this.state.user.profile
            return (
                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                    <Image source={{uri: user.img}}
                style={{height: 60, width: 60, borderRadius: 30, borderColor: 'white', borderWidth: 5}}/>
                    <Text style={{paddingLeft: 8}}>{user.name}</Text>
                </View>
            )
        }
    }

    renderLikes() {
        likes = _.toArray(post.likes)
        post = this.props.post
        if(post.likes) {
            return (
                <Text style={{paddingRight: 8}}>{likes.length}</Text>
            )
        }else {
            return (
                <Text style={{paddingRight: 8}}>0</Text>
            )
        }
    }

    render() {
        post = this.props.post
        nav = this.props.navigate
        likes = _.toArray(post.likes)
        return (
                <View style={styles.container} >
                    {this.renderDetails()}
                    {this.renderImg()}
                    <View style={{paddingTop: 10}}>
                        <Text>{post.text}</Text>
                    </View>
                    <View style={{paddingTop: 10, justifyContent:'flex-end', flexDirection:'row', alignItems:'center' }}>
                        { this.renderLikes()}
                        <TouchableOpacity onPress={ () => this.like()}>
                            <Icon
                            name='md-heart-outline'
                            type='ionicon'
                            color='#2E7D32'
                            />
                        </TouchableOpacity>
                        {/* <Text style={{paddingLeft:8 ,paddingRight: 8}}>4</Text>
                        <Icon
                        name='md-chatbubbles'
                        type='ionicon'
                        color='#2E7D32'
                        /> */}
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 1,
        // elevation: 1,
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: 10, 
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    }
});

export { PostCard };
