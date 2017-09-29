import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image, Linking } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    Linking.openURL(data).catch(err => console.error('An error occured', err));
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
          <Text>Camera permission is not granted</Text> :
            
          <View style={{backgroundColor: '#2f7b99'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('./assets/images/logo3.png')} style={{width:260, height: 130, marginTop: 30}}/>
            </View>
            <View style={{width: 150, height: 150, borderColor: 'white', borderWidth: 4, position: 'absolute', top: '40%', left: '30%', zIndex: 100}}/>
            <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={{height: '100%', width: '100%'}}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    
    
    backgroundColor: '#ecf0f1',
  }
});