import React, {Component} from 'react';
import {View,Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Slider from '@react-native-community/slider';
import Footer from './Common/Footer';
import Axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Menubar from '../src/Common/Menubar';



class UserProfile extends Component{
    // state = {data:[]}
    constructor(props) {
        super(props);
        this.state = {
          //Initial Value of slider
          sliderValue: this.distanceint,
          data:'',
          name:'',
          location:'',
          distance:null,
          about_me:'',
          photo:'',
          photo1:'',
          user_id:''
          
        };
      }

      data = this.props.navigation.state.params.data
      // data = this.newdata['data']
      user_id = this.data['user_id']
      name = this.data['name']
      email = this.data['email']
      photo = this.data['photo']
      location = this.data['location']
      aboutme = this.data['aboutme']
      distance = this.data['distance']
      distanceint = parseInt(this.distance,10);
      
      
// load session function for getting user id, distance , photo , aboutme content
      loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id'),
          distance:this.distance,
          photo:this.photo,
          about_me:this.aboutme,
        })
      } 


      componentDidMount(){
       this.loadSession().done()
       this.setState({data:this.data,name:this.name})
       
      }
// end of load session

// save function for update user profile detail with api
      save=()=>{
          Axios.post('http://203.190.153.22/api/user-profile',{
              User_id:this.state.user_id,
              name:this.state.name,
              location:this.state.location,
              distance:this.state.distance,
              about_me:this.state.about_me,
              photo:this.state.photo1
          }).then((response)=>{
              console.log(response)
              const data = response['data']
              const status = data['status']
              if(status==1){
                alert('Your rofile has been updated successfully')
              }
              
          })
      }
// end of save function

// photo upload function for upload profile picture

      photoUpload = () => {
        const options = {
          quality: 100.0,
          maxWidth: 300,
          maxHeight: 300,
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            // storageOptions: {
            //   skipBackup: true,
            //   // path: 'images',
            // },
            // noData: true
          };

          ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.uri) {
                this.setState({ photo: response.uri,photo1:response.data })
            }
          
            if (response.didCancel) {
              // console.log('User cancelled image picker');
            } else if (response.error) {
              // console.log('ImagePicker Error: ', response.error);
            } 
            else if (response.customButton) {
              // console.log('User tapped custom button: ', response.customButton);
            }
            //  else {
            //   const source = { uri: response.uri };
            // //   console.log(response)
            //   // You can also display the image using data:
            // //   const source = { uri: 'data:image/jpeg;base64,' + response.data };
            //  console.log(response.data)
            //   this.setState({
            //     avatarSource: source,
            //     photo:response.data
            //   });
            // }
          });
    }

    // editname funciton for edit name from pencil icon
          editname = () => {
            this.setState({name:''})
            this.refs.input_1.focus()
            
          }
          // editabout funciton for edit about me from pencil icon
          aboutmeedit = () => {
            this.setState({about_me:''})
            this.refs.about.focus()
            
          }


    render(){
        const {photo} = this.state;
        return(
            
            <View style={{width:'100%',height:'100%',backgroundColor:'#000'}}>
              
              
                    <View style={{flexDirection:'row',justifyContent:'center',paddingTop:40}}>
                    
                    {/* <Menubar /> */}
                   
                   
                    <Text style={{color:'#fff',fontSize:20}}>Profile Setting</Text>
                    </View>
                   
                    <View style={{alignItems:'center',marginTop:20}}>
                        
                        
                         <TouchableOpacity onPress={this.photoUpload}>
                        
                        {
                            photo==""?
                            <Image
                            source={require('../src/Images/camera.png')}
                            style={{width:120,height:120,resizeMode:'contain',borderRadius:120/2}}
                            />:
                            <Image
                            source={{uri:photo}}
                            style={{width:120,height:120,resizeMode:'stretch',borderRadius:120/2,borderWidth:1,borderColor:'#ffffff'}}
                            />
                       
                        }
                        </TouchableOpacity>
                    </View>
               
                    <KeyboardAwareScrollView>  
                    <View style={{width:"100%",flexDirection:'row'}}>
                    <View style={Styles.containerStyle}>
                            <Image
                            source={require('../src/Images/bottom_profile.png')}
                            style={{width:24,height:20,marginBottom:15,resizeMode:'contain'}}
                            />
                            <View style={{paddingLeft:10}}>
                            <Text style={{color:'#fff',fontSize:18}}>User Name</Text>
                            {/* <Text style={{color:'#fff',fontSize:18}}>John Smith</Text> */}
                            
                            <TextInput
                            style={Styles.inputStyle}
                            placeholderTextColor="#fff"
                            ref="input_1"
                            value={this.state.name}
                            onChangeText={name=>this.setState({name})}
                            />
                           </View>
                       
                    </View>
                    <View>
                    <TouchableOpacity onPress={this.editname}>
                    <Image
                            source={require('../src/Images/edit.png')}
                            style={{width:24,height:20,marginTop:70,resizeMode:'contain',marginLeft:20}}
                            />
                    </TouchableOpacity> 
                    </View>
                    </View>

                    <View style={{width:"100%",flexDirection:'row'}}>
                    <View style={Styles.containerStyle}>
                            <Image
                            source={require('../src/Images/email_white.png')}
                            style={{width:24,height:20,marginBottom:15,resizeMode:'contain'}}
                            />
                            <View style={{paddingLeft:10}}>
                            <Text style={{color:'#fff',fontSize:18}}>Email</Text>
                            {/* <Text style={{color:'#fff',fontSize:18}}>John Smith</Text> */}
                            
                            <TextInput
                            style={Styles.inputStyle}
                            placeholderTextColor="#fff"
                            value={this.email}
                            />
                           </View>
                       
                    </View>
                    <View>
                    <TouchableOpacity onPress={()=>alert('Email Can not be edited')}>
                    <Image
                            source={require('../src/Images/edit.png')}
                            style={{width:24,height:20,marginTop:70,resizeMode:'contain',marginLeft:20}}
                            /> 
                    </TouchableOpacity>
                    </View>
                    </View>

                    <View style={{width:"100%",flexDirection:'row'}}>
                    <View style={Styles.containerStyle}>
                            <Image
                            source={require('../src/Images/bottom_profile.png')}
                            style={{width:24,height:20,marginBottom:"10%",resizeMode:'contain'}}
                            />
                            <View style={{paddingLeft:10}}>
                            <Text style={{color:'#fff',fontSize:18}}>About Me</Text>
                            {/* <Text style={{color:'#fff',fontSize:18}}>John Smith</Text> */}
                            
                            <TextInput
                            style={Styles.inputStyle}
                            placeholderTextColor="grey"
                            placeholder="maximum 40 character"
                            value={this.state.about_me}
                            ref="about"
                            // autoCorrect={false}
                            // autoCapitalize={false}
                            maxLength={35}
                            multiline={true}
                            onChangeText={about_me=>this.setState({about_me})}
                            />
                           </View>
                       
                    </View>
                    <View>
                    <TouchableOpacity onPress={this.aboutmeedit}>
                    <Image
                            source={require('../src/Images/edit.png')}
                            style={{width:24,height:20,marginTop:70,resizeMode:'contain',marginLeft:20}}
                            /> 
                    </TouchableOpacity>
                    </View>
                    </View>
                    
                    {/* <View style={{width:"100%",flexDirection:'row'}}>
                    <View style={Styles.containerStyle}>
                            <Image
                            source={require('../src/Images/location_white.png')}
                            style={{width:24,height:20,marginBottom:15,resizeMode:'contain'}}
                            />
                            <View style={{paddingLeft:10}}>
                            <Text style={{color:'#fff',fontSize:18}}>Location</Text>
                            
                            
                            <TextInput
                            style={Styles.inputStyle}
                            placeholderTextColor="#fff"
                            placeholder={this.location}
                            onChangeText={location=>this.setState({location})}
                            />
                           </View>
                       
                    </View>
                    <View>
                    <Image
                            source={require('../src/Images/edit.png')}
                            style={{width:24,height:20,marginTop:40,resizeMode:'contain',marginLeft:20}}
                            /> 
                    </View>
                    </View> */}
                    
                    <View style={{flexDirection:'row', justifyContent:'space-around',marginTop:20,right:25,}}>
                        <Text style={{color:'#fff'}}>Maximum distance</Text>
                        <Text style={{color:'#fff'}}>25 Miles</Text>
                    </View>

                    {/* Slider Area */}
                    <View style={{marginLeft:25}}>
                        <View style={{width:'80%',}}>
                            
                            <Text style={{color: '#fff',marginTop:5}}>
                                {this.state.distance}
                                </Text>
                            <Slider
                                maximumValue={25}
                                minimumValue={0}
                                minimumTrackTintColor="#fff"
                                maximumTrackTintColor="#fff"
                                step={1}
                                value={this.state.sliderValue}
                                onValueChange={(distance) => this.setState({ distance })}
                            />
                        </View>
                     </View>

                     {/* Save Button */}
                     <View style={{height:40,width:120,marginLeft:25,marginTop:30}}>
                         <TouchableOpacity onPress={()=>this.save()} style={{flex:2,alignSelf:'stretch',backgroundColor:'#000',borderRadius:20,borderWidth:1,borderColor:'#fff',marginLeft:5,marginRight:5}}>
                             <Text style={{alignSelf:'center',color:'#fff',fontSize:16,fontWeight:'600',paddingTop:10,paddingBottom:10}}>Save</Text>
                         </TouchableOpacity>
                     </View>
                     </KeyboardAwareScrollView>
                   
                    <View style={{height:150,justifyContent:'flex-end'}}>

                    <Footer  />
                    </View>
                   
                {/* </SafeAreaView> */}
          {/* )} */}
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    containerStyle: {
        height: 'auto',
        width:"70%",
        marginLeft:30,
        marginTop:60,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent:'flex-start',
        borderBottomWidth: 2,
        borderColor:'white',
    },
    inputStyle: {
        color: '#ffffff',
        paddingRight: 25,
        fontSize: 18,
        lineHeight: 26,
        width:280
       
        
    },
    container: {
        padding:20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      }
})



export {UserProfile};