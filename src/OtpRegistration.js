import React, {Component} from 'react';
import {Text,View, StyleSheet,TextInput,Image} from 'react-native';
import { Input2, Button2, Spinner } from '../src/Common/Index';
import axios from 'axios';

class OtpRegistration extends Component{


    state = {character1:'',character2:'',character3:'',character4:'',password:'',confirmpassword:''}

    // submit functionality for submit the code which recieved on mail
    //  & change password  after the success redirect to 
    // voting page

    submit=()=>{
        var OTP = this.state.character1+this.state.character2+this.state.character3+this.state.character4
        
      
        
        this.setState({loading:true})
        if(this.state.password==this.state.confirmpassword){
        axios.post('http://203.190.153.22/api/change-pass',{
            OTP:OTP,
            new_password:this.state.password
        }).then((response)=>{
            console.log(response)
            const data = response.data
            const status = data['status']
            
            console.log(status)
            this.setState({loading:false})
            if(status==1){
                this.props.navigation.navigate('FeedPage')
            }
            else if(status==0){
                alert('Invalid otp')
            }
        })
    }else if(this.state.password==''){
        alert('Password should not be blank')
        this.setState({loading:false})
    }
    
    else{
        alert('Confirm password not matched')
        this.setState({loading:false})
    }
    
    }

    // end of submit functionality

    // for using spineer waiting the response of api

    renderButton(){
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button2 onPress={this.submit}>Submit</Button2>
        )
    }

    // end of spinner

    render(){
       
        return(
             // all OtpRegistration page design view

            <View style={{height:"100%",width:"100%",backgroundColor:'#000'}}>
                <View style={Styles.codestyle}>
                    <Text style={Styles.textstyle}>Verification Code</Text>
                    <Text style={{fontFamily:'Futura',color:'#fff'}}>Enter your OTP code here</Text>
                    <View style={{flexDirection:'row',padding:10}}>
                    <View style={Styles.boxstyle}>
                        

                        {/* for getting the first otp letter form input */}
                        <TextInput
                            autoCorrect={false}
                            style={Styles.inputstyle}
                            ref="input_1"
                            onChangeText={character1 => {this.setState({ character1 })
                                            if(character1) this.refs.input_2.focus()
                                            }}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={Styles.boxstyle}>

                        {/* for getting the second otp letter form input */}
                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_2"
                                onChangeText={character2 => {this.setState({ character2 })
                                            if(character2)this.refs.input_3.focus()
                                            // else this.refs.input_1.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    <View style={Styles.boxstyle}>

                        {/* for getting the third otp letter form input */}
                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_3"
                                onChangeText={character3 => {this.setState({ character3 })
                                            if(character3)this.refs.input_4.focus()
                                            // else this.refs.input_2.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    <View style={Styles.boxstyle}>
                        {/* for getting the fourth otp letter form input */}

                        <TextInput
                                autoCorrect={false}
                                style={Styles.inputstyle}
                                ref="input_4"
                                onChangeText={character4 => {this.setState({ character4 })
                                            // if(character4==false)this.refs.input_3.focus()
                                        }}
                                maxLength={1}
                                keyboardType={'number-pad'}
                            />
                    </View>
                    </View>
                </View>
                <View style={{height:"60%",widht:"100%",justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{color:'#fff', fontFamily:'Futura'}}>Enter Your New Password here</Text>
                    <View>
                            <View style={Styles.containerStyle}>
                            <Image
                            source={require('../src/Images/password.png')}
                            style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                            />

                            {/*  for entering the new password */}
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
                            source={require('../src/Images/password.png')}
                            style={{width:24,height:18,marginTop:16,resizeMode:'contain'}}                
                            />

                            {/*  for entering the confirm new password */}
                            <Input2
                            placeholder='Confirm Password'
                            placeholderTextColor='#fff'
                            secureTextEntry
                            autoCapitalize={'none'}
                            value={this.state.confirmpassword}
                            onChangeText={confirmpassword=>this.setState({ confirmpassword })}
                            />
                            </View>
                    </View>
                    <View style={{marginTop:40}}>
                    {this.renderButton()}
                    </View>
                </View>
                
            </View>
        );
    }
}

// styling use on OtpRegistration page

const Styles = StyleSheet.create({
    codestyle:{
            height:"40%",
            justifyContent:'center',
            alignItems:'center'
    },
    textstyle:{
            fontSize:30,
            fontWeight:'500',
            fontFamily:'Futura',
            color:'#fff'
    },
    boxstyle:{
        height:70,
        width:60,
        borderRadius:30,
        backgroundColor:'#ffffff',
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    inputstyle:{
        fontSize:26,
        color:"#000000",
        height:70,
        width:60,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:25,
        fontFamily:'Futura'
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
    },
})

export {OtpRegistration};