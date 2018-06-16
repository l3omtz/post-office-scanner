import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native'
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Profile from './Screens/Profile';
import Biz from './Screens/Biz';
import Home from './Screens/Home';
import Earn from './Screens/Earn';
import Wallet from './Screens/Wallet';

import ExpenseIt from './Screens/ExpenseIt';
import ExpenseList from './Screens/ExpenseList';
import ExpenseFilter from './Screens/ExpenseFilter';
import CameraScreen from './Screens/Camera';


class RouterComponent extends Component {
    
    // Tab Icons
    ProfileIcon = (props) => {
        if(props.focused){
            return (
                <Image source={require('./assets/images/meIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/meIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    BizIcon = (props) => {
        if(props.focused){
            return (
                <Image source={require('./assets/images/bizIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/bizIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    HomeIcon = (props) => {
        if(props.focused){
            return (
                <Image source={require('./assets/images/homeicon2.png')} style={{height: 60, width: 60, top: -15}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/homeicon2.png')} style={{height: 60, width: 60, top: -15,}}/>
            )
        }
    };
    EarnIcon = (props) => {
        if(props.focused){
            return (
                <Image source={require('./assets/images/earnIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/earnIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    WalletIcon = (props) => {
        if(props.focused){
            return (
                <Image source={require('./assets/images/walletIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/walletIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };

    render() {
        return (
            <Router>

                <Scene key="main" tabs showLabel={false} hideNavBar type={ActionConst.RESET} tabBarStyle={style.tabBarStyle}>
                    <Scene key="profile" icon={this.ProfileIcon}>
                        <Scene key="profiles" component={Profile} hideNavBar />
                    </Scene>

                    <Scene key="biz" icon={this.BizIcon}>
                        <Scene key="bizs" component={Biz} hideNavBar />
                        <Scene key="expenseIt" component={ExpenseIt} hideNavBar  />
                        <Scene key="expenseList" component={ExpenseList} hideNavBar hideTabBar/>
                        <Scene key="expenseFilter" component={ExpenseFilter} hideNavBar hideTabBar/>
                        <Scene key="camera" component={CameraScreen} hideNavBar hideTabBar />
                    </Scene>

                    <Scene key="home" icon={this.HomeIcon}>
                        <Scene key="homes" component={Home} hideNavBar />
                    </Scene>

                    <Scene key="earn" icon={this.EarnIcon}>
                        <Scene key="earns" component={Earn} hideNavBar />
                    </Scene>

                    <Scene key="wallet" icon={this.WalletIcon}>
                        <Scene key="wallets" component={Wallet} hideNavBar />
                    </Scene>

                </Scene>

            </Router>
        );
    }
};

const style = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: .5,
        borderColor: '#b7b7b7',
        backgroundColor: 'white',
        zIndex: 100
    }
});

export default RouterComponent;
