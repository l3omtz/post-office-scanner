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
import CameraScreen from './Screens/Camera';
import ExpenseList from './Screens/ExpenseList';

class RouterComponent extends Component {
    
    // Tab Icons
    ProfileIcon = ({selected, title}) => {
        if(selected){
            return (
                <Image source={require('./assets/images/meIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/meIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    BizIcon = ({selected, title}) => {
        if(selected){
            return (
                <Image source={require('./assets/images/bizIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/bizIcon3.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    HomeIcon = ({selected, title}) => {
        if(selected){
            return (
                <Image source={require('./assets/images/homeicon2.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/homeicon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    EarnIcon = ({selected, title}) => {
        if(selected){
            return (
                <Image source={require('./assets/images/earnIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }else{
            return(
                <Image source={require('./assets/images/earnIcon2.png')} style={{height: 25, width: 25}}/>
            )
        }
    };
    WalletIcon = ({selected, title}) => {
        if(selected){
            return (
                <Image source={require('./assets/images/walletIcon2.png')} style={{height: 25, width: 25}}/>
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

                    <Scene key="biz" icon={this.BizIcon}>
                        <Scene key="bizs" component={Biz} hideNavBar />
                        <Scene key="expenseIt" component={ExpenseIt} hideNavBar  />
                        <Scene key="expenseList" component={ExpenseList} hideNavBar hideTabBar/>
                        <Scene key="camera" component={CameraScreen} hideNavBar hideTabBar />
                    </Scene>

                    <Scene key="profile" icon={this.ProfileIcon}>
                        <Scene key="profiles" component={Profile} hideNavBar />
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
