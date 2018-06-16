import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text } from 'native-base';


import { MainHeader, Button, ExpenseCard } from '../Componets';

class ExpenseFilter extends Component {

    constructor(){
        super();
        this.state = { 
            all: false,
            personal: false,
            business: false,
            employees: false,
            retirement: false,
            rent: false,
            interest: false,
            taxes: false,
            insurance: false,
            other: false,
            allSelcted: false
        }
    }

    async triggerAll() {
        let main = await this.setState({all: !this.state.all})

        if (this.state.all) {
            this.setState(
                {
                    personal: true,
                    business: true,
                    employees: true,
                    retirement: true,
                    rent: true,
                    interest: true,
                    taxes: true,
                    insurance: true,
                }
            )
        } else {
            this.setState(
                {
                    personal: false,
                    business: false,
                    employees: false,
                    retirement: false,
                    rent: false,
                    interest: false,
                    taxes: false,
                    insurance: false,
                }
            )
        }

    }

    render() {
        console.log(this.props);
        return (
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                        <TouchableOpacity onPress={ () => Actions.pop()}>
                            <Icon type="Ionicons" name="ios-arrow-back" style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 20}}>Filters</Text>
                        <TouchableOpacity onPress={ () => Actions.pop()}>
                            <Icon type="Ionicons" name="ios-checkmark" style={{color: 'white', fontSize: 60}}/>
                        </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View>
                        <View style={{paddingBottom: 40}}>
                            <Text style={{fontSize: 17, textAlign: 'center', color: '#2fabb2', fontWeight: '500'}}>CATEGORY</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => this.triggerAll()}>
                                    {
                                        this.state.all &&
                                        <Image source={require('../assets/images/all2.png')} style={styles.image}/>

                                    }
                                    {
                                        !this.state.all &&
                                    <   Image source={require('../assets/images/all.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({personal: !this.state.personal})
                                }}>
                                    {
                                        this.state.personal &&
                                        <Image source={require('../assets/images/personal2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.personal &&
                                        <Image source={require('../assets/images/personal.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({business: !this.state.business})
                                }}>
                                    {
                                        this.state.business &&
                                        <Image source={require('../assets/images/business2.png')} style={styles.image}/>

                                    }
                                    {
                                        !this.state.business &&
                                        <Image source={require('../assets/images/business.png')} style={styles.image}/>

                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({employees: !this.state.employees})
                                }}>
                                    {
                                        this.state.employees &&
                                        <Image source={require('../assets/images/employees2.png')} style={styles.image}/>

                                    }
                                    {
                                        !this.state.employees &&
                                        <Image source={require('../assets/images/employees.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({retirement: !this.state.retirement})
                                }}>
                                    {
                                        this.state.retirement &&
                                        <Image source={require('../assets/images/retirement2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.retirement &&
                                    <   Image source={require('../assets/images/retirement.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({rent: !this.state.rent})
                                }}>
                                    {
                                        this.state.rent &&
                                        <Image source={require('../assets/images/rent2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.rent &&
                                        <Image source={require('../assets/images/rent.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({interest: !this.state.interest})
                                }}>
                                    {
                                        this.state.interest &&
                                        <Image source={require('../assets/images/interest2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.interest &&
                                        <Image source={require('../assets/images/interest.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({taxes: !this.state.taxes})
                                }}>
                                    {
                                        this.state.taxes &&
                                        <Image source={require('../assets/images/taxes2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.taxes &&
                                        <Image source={require('../assets/images/taxes.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.all) {
                                        this.setState({all: false})
                                    }
                                    this.setState({insurance: !this.state.insurance})
                                }}>
                                    {
                                        this.state.insurance &&
                                        <Image source={require('../assets/images/insurance2.png')} style={styles.image}/>

                                    }
                                    {
                                        !this.state.insurance &&
                                        <Image source={require('../assets/images/insurance.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.centerGroup}>
                                <TouchableOpacity onPress={() => this.setState({other: !this.state.other})}>
                                    {
                                        this.state.other &&
                                        <Image source={require('../assets/images/other2.png')} style={styles.image}/>
                                    }
                                    {
                                        !this.state.other &&
                                        <Image source={require('../assets/images/other.png')} style={styles.image}/>
                                    }
                                </TouchableOpacity>
                            </View>
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
      display: 'flex', 
      justifyContent: 'center',
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
    image: {
        height: 100, 
        width: 100,
        // marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
        marginBottom: 25,
    },
    centerGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: 0
    }

  });


export default ExpenseFilter;