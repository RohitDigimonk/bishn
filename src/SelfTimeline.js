import React, {Component} from 'react';
import {Text,View,Clipboard,ScrollView,StyleSheet,Image,TextInput,AsyncStorage,TouchableOpacity,Modal}from 'react-native';
// import { CategoryButton } from './Common/Index';
import Footer from '../src/Common/Footer';
import Axios from 'axios';
import { StackActions, NavigationActions} from 'react-navigation';
// import Menubar from '../src/Common/Menubar';
import Modal2 from "react-native-modal";


class SelfTimeline extends Component{
    state = {user_id:'',business_data: [],copymodalVisible:false,draweroption:false,data:'',editicon:false}

  
    
// load session funciton for getting userid from sysnc storage & user information
    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id')
        })
        Axios.post('http://203.190.153.22/api/self-value',{
            User_id:this.state.user_id,
        }).then((response)=> {
            console.log(response)
            const userData1 = response['data']
            const userData = userData1['data']
            const username = userData1['user name']
            const fullname = username.split(' ')
            const firstname = fullname[0];
            const firstnameletter = firstname[0]
            const lastname = fullname[1]
            const lastnameletter = lastname[0]
            const profilephoto = userData1['user photo']
            const aboutme = userData1['about_me']
            const Total_vote = userData1['total_vote']
            const Total_like = userData1['total_like']

        
            this.setState({
                business_data:userData,
                arrayholder:userData,
                User_name:username,
                Total_like:Total_like,
                Total_vote:Total_vote,
                firstnameletter:firstnameletter,
                lastnameletter:lastnameletter,
                profileimage:profilephoto,
                aboutme :aboutme
            })

        })
        Axios.post('http://203.190.153.22/api/user-data',{
            User_id:this.state.user_id,
            post_id:''
        }).then((response)=>{
            // console.log(response)
            const data = response.data
            // console.log(data)
            const name = data['name']
            const email = data['email_id']
            const photo = data['photo']
            const location = data['location']
            const aboutme = data['about_me']
            const distance = data['distance']
            // console.log(aboutme,location,photo,email,name)
            this.setState({data:{name:name,email:email,photo:photo,location:location,aboutme:aboutme,distance:distance}})
            // console.log(name)
            const fullname = name.split(' ')
            const firstname = fullname[0]
            const firstnameletter = firstname[0]
            const lastname = fullname[1]
            const lastnameletter = lastname[0]
            this.setState({firstnameletter:firstnameletter,lastnameletter:lastnameletter})
            // console.log(lastnameletter)
            
        })
      } 

      componentDidMount(){
          this.loadSession().done();
      }
// end of load function

// clipboard functionality for copy address on clipboard

      set_on_clipboard = async(text) => {
        await Clipboard.setString(text)
        this.setState({copymodalVisible:true})
          {this.timeoutHandle = setTimeout(()=>{
            this.setState({copymodalVisible:false})
        }, 2000)} 
      // console.log(text)
    }
// end of clipboard funciton

// filter search for searching data as per business name, address, yelp category, username, category name

    filterSearch=(text)=>{
        // console.log(text)
        const newData = this.state.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData1 = item.name  ? item.name.toUpperCase() : ''.toUpperCase();
            // const itemData2 = item.free_text  ? item.free_text.toUpperCase() : ''.toUpperCase();
            const itemData3 = item.Business_Display_address  ? item.Business_Display_address.toUpperCase() : ''.toUpperCase();
            const itemData5 = item.yelp_cat ? item.yelp_cat.toUpperCase() : ''.toUpperCase();
            const itemData4 = item.username  ? item.username.toUpperCase() : ''.toUpperCase();
            const itemData6 = item.Category_name ? item.Category_name.toUpperCase() : ''.toUpperCase();
            const itemData = itemData1.concat(itemData3,itemData4,itemData5,itemData6)
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            business_data: newData,
            // text: text,
          });
        
    }

    // end of filter search function

    // save fuction for about me text with api

    save=()=>{
        Axios.post('http://203.190.153.22/api/user-profile',{
              User_id:this.state.user_id,
              name:'',
              location:'',
              distance:'',
              about_me:this.state.aboutme,
              photo:''
          }).then((response)=>{
            //   console.log(response)
              const data = response['data']
              const status = data['status']
              if(status==1){
                
                this.setState({editicon:!this.state.editicon})
                // this.refs.input_2.focus()
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SelfTimeline' })
                    ],
                    }))
                
              }
          })
    }

    // end of save function

    //like function for like & dislike post

    Like = (data, inde) => {
        // console.log(data,inde,this.state.user_id)
            Axios.post('http://203.190.153.22/api/business-like',{
                    Business_name:data['name'],
                    Business_Display_address:data['Business_Display_address'],
                    Business_id:data['id'],
                    Category_name:data['Category_name'],
                    User_id:this.state.user_id,
                    Like:inde,
                    username:data['username']
            }).then((response)=> {
                // console.log(response)
                this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'SelfTimeline' })
                ],
                }))

            })
        // alert('like')
      }

      // end of like funciton

      // image viewer function for open the modal for viewing full size of image which is not using now

      ImageViewer=(photos)=>{
       
          this.setState({visibleModal:"fancy"})
          this.setState({viewer:photos})
        
        }
        // end of image viewer

        // drawer modal for filter option like setting, notification, logout
        drawermodal=()=>{
            this.setState({draweroption:!this.state.draweroption})
        }

        Settings = () => {
        
            const data = this.state.data
            this.setState({draweroption:!this.state.draweroption})
            this.props.navigation.navigate('UserProfile',{data})  
        }
        notification=()=>{
            this.setState({draweroption:!this.state.draweroption})
            this.props.navigation.navigate('Notification') 
        }

        editcontent = () => {
            
            this.setState({name:'',editicon:!this.state.editicon})
            this.refs.input_1.focus()
            
          }
          logout = async() => {
            this.setState({draweroption:!this.state.draweroption})
            await AsyncStorage.removeItem('user_id')
            this.props.navigation.navigate('Home');
            // navigation.closeDrawer();
        }

    // end of drawer modal

    render(){
        const {data}=this.state;
        
        return(
            
                <View style={{height:'100%',backgroundColor:'#000'}}>
                    {/* filter modal view */}
                <Modal

                        visible={this.state.draweroption}

                        transparent={true}

                        animationType={'fade'}

                      
                         >

                        <View style={{ flex:1, alignItems:'flex-end', justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,.5)' }}>


                        <View style={Styles.Alert_Main_View}>
                        <TouchableOpacity onPress={()=>this.Settings()}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                        <Text style={Styles.textstyle}>Settings</Text>

                        {this.state.recenticon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.notification()}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                        <Text style={Styles.textstyle}>Notification</Text>

                        {this.state.likedicon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.logout()}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>

                        <Text style={Styles.textstyle}>Logout</Text>

                        {this.state.likedicon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
             
                        <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                        <View style={{height:40,width:140}}>
                        <TouchableOpacity onPress={()=>this.setState({draweroption:!this.state.draweroption})} style={{flex:2,alignSelf:'stretch',backgroundColor:'#000',borderRadius:20,borderWidth:1,borderColor:'#fff',marginLeft:5,marginRight:5}}>
                            <Text style={{alignSelf:'center',color:'#fff',fontSize:16,fontWeight:'600',paddingTop:10,paddingBottom:10}}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        </View>
                        </View>

                        </View>
                </Modal>
                {/* end of filter modal */}

                {/* modal for image viewer for showing full size of image in modal */}
                <Modal2 
                                   isVisible={this.state.visibleModal === 'fancy'}
                                   backdropColor="#000000"
                                   backdropOpacity={0.8}
                                   animationIn="zoomInDown"
                                   animationOut="zoomOutUp"
                                   animationInTiming={600}
                                   animationOutTiming={600}
                                   backdropTransitionInTiming={600}
                                   backdropTransitionOutTiming={600}
                                   onBackdropPress={() => this.setState({ visibleModal: false })}
                                
                            >
                                <TouchableOpacity onPress={()=>this.setState({ visibleModal: false })}>
                                <View style={{alignItems:'flex-start',justifyContent:'flex-end',paddingLeft:25,paddingTop:180}}>
                                    <Image
                                    source={require('../src/Images/cross.png')}
                                    style={{width:32,height:32}}
                                    />
                                </View>
                               </TouchableOpacity>
                                <View style={{ flex: 1,justifyContent:'flex-start',alignItems:'center' ,height:350,paddingTop:20 }}>
         
                                    <View style={{width:"100%", height:350,}}>                                          
                                        <Image
                                        source={{uri:this.state.viewer}}
                                        style={{width:"100%",height:350}}
                                        />
                                    </View>
                                </View>
                            </Modal2>
                            {/* end of image viewer modal */}
                    {/* modal for clipboard message */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.copymodalVisible}>
                    <View style={Styles.copymodal}>
                    <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>Address copied to</Text>
                    <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>clipboard</Text>  
                    </View>      
                    </Modal>
                    {/* endo of clipboard modal  */}
                <View style={Styles.navBar}>
                <View style={{flexDirection:'row',justifyContent:'space-around',paddingLeft:"30%",marginTop:'5%'}}>

                   
                    <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:22,color:'#ffffff'}}>{this.state.User_name}</Text>
                    
                    </View>
                    <TouchableOpacity onPress={()=>this.drawermodal()}>
                    <View style={{paddingLeft:50}}>
                    
                  
                    <Image
                        source={require('../src/Images/side_bar.png')}
                        style={{width:36,height:26,resizeMode:'contain',zIndex:999}}
                    />
                    
                    </View>
                    </TouchableOpacity>
                   
                </View>
                <View style={{paddingLeft:20,paddingTop:20}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'60%'}}>
                        <View style={Styles.thumbnailtext}>
                                {
                                    this.state.profileimage==""?
                                <Text style={{color:'#000000',fontSize:30,fontWeight:'900'}}>{this.state.firstnameletter+this.state.lastnameletter}</Text>:
                                   <Image
                                    source={{uri:this.state.profileimage}}
                                    style={{width:70,height:70,borderRadius:70/2,resizeMode:'cover',backgroundColor:'#000'}}
                                /> 
                                }
                              
                            </View>
                            <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',marginLeft:30}}>
                                <View>
                                <Text style={{color:'#ffffff',fontSize:20,marginLeft:10}}>{this.state.Total_vote}</Text>
                                <Text style={{color:'#ffffff',fontSize:20}}>Votes</Text>
                              
                                </View>
                                <View>
                                <Text style={{color:'#ffffff',fontSize:20,marginLeft:8}}>{this.state.Total_like}</Text>
                                <Text style={{color:'#ffffff',fontSize:20}}>Like</Text>
                                </View>
                                
                                
                            </View>
                            
                        </View>
                        <View style={{paddingTop:20,flexDirection:'row',marginTop:10}}>
                          
                            <TextInput
                            autoCapitalize={false}
                            autoCorrect={true}
                            value={this.state.aboutme}
                            maxLength={35}
                            ref="input_1"
                            placeholderTextColor="#fff"
                            style={{fontSize:18,color:'#fff',width:340,fontFamily:'Futura'}}
                            placeholder="Write something awesome about yourself"
                            onChangeText={aboutme=>this.setState({aboutme})}
                            />
                         
                         
                       

                        </View>
                        {this.state.editicon==true?
                        <TouchableOpacity onPress={()=>this.save()}>
                        <View style={Styles.editprofileview}>
                        <Text style={{color:'#fff',fontFamily:'Futura',fontSize:20,fontWeight:'700'}}>Save Profile</Text>
                        </View>
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={()=>this.editcontent()}>
                        <View style={Styles.editprofileview}>
                            <Text style={{color:'#fff',fontFamily:'Futura',fontSize:20,fontWeight:'700'}}>Edit Profile</Text>
                        </View>
                        </TouchableOpacity>
                        }
                </View>
                </View>
                <View style={Styles.containerStyle2}>
                                    
                                    <Image
                                        source={require('../src/Images/Search.png')}
                                        style={{width:36,height:22,resizeMode:'contain'}}
                                    />
                                    <TextInput
                                    placeholder="Search your posts"
                                    placeholderTextColor='grey'
                                    ref="input_2"
                                    style={{fontSize:22,width:300,paddingLeft:15,fontWeight:'700',color:'#fff',fontFamily:'Futura'}}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={text=>this.filterSearch(text)}
                                    // value={this.state.text}
                                    
                                    />
                                </View>
                                
                <ScrollView>
                    {this.state.business_data.map(data => {
                        // console.log(data.Business_Display_address)
                            return(
                            <>
                            {data.like || data.vote || data.Business_vote?
                            <View style={{width:"100%",paddingLeft:20,backgroundColor:'#000'}}>
                            
                               
                            <View>
                               
                                 <Text style={{fontSize:30,fontWeight:'800',fontFamily:'Futura',color:'#fff'}}>{data.Category_name}</Text>
                              
                                
                            </View>
                            <View>
                            <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Futura',color:'#fff'}}>{data.name}</Text>
                                {/* <Text style={{fontSize:22,fontWeight:'600'}}>{data.name.length.toString() < 19 ? data.name : `${data.name.substr(0,17)}...`}</Text> */}
                                </View>
                    
                            <View>
                                <View style={{flexDirection:'row'}} >
                                    <Text style={{fontSize:14,fontWeight:'600',width:'85%',fontFamily:'Futura',color:'#fff'}}>
                                   
                                        {data['Business_Display_address']}
                                        
                                   
                                    {/* {data.Business_Display_address.length.toString() < 38 ? data.Business_Display_address : `${data.Business_Display_address.substr(0,38)}...`} */}
                                    </Text>
                                  
                                </View>
                                <View style={{flexDirection:'row',left:-10,paddingTop:10}}>
                                
                                    {data.like==false?
                                    <TouchableOpacity onPress={()=>this.Like(data,'1')}>
                                    <Image
                                        source={require('../src/Images/like.png')}
                                        style={{width:38,height:26,resizeMode:'contain'}}
                                    /></TouchableOpacity>:
                                    <TouchableOpacity onPress={()=>this.Like(data,'0')}>
                                    <Image
                                        source={require('../src/Images/like_fill.png')}
                                        style={{width:38,height:26,resizeMode:'contain'}}
                                    /></TouchableOpacity>
                                    }
                                    {data.vote==false?
                                    <Image
                                    source={require('../src/Images/vote_fill_black.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    />:
                                    <Image
                                    source={require('../src/Images/vote_fill_white.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    />
                                    }
                                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'78%'}}>
                                     <TouchableOpacity onPress={()=>this.set_on_clipboard(data.Business_Display_address)}>
                                    <Image
                                    source={require('../src/Images/copy.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Hotel',{data})}>
                                <Image
                                    source={require('../src/Images/add_icon_white.png')}
                                    style={{width:38,height:26,resizeMode:'contain',marginBottom:5}}
                                />
                                </TouchableOpacity>
                                </View>
                                </View>
                                </View>
                                {/* <Text>{data.username}</Text> */}
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                            <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Futura',color:'#fff'}}>{data.total_vote} Votes</Text>
                           
                                </View>
                               
                                <View style={{ width: '100%', height: 0.7, backgroundColor: '#000',paddingVertical:20}} />
                            </View>:null
                        }
                            
                            </>
                            )}
                    )}
                </ScrollView>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('VotingPage')}>
                   <View style={{width:'100%',alignItems:'flex-end'}}>
                    
                   <Image
                        source={require('../src/Images/add_black.png')}
                        style={{width:100,height:100,resizeMode:'contain',bottom:5,position:'absolute'}}
                    />
                    
                    </View>
                    </TouchableOpacity>
                    
                    <View>
                   <Footer />
                   </View>
                   </View>
                
        );
    }
}

// styling for selftimeline page

const Styles = StyleSheet.create({
    navBar: {
        height:280,
        width:'100%',
        backgroundColor:'#000000',
        justifyContent:'flex-start',
        paddingTop:35,
        paddingLeft:10
    },
    containerStyle2: {
        height:60,
        paddingTop:10,
        marginBottom:20,
        width:'85%',
        flexDirection:'row',
        backgroundColor:'#000',
        alignItems:'center',
        paddingLeft:5,
        borderBottomWidth: 1,
        borderColor:'#fff',
        marginLeft:20,
        
    },
    thumbnailtext:{
        width:70,
        height:70,
        borderRadius:70/2,
        backgroundColor:'#EE82EE',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
    copymodal: {
        height:100,
        marginTop:400,
        marginLeft:80,
        width:"60%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10
      },
      Alert_Main_View:{
     
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor : "#000000", 
        height: "30%" ,
        width: '100%',
        paddingLeft:10,
      },
      textstyle: {
        color:'#ffffff',
        fontSize:22,
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:20,
        fontFamily:'Futura',
        fontWeight:'600'
      },
      editprofileview:{
          width:'90%',
          justifyContent:'center',
          alignItems:'center',
          height:40,
          borderWidth:1,
          borderColor:'#fff',
          marginTop:10
      }
})


export {SelfTimeline};