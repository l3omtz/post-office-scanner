import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { MainHeader, Button } from '../Componets';

class ExpenseIt extends Component {

    constructor(){
        super();
        this.state ={ 
            hasExpense: true,
            date: moment().format("MM/DD/YYYY"),
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <MainHeader title={false}/>
                <View style={styles.topBar}>
                    <Text style={styles.moneyText}>$0,000.00</Text>
                    <Text style={styles.subText}>Amount Logged</Text>
                </View>
                <View style={styles.container}>
                    {
                        !this.state.hasExpense &&
                            <View style={styles.noExpense}>
                                <View style={{paddingBottom: 30}}>
                                    <Text style={styles.maintext}>YOU DO NOT HAVE ANY EXPENSES YET!</Text>
                                    <Text style={styles.lighttext}>Add a new expense to your log!</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({hasExpense: true})}>
                                    <Button bgColor="#2fabb2" txtSize={15} width="100%" text="ADD EXPENSE"/>
                                </TouchableOpacity>
                            </View>
                    }
                    {
                        this.state.hasExpense &&
                        <View>
                            <Text style={styles.header}>ADD NEW EXPENSE</Text>

                            <View style={{paddingTop: 20}}>
                                <View style={styles.row}>
                                    <Text style={{fontSize: 16}}>Expense: </Text>
                                    <TextInput
                                    style={styles.input1}
                                    placeholder={'Expense Name'}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={{fontSize: 16}}>Date: </Text>
                                    <DatePicker
                                        style={{width: 210}}
                                        date={this.state.date}
                                        mode="date"
                                        format="MM-DD-YYYY"
                                        minDate="05-01-1970"
                                        maxDate="06-01-2020"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        placeholder="Set event date"
                                        customStyles={{
                                            dateIcon: {
                                                display:'none'
                                            },
                                            dateInput: {
                                                borderColor:'#9b9b9b',
                                                borderTopWidth: 0,
                                                borderRightWidth: 0,
                                                borderLeftWidth: 0,
                                                borderBottomWidth: 0.5,
                                                width: '100%',
                                                height: 20,
                                                alignItems: 'flex-start'
                                            },
                                            dateText: {
                                                fontSize: 15
                                            },
                                        }}
                                        onDateChange={ (date) => {
                                            this.setState({dateError: false});
                                        }}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={{fontSize: 16}}>Cost: </Text>
                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                        <Text style={styles.money}>$</Text>
                                        <TextInput
                                        keyboardType="numeric"
                                        style={styles.input}
                                        placeholder={'0.00'}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                                <View style={styles.rowLast}>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={ () => Actions.camera()}>
                                            <Image source={require('../assets/images/camera.png')} style={{height: 40, width: 40}}/>
                                        </TouchableOpacity>
                                        <Text style={styles.cameratxt}>RECEIPT CAPTURE</Text>
                                    </View>
                                    <Button bgColor="#2fabb2" txtSize={15} width={100} text="SUBMIT"/>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 30,
      paddingLeft: 40,
      paddingRight: 40,
    },
    noExpense: {
        justifyContent: 'center',
        display: 'flex',
        height: '100%'
    },
    topBar: {
        backgroundColor: '#2fabb2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    moneyText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600'
    },
    subText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '300'
    },
    maintext: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 10
    },
    lighttext: {
        fontSize: 15,
        fontWeight: '300',
        color: '#2fabb2',
        textAlign: 'center'
    },
    image: {
        height: 50, 
        width: 50,
        marginBottom: 10
    },
    header: {
        fontSize: 15, 
        color: '#2fabb2', 
        fontWeight: '500'
    },
    input : {
        paddingRight: 5,
        paddingLeft: 10,
        fontSize: 15,
        borderColor: '#9b9b9b', 
        borderWidth: 0,
        borderBottomWidth: 1,
        width: 180,
    },
    input1 : {
        paddingRight: 5,
        fontSize: 15,
        borderColor: '#9b9b9b', 
        borderWidth: 0,
        borderBottomWidth: 1,
        width: 210,
        paddingBottom: 5
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    rowLast: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingTop: 30
    },
    money: {
        backgroundColor: '#9B9B9B',
        fontWeight: '300',
        color: 'white',
        width: 30,
        textAlign: 'center',
        paddingTop: 5, 
        paddingBottom: 5
    },
    cameratxt: {
        color: '#4a4a4a',
        paddingTop: 5, 
        fontWeight: '300', 
        fontSize: 12
    }
  });


export default ExpenseIt;