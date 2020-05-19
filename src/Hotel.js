import React, {Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,AsyncStorage,StyleSheet,Clipboard, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryButton,CategoryButton2 } from '../src/Common/Index';
import Footer from '../src/Common/Footer';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import Modal from "react-native-modal";
import CameraRollGallery from "react-native-camera-roll-gallery";
import SwiperFlatList from 'react-native-swiper-flatlist';
import { StackActions, NavigationActions} from 'react-navigation';


// config function for fetch yelp data
const config = {
  headers: {'Authorization':'Bearer XkjWF9GSy19xRS_yytCtISMaViqsPuXGmQiTzzAdcRHHNJmISD9bnHisRb8tgF5H7xVuMnbcybxOvEHHM7o91yTFKcGO7KrERhOSMS9NtRiPQNq9tCxMl61oD10pXnYx'},
  
};

class Hotel extends Component{

  state = { Business_id: '', photos:[], Alert_Visibility: false, viewer: '',visibleModal:false, total_category:0,total_vote:0,total_like:0,copymodalVisible:false}

  data = this.props.navigation.state.params.data
  Business_id = this.data['id']
  Business_name = this.data['name']
  Business_location = this.data['location']
  Business_address = this.Business_location['display_address']

  
// image viewer for showing image in full view modal

ImageViewer=(photos)=>{
  this.setState({visibleModal:"fancy"})
  // console.log(photos)
  this.setState({viewer:photos})

}
// end of image viewer function

// function for getting data from yelp as per business name for photos
  componentDidMount(){
    this.loadSession().done();
    axios.get('https://api.yelp.com/v3/businesses/'+this.Business_id, config)
              .then((response)=>{
                    const data = response.data
                    const photos = data['photos']
                    this.setState({
                      photos:photos
                    })
                   
              })
}

// end of yelp function

// loadsession for getting user id & getting data like total category for vote, total vote, total like for business

loadSession = async() => {
    this.setState({
      user_id:await AsyncStorage.getItem('user_id')
    })
    axios.post('http://203.190.153.22/api/business-count',{
        id:this.Business_id
    }).then((response)=>{
        // console.log(response)
        const data = response['data']
        const total_category = data['total_category']
        const total_vote = data['total_vote']
        const total_like = data['total_like']

        this.setState({total_category:total_category,total_like:total_like,total_vote:total_vote})
    })
        
    // console.log(total_category)
  } 

  // end of load session 

  // clipboard function for copy address on clipboard

  set_on_clipboard = async(text) => {
        var fulltext = text.toString();
    await Clipboard.setString(fulltext)
    this.setState({copymodalVisible:true})
    {this.timeoutHandle = setTimeout(()=>{
      this.setState({copymodalVisible:false})
  }, 2000)}
  // console.log(fulltext)
}
    // end of clipboard function

// not using now
    // toggleModal = () => {
    //     this.setState({ isModalVisible: !this.state.isModalVisible });
    //   };

    render(){
        
      return(
            
            <SafeAreaView style={{backgroundColor:'#000000'}}>

                        <View style={{ flex: 1 }}>
                        
                        {/* modal for image view in full view modal  */}
                               
                            <Modal 
                                   isVisible={this.state.visibleModal === 'fancy'}
                                   backdropColor="#000000"
                                   backdropOpacity={0.8}
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
         
                                    <View style={{width:"100%", height:350, padding:22}}>
                                       
                                         
                                          
                                                  
                                                  
                                                    <SwiperFlatList
                                                    autoplay
                                                    autoplayDelay={200}
                                                    autoplayLoop
                                                    index={0}
                                                    // showPagination
                                                    >

                                                  {
                                                       this.state.photos.map(data=>
                                                        <View style={{width:328, height:350}}>
                                                            
                                                            
                                                        <Image source={{uri:data}}
                                                        style={{height:350, width:328,resizeMode:'cover'}} />
                                                        
                                                        </View>
                                                        )
                                                   }


                                                    </SwiperFlatList>
                                               
                                              
                                        
                                    </View>
                                </View>
                            </Modal>
                            {/* endl of image viewer modal  */}
                        </View>
                        {/* modal view for clipboard message view */}
                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={this.state.copymodalVisible}>
                        <View style={styles.copymodal}>
                        <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>Address copied to</Text>  
                        <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>clipboard</Text> 
                        </View>      
                        </Modal>
                    {/* end fo clipboard modal  */}
                                    
                <View style={{height:'100%',width:'100%',backgroundColor:'#000000'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                <View>
                    <Image
                        source={require('../src/Images/back.png')}
                        style={{width:35,height:30,resizeMode:'contain',marginLeft:20}}
                    />
                </View>
                </TouchableOpacity>
                    <View style={{alignItems:'flex-start',paddingTop:20,paddingLeft:20}}>
                    <Text style={{fontSize:40,color:'#ffffff',fontWeight:'bold',fontFamily:'Futura'}}>{this.Business_name}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20, justifyContent:'space-between',paddingHorizontal:10}}>
                    <View style={{flexDirection:'row',alignItems:'center',width:'60%'}}>
                    <TouchableOpacity onPress={()=>this.set_on_clipboard(this.Business_address)}>
                        <Image
                        source={require('../src/Images/copy.png')}
                        style={{width:25,height:30,resizeMode:'contain'}}
                        />
                    </TouchableOpacity>
                    <View style={{paddingLeft:10}}>
                        {this.Business_address.map(address=>
                           <Text style={{color:'#ffffff',fontFamily:'Futura'}}> {address}</Text>
                            )}
                    </View>
                    </View>
                    <View>
                        <Text style={{color:'#ffffff',fontFamily:'Futura'}}>{this.state.total_category +" "+ "Categorized"}</Text>
                     
                    
                    
                    <Text style={{color:'#ffffff',fontFamily:'Futura'}}>{this.state.total_vote +" "+ "Votes"}</Text>
                   
                    
                    <Text style={{color:'#ffffff',fontFamily:'Futura'}}>{this.state.total_like +" "+  "Likes"}</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20,paddingLeft:20}}>
                        <Text style={{color:'green',fontFamily:'Futura'}}>OPEN </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:"85%"}}>
                        <Text style={{color:'#ffffff',paddingLeft:10,fontFamily:'Futura'}}> 11 am to 11pm</Text>
                  
                        </View>
                    </View>
                    <View style={{height:40,backgroundColor:'grey',marginTop:50}}>
                    <ScrollView
                    horizontal={true}
                    
                    > 
                    <View style={{flexDirection:'row'}}>
                        <CategoryButton2>ALL</CategoryButton2>
                        {/* <CategoryButton>Interior</CategoryButton>
                        <CategoryButton>food</CategoryButton>
                        <CategoryButton>menu</CategoryButton>
                        <CategoryButton>outdoor</CategoryButton> */}
                        {/* <CategoryButton>Dummy</CategoryButton>
                        <CategoryButton>Dummy</CategoryButton>
                        <CategoryButton>Dummy</CategoryButton>
                        <CategoryButton>Dummy</CategoryButton>
                        <CategoryButton>Dummy</CategoryButton>
                        <CategoryButton>Dummy</CategoryButton> */}
                    </View>
                    </ScrollView>
                    </View>
                   
                    <ScrollView>
                    
                  <View style={{width:"110%",height:141, flexDirection:"row"}}>
                  {
                      this.state.photos.map(photos=>
                        <View style={{height:141,width:"30%"}}>
                           <TouchableOpacity onPress={()=>this.ImageViewer(photos)}>
                            <Image
                            source={{uri:photos}}
                            style={styles.photocontainer}
                            />
                         </TouchableOpacity>
                        </View>  

                    )}
                  </View>
                
                    </ScrollView>
                    </View>
                    <View style={{justifyContent:'flex-end',bottom:0 ,position: 'absolute',width:'100%'}}>
                    <View style={{ height: 1, backgroundColor: '#fff',marginTop:20}} />
                   
                    <Footer />
                    </View>
                
            </SafeAreaView>
        );
    }
}

// styleing for hotel page

const styles = StyleSheet.create({
    photocontainer:{
        width:140,
        height:140,
        resizeMode:'cover',
        borderWidth:1,
        borderColor:'#ffffff'
        
    },
    copymodal: {
        height:100,
        marginLeft:70,
        width:"60%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10
      },
    MainContainer :{
     flex:1,
    },
     
    Alert_Main_View:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: "100%" ,
      width: '100%',
     
    },
     
    });


export {Hotel}