import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { MainHeader } from '../Componets';

class Biz extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <MainHeader text="BIZ" iconName="bizIconW" title={true}/>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.centerGroup}>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/images/mileIcon.png')} style={styles.image}/>
                                <Text style={styles.text}>MileIQ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerGroup}>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={ () => Actions.expenseIt()}>
                                <Image source={require('../assets/images/expenseIcon.png')} style={styles.image}/>
                                <Text style={styles.text}>Expense It</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.centerGroup}>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/images/bizhealthIcon.png')} style={styles.image}/>
                                <Text style={styles.text}>Biz Health Meter</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerGroup}>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../assets/images/exchangeIcon.png')} style={styles.image}/>
                                <Text style={styles.text}>Biz Exchange</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 20,
      paddingRight: 20
    },
    text: {
        fontSize: 18,
        fontWeight: '300'
    },
    image: {
        height: 50, 
        width: 50,
        marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    centerGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: 0
    }
  });


export default Biz;