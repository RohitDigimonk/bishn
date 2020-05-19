import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Input2, Button2, Spinner } from '../src/Common/Index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';


class SignUp extends Component{

    state = {email:'',password:'',full_name:'',location:'',cpassword:'',loading:false}

    
    // geolocation & geocoder functionality use for get current location of user
    
    componentDidMount(){
        Geolocation.getCurrentPosition((position) => {
            // console.log(position);
            var cord = position['coords']
            var longitude = cord['longitude']
            var latitude = cord['latitude']
          
            Geocoder.init('AIzaSyB4elPWt2ckWW3aymuIk9ecBhyOaLgQY_I');
            Geocoder.from(latitude,longitude)
              .then(json => {
                   
                    var addressComponent = json.results[0].formatted_address;
                      
                //   console.log(addressComponent);
                    const longaddress = addressComponent
                    this.setState({location:longaddress})

              })
            //   .catch(error => console.log(error));
      })
     
    }

    // end of current location functionality


    // new user registration functionality with api & after successful redirect to information page

    userRegistration = () => {
        const {email} = this.state;
        const {password} = this.state;
        const {full_name} = this.state;
        const {location} = this.state;
        this.setState({loading:true})
        
       
        axios.post('http://203.190.153.22/api/register',{
            email:email,
            password:password,
            full_name:full_name,
            location:location,

        }).then((response) => {
            // console.log(response);
            const data = response.data
            const status = data['status']
            const message = data['message']
            if(status != null){
                this.setState({
                    loading:false
                    
                })
            }
            // console.log(message)
            if(status==1){
                this.props.navigation.navigate('Information')
            }
            else{
                alert(message);
            }

        }).catch(function (error){
            // console.log(error)
        })
    }

    // end of user registration functionality

    // render button for using spinner wait for api response

    renderButton(){
        if(this.state.loading) {
            return <Spinner />
        }
        return (
            <Button2 onPress={this.userRegistration}>
                Sign Up
            </Button2>
        )
    }

    // end of render button functionality


    render(){
        
        return(
            
             // all signup page design view

            <View style={{flex:1,backgroundColor:'#000',paddingTop:'15%'}}>
               
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                    source={require('../src/Images/back2.png')}
                    style={{width:19,height:33,marginLeft:26,marginTop:8}}  
                />
                </TouchableOpacity>
                <KeyboardAwareScrollView>
                <View style={{paddingTop:70,width:360,paddingLeft:26}}>
                        <Text style={Styles.headingStyle}>{`New \nAccount`}</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center', paddingTop:20}}>
                <View style={Styles.containerStyle}>
                    <Image
                    source={require('../src/Images/user_white.png')}
                    style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                    />
                    <Input2
                    placeholder='Full Name'
                    placeholderTextColor='#fff'
                    autoCapitalize={'words'}
                    value={this.state.full_name}
                    onChangeText={full_name=>this.setState({ full_name })}
                    />
                    </View>
                    <View style={Styles.containerStyle}>
                    <Image
                    source={require('../src/Images/mail_white.png')}
                    style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                    />
                    <Input2
                    placeholder='Email'
                    placeholderTextColor='#fff'
                    autoCapitalize={'none'}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                    </View>
                    <View style={Styles.containerStyle}>
                    <Image
                    source={require('../src/Images/password_white.png')}
                    style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                    />
                    <Input2
                    placeholder='Password'
                    placeholderTextColor='#fff'
                    secureTextEntry
                    autoCapitalize={'none'}
                    value={this.state.password}
                    onChangeText={password=>this.setState({ password })}
                    />
                    </View>
                    <View style={Styles.containerStyle}>
                    <Image
                    source={require('../src/Images/password_white.png')}
                    style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                    />
                    <Input2
                    placeholder='Confirm Password'
                    placeholderTextColor='#fff'
                    autoCapitalize={'none'}
                    secureTextEntry
                    value={this.state.cpassword}
                    onChangeText={cpassword=>this.setState({ cpassword })}
                    />
                    </View>
                    <View style={Styles.containerStyle}>
                    <Image
                    source={require('../src/Images/location_white1.png')}
                    style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                    />
                    <Input2
                    placeholder='Location'
                    placeholderTextColor='#fff'
                    value={this.state.location}
                    onChangeText={location=>this.setState({ location })}

                    />
                    </View>

                </View>
                <View style={{paddingTop:40}}>
                    {this.renderButton()}
                </View>
                <View style={Styles.socialView}>
                    <Image
                    source={require('../src/Images/facebook.png')}
                    style={{height:43,width:43, marginRight:20}}
                    />
                    <Image
                    source={require('../src/Images/twitter.png')}
                    style={{height:43,width:43,marginRight:20}}
                    />
                    <Image
                    source={require('../src/Images/google.png')}
                    style={{height:43,width:43}}
                    />
                </View>
                
                </KeyboardAwareScrollView>
               
            </View>
            
        );
    }
}

// styling use on signup page

const Styles = StyleSheet.create({
    headingStyle:{
        fontSize:30,
        fontWeight:'900',
        fontFamily:'Futura',
        color:'#fff'
    },
    containerStyle: {
        height: 40,
        width:360,
        // flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        // backgroundColor:'orange',
        borderBottomWidth: 2,
        borderColor:'#fff',
        marginBottom: 25,
        fontFamily: 'Futura',
        paddingLeft:15,
    },
    socialView:{
        flexDirection:'row',
        paddingTop: 40,
        paddingLeft:'20%',
        width:"80%",
        // marginTop:20,
        justifyContent:'space-around',
        
    },
})



export {SignUp};