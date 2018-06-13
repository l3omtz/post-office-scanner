import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { SideMenu, List, ListItem, Icon } from 'react-native-elements'
import Drawer from 'react-native-drawer'
import Modal from 'react-native-modal'
import firebase from 'firebase';
import { currentUser } from '../actions';
import { connect } from 'react-redux';

import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import { AsyncStorage } from 'react-native'

class MainHeader extends Component {
    
constructor () {
    super()
    this.state = {
      isOpen: false,
      isModalVisible: false,
      postText: '',
      userId: null,
      postImg: null,
      loadImg: null,
      token: null
    }
  }
  
  aws_options = {
    keyPrefix: "post-images/",
    bucket: "bunkir",
    accessKey: 'AKIAIUYKATMVA7F6I6RA',
    secretKey: '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',
    region: "us-west-2",
    acl: "public-read",
    successActionStatus: 201
  }

  uploadedImg = ''

  uploadImg() {
    // Open Image Library
    var that = this;
    var options = {
      title: 'Select Avatar',
      customButtons: [{
        name: 'fb',
        title: 'Choose Photo from Facebook'
      }, ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      that.uploadedImg.img = response.uri;
      this.setState({loadImg: response.uri })
    });
  }
 
  componentWillMount() {
    AsyncStorage.getItem('token')
    .then(value => {
        this.setState({token: value})
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({userId: nextProps.me.userId});
  }
  renderIcon(){
    if(this.props.back){
      const { goBack } = this.props.navigate;
      return (
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
      )
    }else{
      nav = this.props.navigate
      return (
        <View style={{position: 'absolute', top: 25, zIndex: 10000, left: 25}}>
          <TouchableOpacity onPress={ () => nav.navigate('DrawerOpen')}>
            <Icon
            name='md-menu'
            type='ionicon'
            color='white'
            size={25}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderIconRight(){
    if(this.props.back){
      const { goBack } = this.props.navigate;
      return 
    }else{
      if(this.state.token) {
        return (
          <View style={{position: 'absolute', top: 25, zIndex: 10000, right: 25}}>
            <TouchableOpacity onPress={ () => this.setState({ isModalVisible: true }) }>
              <Icon
              name='ios-create-outline'
              type='ionicon'
              color='white'
              size={28}
              />
            </TouchableOpacity>
          </View>
        )
      }else {
        return
      }
    }
  }

  post() {
    let file = {
      uri: this.state.loadImg,
      name: Math.random().toString(),
      type: "image/png"
    }
    if(this.state.loadImg) {
      RNS3.put(file, this.aws_options).then(responseimg => {
        if (responseimg.status !== 201)
          throw new Error("Failed to upload image to S3");

        this.setState({postImg: responseimg.body.postResponse.location })

        firebase.database().ref('posts')
        .push({
          user: this.state.userId,
          text: this.state.postText,
          likes: 0,
          comments: 0,
          img: this.state.postImg,
          id: ''
    
        }).catch( (err) => {
          console.log(err)
        }).then( (ref) => {
          this.setState({loadImg: null});
          this.setState({ isModalVisible: false });
          firebase.database().ref('posts/' + ref.key).update({id: ref.key});
        })
      });
    }else {
      firebase.database().ref('posts')
      .push({
        user: this.state.userId,
        text: this.state.postText,
        likes: 0,
        comments: 0,
        id: ''
  
      }).catch( (err) => {
        console.log(err)
      }).then( (ref) => {
        firebase.database().ref('posts/' + ref.key).update({id: ref.key});
        this.setState({loadImg: null})
        this.setState({ isModalVisible: false })
      })
    }
  }

  renderImages() {
    if(this.state.loadImg) {
      return (
        <View>
          <Image source={{uri: this.state.loadImg}} style={{height:200, width: '100%'}}/>
        </View>
      )
    }
  }

  render () {
    nav = this.props.navigate
    console.log(this.props.navigate)
    return (
      <View style={{height: this.props.ptop, backgroundColor: '#4CAF50',}}>
        {this.renderIcon()}
          <View style={{justifyContent: 'center', width: '100%', top:30}}>
            <Text style={styles.header}>{this.props.title}</Text>
          </View>
          {this.renderIconRight()}

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
                <Text style={{color: 'black'}}>What would you like to share?</Text>
              </View>

              <View style={{padding: 10}}>
                <TextInput
                  placeholder={'...'}
                  multiline={true}
                  style={styles.input}
                  onChangeText={text => this.setState({postText: text})}
                  placeholderTextColor= 'black'
                />
              </View>

              {this.renderImages()}

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%', height: 50, borderWidth: 1, borderColor: '#4CAF50', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={  () => this.uploadImg()}>
                  <Icon
                  name='md-camera'
                  type='ionicon'
                  color='#4CAF50'
                  />
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%', height: 50, backgroundColor: '#4CAF50', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={ () => this.post() }><Text style={{color: 'white'}}>POST</Text></TouchableOpacity>
                </View>
              </View>

            </View>
          </Modal>


      </View>
    )
  
  }
}

const styles = StyleSheet.create({
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500', 
    letterSpacing: 1
  },
   modal: {
    width: '100%',
    backgroundColor: 'white'
   },
  input: {
    height: 100,
    width: '100%',
    paddingRight: 15,
  },
});

const mapStateToProps = state =>{
  return {
      me: state.auth.user
  }
};

export default connect(mapStateToProps)(MainHeader);

