import { 
    Scene, 
    Router, 
    TabBar, 
    Modal, 
    Schema, 
    Actions, 
    Reducer, 
    ActionConst
} from 'react-native-router-flux'
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
// import NavigationDrawer from './NavigationDrawer'
// import MenuIcon from '../assets/images/home.png'

// Tab navigation
import Home from './layouts/Home'
import Strains from './layouts/Strains'
import Store from './layouts/Store'
import Profile from './layouts/Profile'

// Components to route to 
import Login from './layouts/Login'
import SignUp from './layouts/SignUp'
import Walkthrough from './layouts/Walkthrough'
import ForgotPassword from './layouts/ForgotPassword'

import DetailPost from './layouts/DetailPost'

import Search from './layouts/Search'
// import SideMenu from './SideMenu'

import HybridStrain from './layouts/HybridStrain'
import IndicaStrain from './layouts/IndicaStrain'
import SativaStrain from './layouts/SativaStrain'
import DetailStrain from './layouts/DetailStrain'

import Dispensaries from './layouts/Dispensaires'
import DetailDispensatie from './layouts/DetailDisp'


class RouterComponent extends Component {
	render() {
		return (
			<Router>
					<Scene key="bs">
						<Scene key="first" hideNavBar hideTabBa> 
							<Scene key="walkthrough" component={Walkthrough} hideNavBar/>
						</Scene>

						{/* <Scene key="main" tabs hideNavBar type={ActionConst.RESET} tabBarStyle={styles.tabBarStyle}>
							<Scene key="location" component={Location} hideNavBar  icon={this.LocationIcon} type={ActionConst.REFRESH}/>
							<Scene key="passes"   component={Passes}   hideNavBar  icon={this.PassesIcon}/>
							<Scene key="checkin"  component={Checkin}  hideNavBar  icon={this.CheckinIcon}/>
							<Scene key="booking"  component={Booking}  hideNavBar  icon={this.BookingIcon}/>
							<Scene key="profile"  component={Profile}  hideNavBar  icon={this.ProfileIcon}/>
							<Scene key="help"     component={Help}     hideNavBar />
						</Scene>
						``
						<Scene key="signup"   component={SignUp}   hideNavBar hideTabBar animation="vertical"/>
		
						<Scene key="signin"   component={SingIn}   hideNavBar hideTabBar animation="vertical"/>
		
						<Scene key="newcard" component={NewCard} hideNavBar hideTabBar/>
		
						<Scene key="terms" component={Terms} hideNavBar hideTabBar animation="vertical"/>
		
						<Scene key="detail" hideNavBar hideTabBar > 
							<Scene key="locationDetail" component={LocationDetail} type={ActionConst.RESET}/>
						</Scene> */}
					</Scene>
			</Router> 
		)
	}
}

const styles = StyleSheet.create({
    tabFont: {
        fontSize: 10,
        color: 'white'
    },
    tabBarStyle: {
        borderTopWidth: .5,
        borderColor: '#b7b7b7',
        height: 65, 
        backgroundColor: '#144151',
        // zIndex: -1
    }
});

export default RouterComponent;
    