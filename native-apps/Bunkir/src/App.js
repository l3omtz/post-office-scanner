import React, { Component } from 'React';
import { View, Text } from 'react-native';
// import { Tabs, Drawer, Root } from './Router';
// import Login from './layouts/Login';
import Router from './Router';
// Stuff needed for Redux to work in app
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'; 
import reducers from './reducers';

import firebase from 'firebase';

class App extends Component {

  componentWillMount(){
    // Load Firebase when app mounts
    // if (!firebase.apps.length) {
    //   firebase.initializeApp({
    //     apiKey: "AIzaSyAXhzxk6PWqZFfFsezr5zGu8ifnvDbUatY",
    //     authDomain: "bunkir-18f7d.firebaseapp.com",
    //     databaseURL: "https://bunkir-18f7d.firebaseio.com",
    //     projectId: "bunkir-18f7d",
    //     storageBucket: "",
    //     messagingSenderId: "75955752120"
    //   });
    // }
  }

  render() {
    return(
      // Set prover to create redux store 
      // Launch Router first to navigate
      <Provider store={ createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
        {/* <Root /> */}
        <Router />
      </Provider>

      // <Text>TESHSTHSTHSrth</Text>
    );
  }
}

export default App;
