import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements'


class ProfileHeader extends Component {

  render() { 
    nav = this.props.navigate
    return (
        <View style={{}}>
            <Image source={require('../../assets/images/profileback.png')}
            style={{height: 150, width: '100%', paddingTop: 25, paddingLeft: 15, paddingRight: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => nav.navigate('DrawerOpen')}>
                        <Icon
                        name='md-menu'
                        type='ionicon'
                        color='white'
                        size={25}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Icon
                        name='ios-settings-outline'
                        type='ionicon'
                        color='white'
                        size={30}
                        />
                    </TouchableOpacity> */}
                </View>
            </Image>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});

export { ProfileHeader };
