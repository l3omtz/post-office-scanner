import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

class Button extends Component {
  render() {
    const { bgColor, txtSize, width, borderColor, text, borderWidth } = this.props;

    return (
      <View style={{
        width: width,
        backgroundColor: bgColor,
        borderRadius: 5,
        borderColor: borderColor,
        borderWidth: borderWidth
      }}>
        <Text style={{
          alignSelf: 'center',
          color: 'white',
          fontSize: txtSize,
          fontWeight: 'bold',
          paddingTop: 12,
          paddingBottom: 12
        }}>
          {text}
        </Text>
      </View>
    );
  }
}

export { Button };
