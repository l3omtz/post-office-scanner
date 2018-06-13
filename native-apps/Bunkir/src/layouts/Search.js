import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';



class Search extends Component {

constructor(){
    super();
    this.state = {
        users: [],
        text: ''
    }
}

  render() {
    return (
        <View style={styles.top}>
                <SearchBar
                    lightTheme
                    round
                    onChangeText={ text => this.setState({text:text}) }
                    placeholder='Search Strains' 
                    containerStyle={{
                    backgroundColor: 'white',
                    width: '80%',
                    marginLeft: 40,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                    }}
                />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    top: {
        marginTop: 20, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        paddingBottom: 5,
        paddingTop: 5
    }
})

export default Search;