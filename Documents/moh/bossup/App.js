import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'; 

import Router from './Router';

class App extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

export default App;