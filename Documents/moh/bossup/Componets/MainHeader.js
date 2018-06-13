import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

class MainHeader extends Component {

    renderIcon(icon) {
        if (icon === 'bizIconW') {
            return <Image source={require('../assets/images/bizIconW.png')} style={{width: 20, height: 20}}/>
        }
    }

    render() {
        const { text, iconName, title } = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Image source={require('../assets/images/logoWhite.png')} style={{width: 26, height: 28}}/>
                <TouchableOpacity style={{position: 'absolute', right: 20}}>
                    <Icon type="EvilIcons" name="gear" style={styles.rightIcon}/>
                </TouchableOpacity>
            </View> 
            {
                title &&
                <View style={styles.bottomRow}>
                    {this.renderIcon(iconName)}
                    <Text style={styles.text}>{text}</Text>
                </View>
            }
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 150,
    backgroundColor: '#2fabb2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  topRow: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    marginBottom: 20,
  },
  rightIcon: {
    fontSize: 30,
    color: 'white'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    paddingTop: 10
  }
});

export { MainHeader };
