// Import firebase for firebse methods
import firebase from 'firebase';
 
// Navition to call when action is being called 
import _ from 'lodash';

// Router Naigation 
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native'

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    PHONE_CHANGED,
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER,
    LOGIN_FACEBOOK,
    CURRENT_USER
} from './types'


// ***
// Email Auth
// ***
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type : PASSWORD_CHANGED,
        payload: text
    }
} 

export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        // Then firebase will load 
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( (user) => {
                alert('login success')
                AsyncStorage.setItem('token', user.uid);
                Actions.home()
                // firebase.database().ref('accounts')
                // .once('value').then(function(a) {

                //     var users = _.filter(a.val() , e=> e.profile.email === user.email);
                //     firebase.database().ref('accounts/'+users[0].userId+'/profile').update({new:false});
                    
                //     Actions.home({userid: users[0].userId});

                //     loginUserSuccess(dispatch, users[0].userId)
                // })
                // loginUserSuccess(dispatch, user);
            })
            .catch( (error) => {
                alert(error)
                loginUserFaild(dispatch)
            })
    };
}

export const createUser = ({ email, password, name, dob, nav }) => {
    return (dispatch) => {
        // Then firebase will load 
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (user) => {
            alert('User created');
            // Create a firebase user object
            firebase.database().ref('accounts').child(user.uid).set({
                profile:{
                    email: user.email,
                    name: name,
                    dob: dob,
                    provider: user.uid,
                    img: 'https://i.imgur.com/sVM01NQ.png',
                    new: true
                },
                userId: user.uid,
            })
            .then( u => {
                firebase.database().ref('accounts')
                .once('value').then( a => {
                    var _user = _.filter(a.val() , {userId:user.uid});
                    currentUserData(dispatch, _user[0])
                    nav.navigate('Home')
                })
            })
        })
        .catch((error) => {
            alert(error);
            // loginUserFaild(dispatch)
        });
    };
}

// ***
// Firebase helpers
// ***
export const currentUser = (_id) => {
    return (dispatch) => {
        firebase.database().ref('accounts')
        .once('value').then(function(a) {
            var _user = _.filter(a.val() , {userId:_id});
           currentUserData(dispatch, _user[0]);
		})
    };
}

const currentUserData = (dispatch, user) => {
    dispatch({
        type: CURRENT_USER,
        payload: user
    });
};

// Handle success or failer of login - for spinner and store user data 
const loginUserFaild = (dispatch, user) => {
    return (dispatch) => {
        alert('Login Failed');
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    // @TODO add route after success login
};
