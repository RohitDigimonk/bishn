import React, {Component} from 'react';
import {Text,View,SafeAreaView,ScrollView,StyleSheet,
    Image,TextInput,TouchableOpacity,Clipboard,Modal,AsyncStorage}from 'react-native';
import Footer from '../src/Common/Footer';
import Axios from 'axios';
import {Spinner3} from './Common/Index';
import { StackActions, NavigationActions} from 'react-navigation';
import Menubar from '../src/Common/Menubar';
import Modal2 from "react-native-modal";


class UserTimeline extends Component{

        state = {business_data:[],text:'',full_data:[],Modal_Visibility:false,Modaldata:'',copymodalVisible:false,aboutme:''}
   

    data = this.props.navigation.state.params.data
    uservotedcategory = this.props.navigation.state.params.uservotedcategory
    other_user_id = this.data['User_id']
    
// loadsession funciton for getting userid from sync storage, getting other userid, 

    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id')
        })
        Axios.post('http://203.190.153.22/api/user-data',{
            User_id:this.other_user_id,
            post_id:''
        }).then((response)=> {
            // console.log(response)
            const userData = response['data']
            const aboutme = userData['about_me']
            const User_name = userData['name']
            const fullname = User_name.split(' ')
            const firstname = fullname[0];
            const firstnameletter = firstname[0]
            const lastname = fullname[1]
            const lastnameletter = lastname[0]
            const Total_like = userData['total_like']
            const Total_vote = userData['total_vote']
            const profileimage = userData['photo']
            const Adata = userData['data']
            // console.log(lastnameletter)
            // console.log(firstnameletter)
            this.setState({
                business_data:Adata,
                arrayholder:Adata,
                full_data:Adata,
                User_name:User_name,
                Total_like:Total_like,
                Total_vote:Total_vote,
                profileimage:profileimage,
                firstnameletter:firstnameletter,
                lastnameletter:lastnameletter,
                aboutme:aboutme

            })

        })
        
      }

    componentDidMount(){
        this.loadSession().done();
    }
// end of load session 

// clipboard function for copy address on clipboard
   
    set_on_clipboard = async(text) => {
        await Clipboard.setString(text)
        this.setState({copymodalVisible:true})
          {this.timeoutHandle = setTimeout(()=>{
            this.setState({copymodalVisible:false})
        }, 2000)}
      // console.log(text)
    }

    // end of clipbaord function

    // search funciton as per business name, address, category name, yelp category

    filterSearch=(text)=>{
        // console.log(text)
        const newData = this.state.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData1 = item.name  ? item.name.toUpperCase() : ''.toUpperCase();
            // const itemData2 = item.free_text  ? item.free_text.toUpperCase() : ''.toUpperCase();
            const itemData3 = item.Business_Display_address  ? item.Business_Display_address.toUpperCase() : ''.toUpperCase();
            // const itemData4 = item.username  ? item.username.toUpperCase() : ''.toUpperCase();
            const itemData5 = item.Category_name ? item.Category_name.toUpperCase() : ''.toUpperCase();
            const itemData6 = item.yelp_cat ? item.yelp_cat.toUpperCase() : ''.toUpperCase();
            const itemData = itemData1.concat(itemData3,itemData5,itemData6)
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
   
// continue function for confirm post in same category

      continue = () => {
        this.setState({loading:true})
        const data = this.state.Modaldata
        const latitude = data['latitude']
        const longitude = data['longitude']
        var category = data['Category_name']
        const food_photo = data['photoname']
        const Business_id = data['id']
        const Business_name = data['name']
        const Business_location = data['location']
        const Business_address = Business_location['display_address']
        const free_text = data['free_text']
        const postuserid = data['userid']
        const yelpcategories = data['categories']
       


        Axios.post('http://203.190.153.22/api/business-vote-confirm',{
            Business_name:Business_name,
            Business_Display_address:Business_address,
            Business_id:Business_id,
            Category_name:category,
            User_id:this.state.user_id,
            Business_vote:"1",
            free_text:free_text,
            photoname:food_photo,
            phototype:"0",
            postuserid:postuserid,
            latitude:latitude,
            longitude:longitude,
            yelp_cat:yelpcategories
            

            

      }).then((response)=>{
        // console.log(response)
       
        const data = response['data']
        // console.log(data)
        const status = data['status']
        var Business_name = data['Business_name']
        const Total_votes = data['total_vote']
      
        if(status==1){
        this.setState({loading:false})
        this.setState({Modal_Visibility:false})       
        this.props.navigation.navigate('ThanksPage',{Business_name,Total_votes,category});}
        else{
        //   alert(status)
        alert("You have already voted for this restaurant in this category")
          this.setState({loading:false})
        }
 
      })
  }

  // end of continue funciton 

    // vote function for new post 
    vote = (data) => {
        // console.log(data)
        var data1 = data['data']
        // console.log(data1)
        if(this.uservotedcategory.some(category=>category.Category_name==String(data1['Category_name']))){
            // alert('ok')
              
        var newdata = data['data']
        
       
            
            this.setState({Modaldata:newdata})
        
        var Category_name=newdata['Category_name']
        this.setState({displayCategory:Category_name})
      
        this.setState({Modal_Visibility:true})
        Axios.post('http://203.190.153.22/api/business-vote',{
                    
           
                Category_name:Category_name,
                User_id:this.state.user_id
         
        }).then((response) => {
            // console.log(response);
            
        })
        }else{
            this.setState({loading:true})
        const data = data1
        const latitude = data['latitude']
        const longitude = data['longitude']
        var category = data['Category_name']
        const food_photo = data['photoname']
        const Business_id = data['id']
        const Business_name = data['name']
        const Business_location = data['location']
        const Business_address = Business_location['display_address']
        const free_text = data['free_text']
        const postuserid = data['userid']
        const yelpcategories = data['categories']
      


        Axios.post('http://203.190.153.22/api/business-vote-confirm',{
            Business_name:Business_name,
            Business_Display_address:Business_address,
            Business_id:Business_id,
            Category_name:category,
            User_id:this.state.user_id,
            Business_vote:"1",
            free_text:free_text,
            photoname:food_photo,
            latitude:latitude,
            longitude:longitude,
            phototype:"0",
            postuserid:postuserid,
            yelp_cat:yelpcategories
            

      }).then((response)=>{
        // console.log(response)
       
        const data = response['data']
        // console.log(data)
        const status = data['status']
        var Business_name = data['Business_name']
        const Total_votes = data['total_vote']
      
        if(status==1){
        this.setState({loading:false})
        this.setState({Modal_Visibility:false})       
        this.props.navigation.navigate('ThanksPage',{Business_name,Total_votes,category});}
        else{
            // console.log(response)
          alert("You have already voted for this restaurant in this category")
          this.setState({loading:false})

        }
 
      })
        }
    
        // }
        // else{alert('You have already vote on this post')}
    }

    // end of vote function

    ModalUnVisible=()=>{
        this.setState({Modal_Visibility:false})
    }

    // render button for showing spinner
    renderButton(){
        if (this.state.loading) {
            return <Spinner3 />;
        }
            return (
              <TouchableOpacity 
              // onPress={this.ok_Button}
              activeOpacity={0.7}
              // style={styles.buttonStyle} 
              onPress={this.continue} 
              activeOpacity={0.7}
              
              >
                  
              <Text style={Styles.Modal_TextStyle}> Continue </Text>
      
          </TouchableOpacity> 
            )
        }
// end of render button

// like function for like & dislike post
        Like = (data, inde) => {
            // console.log(data)
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
                        NavigationActions.navigate({ routeName: 'FeedPage' })
                    ],
                    }))
    
                })
            // alert('like')
            
          }
// end of like function

// image viewer for showing image in full view in modal which is not using now 

          ImageViewer=(photos)=>{
            //    console.log(photos)
           
              this.setState({visibleModal:"fancy"})
              // console.log(photos)
              this.setState({viewer:photos})
            
            }
// end of image viewer function

    render(){
        console.log(this.data)
      
        return(

            
            
                <View style={{height:'100%',backgroundColor:'#000'}}>

                <View style={Styles.navBar}>
                {/* image viewer modal */}
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

                 {/* clipbaord modal view */}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.copymodalVisible}>
                  <View style={Styles.copymodal}>
                   <Text style={{color:'#000',fontSize:20, fontFamily:'Futura'}}>Address copied to</Text>
                   <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>clipboard</Text>
                 </View>      
                </Modal>
            {/* end of clipboard modal */}
            {/* alert box modal for denied post in same category with same restaurant */}
                <Modal

                    visible={this.state.Modal_Visibility}

                    transparent={true}

                    animationType={"slide"}

                    onRequestClose={this.ModalUnVisible} 
                    >

                    <View style={{ flex:1, alignItems:'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>


                    <View style={Styles.Modal_Main_View}>


                    <Text style={Styles.Modal_title}>{`You already have a restaurant\nvoted best in this category`
                    // +` `+ (this.state.displayCategory) 
                    }</Text>





                    <Text style={Styles.Modal_Message}> {`Should we crown a new champion \nand remove your previous vote?`} </Text>





                    <View style={Styles.Modal_buttonStyle}>

                   
                    <TouchableOpacity 
                           
                            onPress={this.ModalUnVisible} 
                            activeOpacity={0.7} 
                            >

                    <Text style={Styles.Modal_TextStyle}> No </Text>

                 
                    </TouchableOpacity>
                    
                        {this.renderButton()}

                            </View>

                            </View>

                            </View>
                    </Modal>
            {/* end of modal */}
                <View style={{flexDirection:'row'}}>
                {/* <View>
                    <Menubar />
                </View> */}
                    
                    <View style={{alignItems:'center',width:'100%'}}>
                    <Text style={{fontSize:22,color:'#ffffff'}}>{this.state.User_name}</Text>
                    </View>
                   
                </View>
                <View style={{paddingLeft:20,paddingTop:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'60%'}}>
                            <View style={Styles.thumbnailtext}>
                                {
                                    this.state.profileimage==""?
                                <Text style={{color:'#000000',fontSize:30,fontWeight:'900'}}>{this.state.firstnameletter+this.state.lastnameletter}</Text>:
                                   <Image
                                    source={{uri:this.state.profileimage}}
                                    style={{width:70,height:70,borderRadius:70/2,resizeMode:'cover'}}
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
                                <Text style={{color:'#ffffff',fontSize:20}}>Likes</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{paddingTop:20}}>
                            <Text style={{color:'#fff',fontSize:18,fontFamily:'Futura',color:'#fff'}}>{this.state.aboutme}</Text>
                           
                        </View>
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
                                    
                                    style={{fontSize:22,width:300,paddingLeft:15,fontWeight:'700',color:'#fff',fontFamily:'Futura'}}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={text=>this.filterSearch(text)}
                                    // value={this.state.text}
                                    
                                    />
                                </View>
                <ScrollView>
                        {this.state.business_data.map(data => 
                          
                            <>
                            <View style={{width:"100%",paddingTop:10,height:"auto",paddingLeft:20}}>
                            
                               
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View>
                                <Text style={{fontSize:30,fontWeight:'800',fontFamily:'Futura',color:'#fff'}}>
                                    {data.Category_name}
                                {/* {data.name.length.toString() < 19 ? data.name : `${data.name.substr(0,17)}...`} */}
                                </Text>
                                </View>
                               
                                
                            </View>
                        <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Futura',color:'#fff'}}>{data.name}</Text>
                           
                                    <Text style={{fontSize:16,fontWeight:'500',width:'85%',fontFamily:'Futura',color:'#fff'}}>
                                        {data.Business_Display_address}
                                    {/* {data.Business_Display_address.length.toString() < 38 ? data.Business_Display_address : `${data.Business_Display_address.substr(0,38)}...`} */}
                                        </Text>
                                    
                                 {data.photoname!=''?
                           
                                <Image
                                    source={{uri:data.photoname}}
                                    style={{height:350,width:'105%',resizeMode:'cover',left:-20,marginVertical:10}}
                                    />
                              
                                    :null
                                }
                                <View style={{flexDirection:'row',left:-10,paddingTop:10}}>
                                   <TouchableOpacity onPress={()=>this.Like(data,'1')}>
                                    {data.vote_for_like.some(vote=>vote.User_id==parseInt(this.state.user_id))?
                                    <TouchableOpacity onPress={()=>this.Like(data,'0')}>
                                    <Image
                                        source={require('../src/Images/like_fill.png')}
                                        style={{width:38,height:26,resizeMode:'contain'}}
                                        /> 
                                    </TouchableOpacity> 
                                    : <TouchableOpacity onPress={()=>this.Like(data,'1')}><Image
                                    source={require('../src/Images/like.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    /></TouchableOpacity>
                                   
                                    }
                                    </TouchableOpacity>
                                    {data.userid==this.state.user_id && data.Business_vote==true?
                                    <TouchableOpacity onPress={()=>alert("You are already vote on this post")}>
                                     <Image
                                     source={require('../src/Images/vote_fill_white.png')}
                                     style={{width:38,height:26,resizeMode:'contain'}}
                                     />
                                     </TouchableOpacity>:
                                     <TouchableOpacity onPress={()=>this.vote({data})}>
                                    <Image
                                        source={require('../src/Images/vote_fill_black.png')}
                                        style={{width:38,height:26,resizeMode:'contain'}}
                                    />
                                    </TouchableOpacity>
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
                                
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Futura',color:'#fff'}}>{data.total_vote} Votes</Text>
                             
                                </View>
                           
                          
                            </View>
                            <View style={{ width: '100%', height: 0.7,paddingVertical:20, backgroundColor: '#000'}} />
                        </>
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

// styling for user timeline

const Styles = StyleSheet.create({
    navBar: {
        height:"25%",
        // marginTop:45,
        width:'100%',
        backgroundColor:'#000000',
        justifyContent:'flex-start',
        paddingTop:65,
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
    Modal_Main_View:{
     
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor : "#ffffff", 
        height: 250 ,
        width: '90%',
        paddingLeft:10,
      },
      Modal_title:{
       
        fontSize: 20, 
        color: "#000000",
        padding: 10,
       
      },
      Modal_Message:{
       
        fontSize: 20, 
        color: "#000000",
        padding: 10,
       
      },
      Modal_buttonStyle: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:'100%',
        paddingLeft:5,
        paddingTop:30,
        paddingRight:30
    },
    Modal_TextStyle:{
        color:'#000000',
        textAlign:'center',
        fontSize: 22,
        marginTop: -5,
        fontWeight:'700'
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
      }
})


export {UserTimeline};