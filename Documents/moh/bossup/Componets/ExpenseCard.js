import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

class ExpenseCard extends Component {


    render() {
        const { name, date, amount } = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View/>
                <Text style={styles.header}>{name.toUpperCase()}</Text>
                <TouchableOpacity>
                    <Icon type="Ionicons" name="ios-copy-outline" style={styles.icon}/>
                </TouchableOpacity>
            </View> 

            <View style={styles.bottomRow}>
                <View style={styles.row}>
                    <Text style={styles.text}>Cost</Text>
                    <Text style={styles.subText}>${amount} / mon</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Date</Text>
                    <Text style={styles.subText}>{date}</Text>
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#2fabb2',
    marginLeft: 15
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5, 
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#2fabb2',
  },
  row: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  header: {
    fontSize: 17,
    fontWeight: '600', 
    color: 'white'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  icon: {
    color: 'white'
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    color: '#4a4a4a'
  },
  subText: {
    paddingTop: 6,
    fontSize: 16,
    fontWeight: '300',
    color: '#2fabb2'
  }
});

export { ExpenseCard };
