import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Swiper, {scrollTo} from 'react-native-swiper';
import firebase from 'firebase'
import {IndicatorViewPager,PagerDotIndicator} from 'rn-viewpager';

// let swiperIndex = 0
// Swiper.prototype.componentWillUpdate = (nextProps, nextState) => {
//   swiperIndex = nextState.index
// }
import { AsyncStorage } from 'react-native'


class Walkthrough extends Component {
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}  container={styles.bottom} selectedDotStyle={styles.selectDot} dotStyle={styles.dot} />;
    }
    go(){
    	this.props.navigator.push({name:'login'});
    }
    move(){
        this.refs.pager._goToNextPage();
    }

    constructor() {
        super();
        this.state = {
          token: null
        }
      }
    
    swiper = Object
    

    componentWillMount() {
        AsyncStorage.getItem('token')
        .then(value => {
            this.setState({token: value})
        })
    }

    showOnce() {
        // const {navigate} = this.props.navigation;
        if(this.state.token) {
            // navigate('Auth')
        }else {
            return (
                <View style={styles.main}>
                    <IndicatorViewPager
            ref="pager"
            style={{height:'100%'}}
            indicator={this._renderDotIndicator()}
        >
                        {/* First Screen */}
                        <View style={{height:'100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.text}>Connect - Discover - Build - Share</Text>
                                <View style={{alignItems: 'center'}}>
                                <Image 
                                    source={require('../../assets/images/map.png')}
                                    style={{height: 320, width: 500}}
                                />
                                </View>
                                <Text style={styles.text}>We make it easy to find the best type of cannabis for your needs</Text>
                            </View>
                            
                            <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{paddingTop: 0}}>
                                <Button
                                title='Log In'
                                fontSize={14} 
                                borderRadius={7}
                                backgroundColor='transparent'
                                color='#388E3C'
                                buttonStyle={{
                                    width: '100%',
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#388E3C'
                                }}/>
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Button
                                    title='Sign Up'
                                    fontSize={14} 
                                    borderRadius={7}
                                    backgroundColor='#388E3C'
                                    color='white'
                                    buttonStyle={{
                                        width: '100%',
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: 'white'
                                    }}/>
                                </View>
                            </View>
                        </View>
        
                        {/* Second Screen */}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            <TouchableOpacity style={{position: 'absolute', zIndex: 100, top: 25, right: 15}}>
                                <Icon
                                name='cross'
                                type='entypo'
                                color='black'
                                size={30}
                                />
                            </TouchableOpacity>
                            <View style={{width: 200}}>
                                <Text style={styles.text}>Search a directory of marijuana strains</Text>
                                <View style={{alignItems: 'center'}}>
                                <Image 
                                    source={require('../../assets/images/leaf.png')}
                                    style={{height: 300, width: 300}}
                                />
                                </View>
                                <Text style={styles.text}>We make it easy to find the best type of cannabis for your needs</Text>
                            </View>
                            
                            <View style={{marginTop: 30}}>
                                <Button
                                    onPress={ () => {
                                        const targetIndex = 0
                                        this.swiper.scrollBy(targetIndex + 1, true)
                                    }
                                }
                                title='Continue'
                                fontSize={14} 
                                borderRadius={7}
                                backgroundColor='transparent'
                                color='#388E3C'
                                buttonStyle={{
                                    width: '100%',
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#388E3C'
                                }}/>
                            </View>
                        </View>
        
                        {/* Third Screen */}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            <TouchableOpacity style={{position: 'absolute', zIndex: 100, top: 25, right: 15}}>
                                <Icon
                                name='cross'
                                type='entypo'
                                color='black'
                                size={30}
                                />
                            </TouchableOpacity>
                            <View style={{width: 200}}>
                                <Text style={styles.text}>Connect with others who enjoy all things cannabis</Text>
                                <View style={{alignItems: 'center'}}>
                                <Image 
                                    source={require('../../assets/images/peps.png')}
                                    style={{height: 300, width: 300}}
                                />
                                </View>
                                <Text style={styles.text}>Browse cannabis enthusiast and see what their high is all about.</Text>
                            </View>
                            
                            <View style={{marginTop: 30}}>
                                <Button
                                    onPress={ () => {
                                        const targetIndex = 0
                                        this.swiper.scrollBy(targetIndex + 1, true)
                                    }
                                }
                                title='Continue'
                                fontSize={14} 
                                borderRadius={7}
                                backgroundColor='transparent'
                                color='#388E3C'
                                buttonStyle={{
                                    width: '100%',
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#388E3C'
                                }}/>
                            </View>
                        </View>
        
                        {/* Fourth Screen */}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                            <View style={{width: 200}}>
                                <Text style={styles.text}>Stay up to date with whats going on</Text>
                                <View style={{alignItems: 'center'}}>
                                <Image 
                                    source={require('../../assets/images/clock.png')}
                                    style={{height: 300, width: 300}}
                                />
                                </View>
                                <Text style={styles.text}>Discover happenings, news, and information from all over/</Text>
                            </View>
                            
                            <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{paddingTop: 0}}>
                                    <Button
                                    title='Log In'
                                    fontSize={14} 
                                    borderRadius={7}
                                    backgroundColor='transparent'
                                    color='#388E3C'
                                    buttonStyle={{
                                        width: '100%',
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: '#388E3C'
                                    }}/>
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Button
                                    title='Sign Up'
                                    fontSize={14} 
                                    borderRadius={7}
                                    backgroundColor='#388E3C'
                                    color='white'
                                    buttonStyle={{
                                        width: '100%',
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: 'white'
                                    }}/>
                                </View>
                            </View>
                        </View>
                        
                        </IndicatorViewPager>
                </View>
            )
        }
    }

  render() {
    return (
        <View>
            {this.showOnce()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center', 
        fontSize: 17,
        backgroundColor: 'transparent'
    },
    main:{
        position:'relative',
        width: '100%',
        height:'100%',
        zIndex: 1000
      },
})

export default Walkthrough;