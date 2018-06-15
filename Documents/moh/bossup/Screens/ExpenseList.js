import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
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
                        <TouchableOpacity onPress={ () => Actions.pop()}>
                            <Icon type="MaterialIcons" name="filter-list" style={{color: 'white'}}/>
                        </TouchableOpacity>
                </View>
                <Container>
                    <Content>
                    <List>
                        <ListItem avatar>
                        <Left>
                        <TouchableOpacity>
                            <Icon type="Ionicons" name="ios-copy-outline" style={styles.icon}/>
                        </TouchableOpacity>
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                        </Body>
                        <Right>
                            <Text note>3:43 pm</Text>
                        </Right>
                        </ListItem>
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
    }
  });


export default ExpenseList;