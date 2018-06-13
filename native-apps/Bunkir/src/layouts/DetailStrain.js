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
import firebase from 'firebase';
import { ReviewCard } from '../components'
import MainHeader  from '../components/MainHeader';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import _ from 'lodash'
import Modal from 'react-native-modal'

class DetailStrain extends Component {

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
        this.getComments();
    }

    getComments() {
        strain = this.props.navigation.state.params.strain
        firebase.database().ref('strains/' + strain.type + '/' + strain.loc).child('comments')
        .on('value', (comments) => {
            comments =_.toArray(comments.val());
            this.setState({comments})
        })
    }
    renderComments() {
        if(this.state.comments) {
            if(this.state.comments.length > 0) {
                return (
                    <View style={{flex: 1}}> 
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

    post() {
        strain = this.props.navigation.state.params.strain
          firebase.database().ref('strains/' + strain.type + '/' + strain.loc).child('comments').push({
            user: this.props.me.userId,
            comment: this.state.comment
          }).catch( (err) => {
              console.log(err)
          }).then( (post) => {
            this.setState({ isModalVisible: false });
            firebase.database().ref('strains/' + strain.type + '/' + strain.loc + '/comments' + ref.key).update({id: ref.key});
          })
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
                <Image source={{uri: strain.imgUrl}} style={{width: '100%', height: 300}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 15, paddingLeft: 25}}>          
                        <Text style={{color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '600'}}>{strain.name}</Text>
                        <Text style={{color: 'white', backgroundColor: 'rgba(255,255,255,0.0)'}}>{strain.type}</Text>
                    </View>
                </Image>
                <View style={{paddingTop: 10, paddingLeft: 25, paddingRight: 25}}>
                    <ScrollView style={{marginBottom: 600, height: '100%'}}>
                        <Text style={Styles.header}>About</Text>

                        <Text style={Styles.textSpace}>{strain.details}</Text>
                        <Text style={Styles.txt}>Ailments: {strain.ailments}</Text>
                        <Text style={Styles.txt}>ratio: {strain.ratio}</Text>
                        <Text style={Styles.txt}>THC: {strain.thc}</Text>
                        <Text style={Styles.textSpace}>CBD: {strain.cbd}</Text>

                        <View style={{height:1, width: '100%', backgroundColor: '#BDBDBD'}}/>

                        <Text style={Styles.header}>Find it </Text>
                        <Text style={Styles.txt}>{strain.location.city1}</Text>
                        <Text style={Styles.txt}>{strain.location.city2}</Text>
                        <Text style={Styles.textSpace}>{strain.location.city3}</Text>

                        <View style={{height:1, width: '100%', backgroundColor: '#BDBDBD'}}/>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                            <Text style={Styles.header}>Reviews </Text>
                            <TouchableOpacity onPress={ () => this.setState({isModalVisible: true})}>
                                <Icon
                                name='ios-create-outline'
                                type='ionicon'
                                color='#4CAF50'
                                size={28}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom: 350}}>
                            {this.renderComments()}
                        </View>
                    </ScrollView>
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
                        <Text style={{color: 'black'}}>Write a review on this strain</Text>
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
  
  export default connect(mapStateToProps)(DetailStrain);
