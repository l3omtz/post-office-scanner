import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text } from 'native-base';


import { MainHeader, Button, ExpenseCard } from '../Componets';

class ExpenseList extends Component {

    constructor(){
        super();
        this.state ={ 
            hasExpense: true,
            date: moment().format("MM/DD/YYYY"),
            amountLogged: '0,000.00',
            amountEnterd: null,
            expenseName: null,
            expenses: [],
            expenselist: false
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                        <TouchableOpacity onPress={ () => Actions.pop()}>
                            <Icon type="Ionicons" name="ios-arrow-back" style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 20}}>List View</Text>
                        <TouchableOpacity onPress={ () => Actions.expenseFilter()}>
                            <Icon type="MaterialIcons" name="filter-list" style={{color: 'white'}}/>
                        </TouchableOpacity>
                </View>
                <Container>
                    <Content>
                        <View style={styles.infoBar}>
                            <Text style={styles.infoText}>Expense</Text>
                            <Text style={styles.infoText}>Cost/month</Text>
                        </View>
                    <List>
                        {
                            this.props.listData.map( (expense, key) => {
                                return (
                                    <ListItem avatar key={key}>
                                        <Left>
                                        <TouchableOpacity>
                                            <Icon type="Ionicons" name="ios-copy-outline" style={styles.icon}/>
                                        </TouchableOpacity>
                                        </Left>
                                        <Body>
                                            <Text style={styles.name}>{expense.name}</Text>
                                            <Text note>{expense.date}</Text>
                                        </Body>
                                        <Right style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text note style={styles.amount}>${expense.amount}</Text>
                                        </Right>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                    </Content>
                </Container>

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
    topBar: {
        height: 80,
        backgroundColor: '#2fabb2',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    infoBar: {
        backgroundColor: '#4a4a4a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    infoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300'
    },
    name: {
        fontSize: 20,
    },
    amount: {
        color: '#2fabb2',
        fontSize: 19
    },
    icon: {
        color: 'gray',
        fontSize: 30
    },
  });


export default ExpenseList;