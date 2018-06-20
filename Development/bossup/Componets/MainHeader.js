import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
moment.locale('en');
class MainHeader extends Component {

    constructor(){
        super();
        this.state ={ 
        }
    }

    renderIcon(icon) {
        if (icon === 'bizIconW') {
            return <Image source={require('../assets/images/bizIconW.png')} style={{width: 20, height: 20}}/>
        }
    }

    render() { 
        const { logo, text, iconName, title, listData, calendar, showCalendar } = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.leftIcons}>
                    {
                        this.props.calendar &&    
                            <TouchableOpacity onPress={ () => Actions.pop()}>
                                <Icon type="Ionicons" name="ios-arrow-back" style={{color: 'white'}}/>
                            </TouchableOpacity>
                    }
                </View>
                {
                    logo &&
                    <Image source={require('../assets/images/logoWhite.png')} style={{width: 26, height: 28}}/>
                }
                {
                    calendar &&
                    <TouchableOpacity onPress={() => this.props.action()} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontSize: 25, fontWeight: '600'}}>{moment(new Date(calendar)).format('MMMM')}</Text>
                        {
                            showCalendar &&
                            <Icon type="EvilIcons" name="chevron-up" style={styles.rightIcon}/>   
                        }
                        {
                            !showCalendar &&
                            <Icon type="EvilIcons" name="chevron-down" style={styles.rightIcon}/>   
                        }
                    </TouchableOpacity>
                }
                <View style={styles.rightIcons}>
                    {
                        this.props.listIcon &&    
                            <TouchableOpacity onPress={ () => Actions.expenseList({listData: listData})}>
                                <Icon type="Feather" name="list" style={styles.listIcon}/>
                            </TouchableOpacity>
                    }
                    <TouchableOpacity>
                        <Icon type="EvilIcons" name="gear" style={styles.rightIcon}/>
                    </TouchableOpacity>
                </View>
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
  listIcon: {
    fontSize: 25,
    color: 'white',
    paddingRight: 6
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    paddingTop: 10
  },
  rightIcons: {
    position: 'absolute',
    right: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  leftIcons: {
    position: 'absolute',
    left: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  }
});

export { MainHeader };
