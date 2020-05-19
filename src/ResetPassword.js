import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import {Input2, Button2,Spinner} from './Common/Index';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';



class ResetPassword extends Component{

    

    state= {email:'',loading:false}



    //reset password functionality user for sending the opt on mail to reset password

    resetPassword=()=>{
        if(this.state.email!=''){
        this.setState({loading:true})
        axios.post('http://203.190.153.22/api/get-otp',{
            email_id:this.state.email
            
        }).then((response)=>{
            console.log(response)
            const data = response['data']
            const status = data['status']
            const message = data['message']
            if(status==1){
                this.setState({loading:false})
                Alert.alert('','Please check your email for verification code',[
                    {
                        'text':'OK',
                        onPress:()=>{
                            this.props.navigation.navigate('OtpRegistration')
                            
                        }
                    }])
            }
            else{
                alert(message)
                this.setState({loading:false})
            }
        })
    }
    else{
        alert('Email field is required')
    }
    }

    // end of reset password functionality

    // user for spinner

    renderButton(){
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button2 onPress={this.resetPassword}>
                        Reset
                    </Button2>
        )
    }

    // end of spinner


    render(){
        return(

            //  all reset password page design view
            <View
          
            style={{width: '100%', height: '100%',backgroundColor:'#000'}}
            >
            <SafeAreaView>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                    source={require('../src/Images/back2.png')}
                    style={{width:19,height:33,marginLeft:26,marginTop:8}}  
                />
                </TouchableOpacity>
            <View style={{flex:1,alignItems:'center',padding:"25%"}}>
            
               
                <View style={{width:360,marginTop:15,marginBottom:80}}>
                <Text style={{fontSize:30,fontWeight:'900'}}>{`Reset \nPassword`}</Text>
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
               
                <View style={{height:22,flexDirection:'row', width:350,alignItems:'center'}}>
                    <View>
                 
                    </View>
                    <View style={{marginLeft:5}}>
                        
                    </View>
                </View>
               
                <View style={{height:"60%",justifyContent:'flex-end'}}>
                   {this.renderButton()}
                </View> 
           
               
                
            </View>
            
            </SafeAreaView>
            </View>
        );
    }
}

// styling use on reset password page

const Styles = StyleSheet.create({
        socialView:{
            flexDirection:'row',
            paddingTop: 40,
            width:200,
            marginTop:20,
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
            // flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            // backgroundColor:'orange',
            borderBottomWidth: 2,
            borderColor:'#fff',
            marginBottom: 25,
            fontFamily: 'futur',
            paddingLeft:15,
           
            
        },
})

export {ResetPassword};