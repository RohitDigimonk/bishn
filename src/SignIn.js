import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Input2, Button2,Spinner} from './Common/Index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import axios from 'axios';
// import firebase from 'react-native-firebase'


// twitter sign in functionality which is not using
// const { RNTwitterSignIn } = NativeModules;
// const { TwitterAuthProvider } = firebase.auth;


// const TwitterKeys = {
//     TWITTER_CONSUMER_KEY: 'PLACE_YOUR_TWITTER_CONSUMER_KEY_HERE',
//     TWITTER_CONSUMER_SECRET: 'PLACE_YOUR_TWITTER_CONSUMER_SECRET_HERE'
//   };


class SignIn extends Component{

    state= {email:'',password:'',user_id: '',loading:false,token:''}

    // twiter signin functionality which is not using rightnow.
    
    // twitterSignIn = () => {
    //     RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET)
    //     RNTwitterSignIn.logIn()
    //       .then(loginData => {
    //         // console.log(loginData)
    //         // const temail = loginData['email']
    //         // const tname = loginData['userName']
    //         // const { authToken, authTokenSecret,email  } = loginData
    //         // if (authToken && authTokenSecret) {
    //         //   axios.post('https://thetinyland.com/api/Api/socialMediaLogin', {
    //         //     first_name:tname,
    //         //     last_name:"",
    //         //     phone:"",
    //         //     email:temail
    //         //   }).then((response) => {
    //         //     // console.log(response)
    //         //     const data = response['data']
    //         //     const status = data['status']
    //         //     const data1 = data['data']
    //         //     const userid = data1['id']
    //             // console.log(data);
    //             // if(status==1){
    //             //     this.setState({
    //             //         userid:userid
    //             //     })
    //             //     this.session()
    //             // }
    //         //   })
    //         // }
    //       })
    //     //   .catch(error => {
    //     //     console.log(error)
    //     //   }
    //     // )
    //   }



    //  loadSession = async() => {
    //     this.setState({
    //         token:await AsyncStorage.getItem('token')
    //       })
    //     }

    //   componentDidMount=async()=>{
    //         this.loadSession().done();
    //         // console.log(await AsyncStorage.getItem('token'))
    //     }

    // login functionality with api 

    login = () => {
            
           
            const {email} = this.state;
            const {password} = this.state;
            this.setState({ loading:true })
            // console.log(email)
            axios.post('http://203.190.153.22/api/login', {
                email:email,
                password:password
            }).then((response) => {
                const data = response.data
                const status = data['status']
                const message = data['message']
                const user_id = data['user_id']
                this.setState({
                    user_id:user_id
                })
                // console.log(data)
                if(status != null){
                    this.setState({
                        loading:false
                    })
                }
                if(status==1){
                    // this.props.navigation.navigate('Timeline')
                    
                    this.session()
                    
                }
                else{
                    alert(message)
                }
            })
    }

    // end of login functionality

    // session functionality for creating a session of login user 
    
    session=()=>{
        AsyncStorage.setItem('user_id',this.state.user_id)
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'FeedPage' })
            ],
          }))
    }

    // end of session functionality

    //render button for using spinner for waiting the response of api

    renderButton(){
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button2 onPress={this.login}>
                        LOG IN
                    </Button2>
        )
    }

    // end of render button

    render(){
      
        return(

            // all signin page design view

            <View style={{width: '100%', height: '100%',backgroundColor:'#000'}}>
            
            <View style={{flex:1,alignItems:'center',padding:"25%"}}>
               
                <View style={{width:360,marginTop:15,marginBottom:40}}>
                <Text style={{fontSize:30,fontWeight:'900',color:'#fff',fontFamily: 'Futura'}}>Log In</Text>
                </View>
                <View style={Styles.containerStyle}>
                <Input2
                    placeholder='Email'
                    placeholderTextColor="#fff"
                    value={this.state.email}
                    autoCapitalize={'none'}
                    onChangeText={email => this.setState({ email })}


                />
                </View>
                <View style={Styles.containerStyle}>
                <Input2
                    placeholder='Password'
                    placeholderTextColor="#fff"
                    autoCapitalize={'none'}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                </View>
                <View style={{height:22,flexDirection:'row', width:350,alignItems:'center'}}>
                    <View>
                    <CheckBox
                        style={{flex:1}}
                        checkedCheckBoxColor={'#fff'}
                        uncheckedCheckBoxColor={'#fff'}
                        onClick={()=>{
                        this.setState({
                            isChecked:!this.state.isChecked
                        })
                        }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                    </View>
                    <View style={{marginLeft:5}}>
                        <Text style={{color:'#fff',fontFamily:'Futura'}}>Remember me</Text>
                    </View>
                </View>
                <View style={{height:"60%",justifyContent:'flex-end',paddingBottom:20}}>
                   {this.renderButton()}
                </View> 
                <View style={Styles.socialView}>
                    <Image
                    source={require('../src/Images/facebook.png')}
                    style={{height:43,width:43, marginRight:20}}
                    />
                    <TouchableOpacity onPress={this.twitterSignIn}>
                    <Image
                    source={require('../src/Images/twitter.png')}
                    style={{height:43,width:43,marginRight:20}}
                    />
                    </TouchableOpacity>
                    <Image
                    source={require('../src/Images/google.png')}
                    style={{height:43,width:43}}
                    />
                </View>
                <View style={Styles.textView}>

                    {/* this functionality used for redirect to another page */}
                    
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={{color:'#fff',fontFamily:'Futura'}}>Create an Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ResetPassword')}>
                    <Text style={{color:'#fff',fontFamily:'Futura'}}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

            </View>
        );
    }
}

// styling use on signin page

const Styles = StyleSheet.create({
        socialView:{
            flexDirection:'row',
            paddingTop: 20,
            width:200,
            marginTop:10,
            justifyContent:'space-around'
        },
        textView:{
            flexDirection:'row',
            width:"180%",
            height:"28%",
            justifyContent:'space-between',
            alignItems:'flex-end',
            
           
        },
        containerStyle: {
            height: 40,
            width:360,
            flexDirection: 'row',
            alignContent: 'center',
            borderBottomWidth: 2,
            borderColor:'#fff',
            marginBottom: 25,
            fontFamily: 'Futura',
            paddingLeft:15,
            marginTop:8,
            
        },
})

export {SignIn};