import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { MainHeader, Button, ExpenseCard } from '../Componets';

class ExpenseIt extends Component {

    constructor(){
        super();
        this.state ={ 
            hasExpense: true,
            date: moment().format("MM/DD/YYYY"),
            amountLogged: '0,000.00',
            amountEnterd: null,
            expenseName: null,
            expenses: [],
            expenselist: true
        }
    }

    async submitExpense() {

        if (this.state.expenses.length > 0) {
            let update = await this.setState({amountLogged: Number(this.state.amountEnterd) + this.state.amountLogged});
        } else {
            let setExpense = await this.setState({amountLogged: Number(this.state.amountEnterd), expenselist: true});
        }

        let addExpense = await this.setState({ expenses: [...this.state.expenses, {name: this.state.expenseName, amount: this.state.amountEnterd, date: this.state.date}]});


        let clearForm = await this.setState({amountEnterd: null, dare: moment().format("MM/DD/YYYY"), expenseName: null});

    }

    getexpensesCards() {
        if (this.state.expenses.length > 0) {
            return this.state.expenses.map((expense, key) => {
                return (
                    <View key={key}>
                        <ExpenseCard key={key} name={expense.name} date={expense.date} amount={expense.amount}/>
                    </View>
                )
            })
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MainHeader title={false} listIcon={this.state.expenselist}/>
                <View style={styles.topBar}>
                    <Text style={styles.moneyText}>${this.state.amountLogged}</Text>
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
                            <View>
                                <Text style={styles.header}>ADD NEW EXPENSE</Text>

                                <View style={{paddingTop: 20}}>
                                    <View style={styles.row}>
                                        <Text style={{fontSize: 16}}>Expense: </Text>
                                        <TextInput
                                        value={this.state.expenseName}
                                        style={styles.input1}
                                        placeholder={'Expense Name'}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={(text => this.setState({expenseName: text}))}
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
                                                }
                                            }}
                                            onDateChange={ (date) => {
                                                this.setState({date: date});
                                            }}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={{fontSize: 16}}>Cost: </Text>
                                        <View style={{display: 'flex', flexDirection: 'row'}}>
                                            <Text style={styles.money}>$</Text>
                                            <TextInput
                                            value={this.state.amountEnterd}
                                            returnKeyType="done"
                                            keyboardType="numeric"
                                            style={styles.input}
                                            placeholder={'0.00'}
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            onChangeText={(text) => this.setState({amountEnterd: text})}
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

                                        <TouchableOpacity onPress={() => {
                                            this.state.amountEnterd && this.state.expenseName ? this.submitExpense() : alert('Enter name or cost');
                                        }}>
                                            <Button bgColor={ this.state.amountEnterd && this.state.expenseName ? "#2fabb2" : '#ebeced'} txtSize={15} width={100} text="SUBMIT"/>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </View>

                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {
                        this.state.hasExpense &&
                            <ScrollView horizontal={true} bounces={true} style={{position: 'absolute', bottom: 60}}>
                                {this.getexpensesCards()}
                            </ScrollView>
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