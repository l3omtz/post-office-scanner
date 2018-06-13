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

class ReviewCard extends Component {

    constructor(){
        super()
        this.state = {
            user: null
        }   
    }

    componentWillMount() {
        this.getUser();
    }

    

    getUser() {
        firebase.database().ref('accounts/'+ this.props.review.user)
        .once('value').then( (user) => {
            this.setState({user: user.val()})
        })
    }

    renderDetails() {
        if(this.state.user){
            user = this.state.user.profile
            review = this.props.review
            return (
                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                    <Image source={{uri: user.img}} style={{height: 60, width: 60, borderRadius: 30, borderColor: 'white', borderWidth: 5}}/>
                    <View style={{paddingLeft: 8}}>
                        <Text style={{fontWeight: 'bold'}}>{user.name}</Text>
                        <Text>{review.comment}</Text>
                    </View>
                </View>
            )
        }
    }

    render() {
        review = this.props.review
        nav = this.props.navigate
        return (
                <View style={styles.container} >
                    {/* <Text>{review.comment}</Text> */}
                    {this.renderDetails()}
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
    }
});

export { ReviewCard };
