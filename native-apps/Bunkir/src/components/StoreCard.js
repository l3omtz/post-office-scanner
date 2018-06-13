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

class StoreCard extends Component {

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
                    <Image source={{uri: strain.Image}} style={{height: 230, width: '100%'}}>  
                        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 4, paddingLeft: 25}}>          
                            <Text style={{color: 'black', backgroundColor: 'rgba(255,255,255,0.0)', fontWeight: '600'}}>{strain.name}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection:'row', paddingBottom: 15, paddingLeft: 25}}>
                            <Icon
                            name='md-star'
                            type='ionicon'
                            color='#4CAF50'
                            size={25}
                            />
                            <Icon
                            name='md-star'
                            type='ionicon'
                            color='#4CAF50'
                            size={25}
                            />
                            <Icon
                            name='md-star'
                            type='ionicon'
                            color='#4CAF50'
                            size={25}
                            />
                            <Icon
                            name='md-star'
                            type='ionicon'
                            color='#4CAF50'
                            size={25}
                            />
                            <Icon
                            name='md-star'
                            type='ionicon'
                            color='#4CAF50'
                            size={25}
                            />
                        </View>
                    </Image>
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

export { StoreCard };
