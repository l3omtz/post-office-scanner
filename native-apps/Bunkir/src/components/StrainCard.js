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

class StrainCard extends Component {

    constructor(){
        super()
        this.state = {
            strains : null
        }   
    }

    componentWillMount() {}

    render() {
        strain = this.props.strain
        nav = this.props.navigate
        return (
                <View style={styles.container} >
                    <Image source={{uri: strain.imgUrl}} style={{height: 230, width: '100%'}}>  
                        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 15, paddingLeft: 25}}>          
                            <Text style={{color: 'white', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '600'}}>{strain.name}</Text>
                            <Text style={{color: 'white', backgroundColor: 'rgba(255,255,255,0.0)'}}>{strain.type}</Text>
                        </View>
                    </Image>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        elevation: 1,
    }
});

export { StrainCard };
