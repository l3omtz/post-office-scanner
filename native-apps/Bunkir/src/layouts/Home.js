import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { PostCard } from '../components'
import MainHeader  from '../components/MainHeader';
import _ from 'lodash';

class Home extends Component {

  constructor(){
    super()
    this.state = {
      posts: null
    }
  }

  componentDidMount(){
    this.getPosts()
  }

  getPosts(){
    // firebase.database().ref('posts')
    // .push( {
    //   user: 'ln7Bes9d91Xx29qP2lMBbNrNOCq1',
    //   text: 'Happy hour! we got from a store!',
    //   likes: 2,
    //   comments: { }
    // })
    firebase.database().ref('posts')
    .on('value',  (post) => {
      posts = _.toArray(post.val())
      this.setState({posts: posts});
    })

  }

  renderPosts(){
    if(this.state.posts){
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}> 
            <FlatList
            data={this.state.posts}
            keyExtractor={item => Math.random()}
            showsHorizontalScrollIndicator={false}
            renderItem={ ({item}) => (
                <View style={{ marginTop:25}}>
                <TouchableOpacity onPress={ () => navigate('DetailPost', { post:item, me: this.props.me })}>
                    <PostCard me={this.props.me} post={item} navigate={this.props.navigation}/>
                  </TouchableOpacity>
                </View>
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
    const {navigate} = this.props.navigation;
    posts = this.state.posts
    return (
        <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
          <MainHeader navigate={this.props.navigation} title={'BUNKIR'} ptop={50}/>
          <View style={styles.top}>

          </View>

          <View style={{paddingLeft: 25, paddingRight: 25, flex: 1}}>
            {this.renderPosts()}
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

export default connect(mapStateToProps)(Home);