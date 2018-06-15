import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { Button } from '../Componets';

class CameraScreen extends Component {

    constructor(){
        super();
        this.state ={ 
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photoTaken: null,
            edit: false,
            price: '0.00'
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.setState({photoTaken: photo.uri});
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={ () => Actions.pop()}>
                            <Icon type="Ionicons" name="ios-arrow-back" style={{color: 'white'}}/>
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 17}}>Receipt Capture</Text>
                        <View/>
                    </View>
                    <View style={{ flex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {
                            this.state.photoTaken &&
                            <ImageBackground source={{uri: this.state.photoTaken}} style={{flex: 2, backgroundColor: 'red', width: '100%'}}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 24, fontWeight: '500', paddingTop: 10}}>Total ${this.state.price}</Text>
                                {
                                    this.state.edit &&
                                    <View style={{flex: 1, display: 'flex', alignItems: 'center', marginTop: '25%'}}>
                                        <View style={{backgroundColor: '#2fabb2', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight:50, paddingTop: 30, paddingBottom: 30}}>
                                            <TouchableOpacity style={{position: 'absolute', right: 15, top: 0}} onPress={() => this.setState({edit: false, price: '0.00'})}>
                                                <Icon type="Ionicons" name="ios-close-outline" style={{color: 'white', fontSize: 50}}/>
                                            </TouchableOpacity>
                                            <Image source={require('../assets/images/editWhite.png')} style={{height: 55, width: 55}}/>
                                            <Text style={{fontSize:22, color: 'white', paddingTop: 10}}>ENTER AMOUNT</Text>
                                            <View style={styles.row}>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Text style={styles.money}>$</Text>
                                                    <TextInput
                                                    keyboardType="numeric"
                                                    style={styles.input}
                                                    placeholder={'0.00'}
                                                    autoCorrect={false}
                                                    autoCapitalize="none"
                                                    placeholderTextColor="white"
                                                    returnKeyType="done"
                                                    onChangeText={(text) => this.setState({price: text})}
                                                    />
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => this.setState({edit: false})}>
                                                <Button borderColor="white" borderWidth={1} bgColor="#2fabb2" txtSize={15} width={100} text="SUBMIT"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }

                                <TouchableOpacity style={{position: 'absolute', right: 20, bottom: 120}} onPress={ () => this.setState({edit: true}) }>
                                    <Image source={require('../assets/images/cameraEdit.png')} style={{height: 40, width: 40}}/>
                                </TouchableOpacity>
                            </ImageBackground>
                        }
                        

                        <View style={styles.actionBar}>

                            {
                                !this.state.photoTaken &&
                                <TouchableOpacity style={{}}
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                        });
                                    }}
                                    >
                                    <Icon type="Ionicons" name="ios-refresh-outline" style={{color: 'white', fontSize: 50}}/>
                                </TouchableOpacity>
                            }
                            {
                                this.state.photoTaken &&
                                <TouchableOpacity style={{}} onPress={() => { this.setState({photoTaken: null}) }}>
                                    <Icon type="Ionicons" name="ios-close-outline" style={{color: 'white', fontSize: 50}}/>
                                </TouchableOpacity>
                            }

                            {
                                !this.state.photoTaken &&
                                <TouchableOpacity onPress={ () => this.snap() } style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{height: 58, width: 58, borderRadius: 29, backgroundColor: '#2fabb2'}}/>
                                    <View style={{position: 'absolute', height: 68, width: 68, borderRadius: 34, backgroundColor: 'rgba(255,255,255, 0.0)', borderColor: '#2fabb2', borderWidth: 1}}/>
                                </TouchableOpacity>
                            }
                            {
                                this.state.photoTaken &&
                                <View/>
                            }
                            
                            {
                                this.state.photoTaken &&
                                <TouchableOpacity style={{}} onPress={ () => Actions.pop()}>
                                    <Icon type="Ionicons" name="ios-checkmark" style={{color: 'white', fontSize: 65}}/>
                                </TouchableOpacity>
                            }
                            {
                                !this.state.photoTaken &&
                                <View/>
                            }
                        </View>
                    </View>
                </Camera>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#2fabb2',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 30
    },
    actionBar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'rgba(38, 38, 38, 0.69)',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10, 
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 30,
        paddingTop: 30
    },
    input : {
        paddingRight: 5,
        paddingLeft: 10,
        fontSize: 15,
        borderColor: 'white', 
        borderWidth: 0,
        borderBottomWidth: 1,
        width: 180,
        color: 'white'
    },
    money: {
        backgroundColor: '#2fabb2',
        fontWeight: '300',
        color: 'white',
        width: 30,
        textAlign: 'center',
        paddingTop: 5, 
        paddingBottom: 5,
        borderColor: 'white', 
        borderWidth: 1
    },
  });


export default CameraScreen;