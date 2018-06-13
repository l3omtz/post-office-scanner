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
import { StrainCard } from '../components'
import MainHeader  from '../components/MainHeader';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import Modal from 'react-native-modal'
import { ReviewCard } from '../components'
import { AsyncStorage } from 'react-native'

class DetailPost extends Component {

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
        this.getUser()
        this.getComments()
        AsyncStorage.getItem('token')
        .then(value => {
            this.setState({token: value})
        })
    }

    getUser() {
        firebase.database().ref('accounts/' +  this.props.navigation.state.params.post.user)
        .once('value').then( (user) => {
            this.setState({user: user.val()})
        })
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
    renderImg() {
        post = this.props.navigation.state.params.post
        console.log(post)
        if(post.img){
            return (
                <Image source={{uri: post.img}} style={{width: '100%', height: 200}}/>
            )
        }else{
            return 
        }
    }

    // SHIT DONT WORK -- YET
    like() {
        post = this.props.navigation.state.params.post
        me = this.props.navigation.state.params.me
        firebase.database().ref('posts/' + post.id).child('likes')
        .on('value', (posts) => {
            let newposts = _.toArray(posts.val());
            let isLiked = _.filter(posts.val(), {'user': me.userId});
            
            if(isLiked.length > 0 && isLiked[0].user ===  me.userId) {
                firebase.database().ref('posts/' + post.id + '/likes/' + isLiked[0].id).remove()
            }else {
                firebase.database().ref('posts/' + post.id + '/likes').push({
                    user: me.userId,
                    id: ''
                }).then( (uid) => {
                    firebase.database().ref('posts/' + post.id + '/likes/' + uid.key).update({id: uid.key});
                })
            }
        })
    }

    post() {
        post = this.props.navigation.state.params.post
        me = this.props.navigation.state.params.me
          firebase.database().ref('posts/' + post.id).child('comments').push({
            user: me.userId,
            comment: this.state.comment
          }).catch( (err) => {
              console.log(err)
          }).then( (post) => {
            this.setState({ isModalVisible: false });
          })
    }

    getComments() {
        post = this.props.navigation.state.params.post
        firebase.database().ref('posts/' + post.id).child('comments')
        .on('value', (comments) => {
            comments =_.toArray(comments.val());
            this.setState({comments})
        })
    }
    renderComments() {
        if(this.state.comments) {
            if(this.state.comments.length > 0) {
                return (
                    <View> 
                    <FlatList
                    data={this.state.comments}
                    keyExtractor={item => Math.random()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={ ({item}) => (
                        <View style={{ marginTop:15}}>
                            <ReviewCard review={item} />
                        </View>
                    )}
                  />
                  </View>
                )
            }else {
                return (
                    <Text style={Styles.txt}>No Revies Yet</Text>
                )
            }

        }
    }

    render() {
        post = this.props.navigation.state.params.post
        const { goBack } = this.props.navigation
        likes = _.toArray(post.likes)
        return (
            <View style={{backgroundColor: 'white', height: '100%'}}>
                <MainHeader navigate={this.props.navigation}  back={true} ptop={70}/>

                <View>
                    {this.renderImg()}
                    <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25}}>
                        {this.renderDetails()}
                        <Text style={{fontSize: 20}}>{post.text}</Text>
                        <Text style={{paddingTop: 5, paddingBottom: 10}}>1:34pm 04/20/2017</Text>
                        <View style={{height:1, width: '100%', backgroundColor: '#BDBDBD'}}/>
                        <View style={{display: 'flex', flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
                            <Text style={{paddingRight: 10}}>{likes.length}</Text>
                            <TouchableOpacity style={{paddingRight: 15}}>
                                <Icon
                                name='md-heart-outline'
                                type='ionicon'
                                color='#2E7D32'
                                />
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.token &&
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                                <Text style={Styles.header}>Comments </Text>
                                <TouchableOpacity onPress={ () => this.setState({isModalVisible: true})}>
                                    <Icon
                                    name='ios-create-outline'
                                    type='ionicon'
                                    color='#4CAF50'
                                    size={28}
                                    />
                                </TouchableOpacity>
                        </View>
                        }
                        {this.renderComments()}
                    </View>
                </View>

                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{paddingBottom: 50}}>
                    <TouchableOpacity onPress={ () => { 
                        this.setState({isModalVisible: false});
                        this.setState({loadImg: null});
                        }}>
                        <Icon
                        name='cancel'
                        type='materialicons'
                        color='white'
                        size={35}
                        />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.modal}>
                    <View style={{backgroundColor: '#F5F5F5', padding: 25, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'black'}}>Leave a comment</Text>
                    </View>

                    <View style={{padding: 10, backgroundColor: 'white'}}>
                        <TextInput
                        placeholder={'...'}
                        multiline={true}
                        style={{height: 100}}
                        onChangeText={text => this.setState({comment: text})}
                        placeholderTextColor= 'black'
                        />
                    </View>

                    <TouchableOpacity onPress={ () => this.post() } style={{width: '100%', height: 50, backgroundColor: '#4CAF50', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'white'}}>POST</Text>
                    </TouchableOpacity>

                    </View>
                </Modal>
            </View>
        )
    }
}

Styles = StyleSheet.create({
    header:{
        color: '#4CAF50',
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 17
    },
    txt:{
        color: '#616161'
    },
    textSpace:{
        color: '#616161', 
        paddingBottom: 10
    }
  
})



export default DetailPost;