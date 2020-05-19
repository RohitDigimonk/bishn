import React, {Component} from 'react';
import {Text,View,ScrollView,StyleSheet,Image,TextInput,Clipboard, TouchableOpacity,Modal, AsyncStorage}from 'react-native';
import { CategoryButton } from './Common/Index';
import Footer from './Common/Footer';
import axios from 'axios';
import { StackActions, NavigationActions} from 'react-navigation';
import Modal2 from "react-native-modal";
import {Spinner3} from './Common/Index';
import Geolocation from '@react-native-community/geolocation';
import PTRView from 'react-native-pull-to-refresh';




class FeedPage extends Component{

    state = {user_id:'',businesses: [],Modal_Visibility:false,loading:false,Modaldata:'', active:false,Alert_Visibility:false,
     recenticon:true, likedicon:false, closeicon:false,namefirst:'',copymodalVisible:false,visibleModal:false,active:false}

     _refresh=()=> {
        return new Promise((resolve) => {
            setTimeout(()=>{
                // some refresh process should come here
                axios.post('http://203.190.153.22/api/business-data')
          .then((response)=> {
            //   console.log(response)
            const responsedata = response.data
            const data = responsedata['data']
            this.setState({
                arrayholder:data,
                businesses:data
            })
            // console.log(this.state.businesses)
          })
                resolve(); 
              }, 2000)
        });
      }

       

// for getting current location of user & categorydata in which user already voted
    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id'),
          token:await AsyncStorage.getItem('token')
        })  
        Geolocation.getCurrentPosition((position) => {
            // console.log(position);
            var cord = position['coords']
            var longitude = cord['longitude']
            var latitude = cord['latitude']
            this.setState({longitude:longitude,latitude:latitude})
        })

        // this functionality check wheter user already voted on same category or not

        axios.post('http://203.190.153.22/api/category-data',{
          User_id : this.state.user_id
    })
        .then((response)=>{
            const data1 = response['data']
            const uservotedcategory = data1['category_data']
            this.setState({uservotedcategory:uservotedcategory})
        })
      }
// end load session

// for coppy address on clipboard
      set_on_clipboard = async(text) => {
          await Clipboard.setString(text)
          this.setState({copymodalVisible:true})
          {this.timeoutHandle = setTimeout(()=>{
            this.setState({copymodalVisible:false})
        }, 2000)} 
          
        // console.log(text)
      }
// end set_on_clipboard

// for loading all feed page data on page load
      componentDidMount(){
          this.loadSession().done();
          axios.post('http://203.190.153.22/api/business-data')
          .then((response)=> {
            //   console.log(response)
            const responsedata = response.data
            const data = responsedata['data']
            this.setState({
                arrayholder:data,
                businesses:data
            })
            // console.log(this.state.businesses)
          })
          
      }
// component didmount complete
   
// for like the other users post

Like = (data, inde) => {
        
            axios.post('http://203.190.153.22/api/business-like',{
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
// like complete


      burgermenu = (active) => {
              this.setState({active:!active})
              this.props.navigation.drawerOpen()
          
          
      }
      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible})
    }

    filterOption = () => {
        this.Show_Custom_Alert(!this.state.Alert_Visibility)
    } 

 // for filtering as per mostrecent     
    mostRecent = () => {
        
        this.setState({likedicon:false})
        this.setState({closeicon:false})
        this.setState({recenticon:true})
        var sort = this.state.arrayholder.sort((a,b)=>{
            return b.buss_pk-a.buss_pk
        })
        this.setState({businesses:sort})
        
        this.Show_Custom_Alert(!this.state.Alert_Visibility)
        
        
    }
// most recent completed

// for filtering as per most vote on amy post
    mostVoted = () => {
        this.setState({recenticon:false})
        this.setState({closeicon:false})
        this.setState({likedicon:true})
       var sort= this.state.arrayholder.sort((a,b)=>{
            return b.total_vote-a.total_vote
        });
        this.Show_Custom_Alert(!this.state.Alert_Visibility)
        this.setState({businesses:sort})
        
        // console.log(sort)
    }
// most voted completed

// for filtering as per near by user

    closest = () => {
        this.setState({recenticon:false})
        this.setState({likedicon:false})
        this.setState({closeicon:true})
        
        // console.log(this.state.arrayholder)
        var sort= this.state.arrayholder.sort((a,b)=>{
            return b.latitude-a.latitude
        });
        this.setState({businesses:sort})
        // console.log(this.state.latitude)
        this.Show_Custom_Alert(!this.state.Alert_Visibility)
    }
// closest completed

// after vote confirmation that you already vote on the same category previous vote removed

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
        

        console.log({
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
        })
        axios.post('http://203.190.153.22/api/business-vote-confirm',{
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
        console.log(data)
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
// complete continue functionality
           
// for vote on any post whether in same or new category
    vote = (data) => {
        // console.log(data)
        var data1 = data['data']
        // console.log(data1)
        if(this.state.uservotedcategory.some(category=>category.Category_name==String(data1['Category_name']))){
            // alert('ok')
              
        var newdata = data['data']
        
       
            
            this.setState({Modaldata:newdata})
        
        var Category_name=newdata['Category_name']
        this.setState({displayCategory:Category_name})
      
        this.setState({Modal_Visibility:true})
        axios.post('http://203.190.153.22/api/business-vote',{
                    
           
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
      
        axios.post('http://203.190.153.22/api/business-vote-confirm',{
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
        console.log(data)
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
  
    }

    // completed vote functionality

    ModalUnVisible=()=>{
        this.setState({Modal_Visibility:false})
    }
// for continue spinner loading
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
// continue spinner end
       
// search post as per name, free text, address, category. yelp category, username
    filterSearch=(text)=>{
            // console.log(text)
            const newData = this.state.arrayholder.filter(function(item) {
               
                const itemData1 = item.name  ? item.name.toUpperCase() : ''.toUpperCase();
                const itemData2 = item.free_text  ? item.free_text.toUpperCase() : ''.toUpperCase();
                const itemData3 = item.Business_Display_address  ? item.Business_Display_address.toUpperCase() : ''.toUpperCase();
                const itemData4 = item.username  ? item.username.toUpperCase() : ''.toUpperCase();
                const itemData5 = item.Category_name ? item.Category_name.toUpperCase() : ''.toUpperCase();
                const itemData6 = item.yelp_cat ? item.yelp_cat.toUpperCase() : ''.toUpperCase();
                const itemData = itemData1.concat(itemData3,itemData2,itemData4,itemData5,itemData6)
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
              this.setState({
                //setting the filtered newData on datasource
                //After setting the data it will automatically re-render the view
                businesses: newData,
                // text: text,
              });
            
    }

    // end filter search

// break user name & surname first letter for profile icon 

   splituser=(username)=>{
        // console.log(username)
        
        const a = username.split(" ")
        // console.log(a)
        const b = a[0]
        const c = a[1]
        const namefirst = b.charAt(0)
        const surnamefirst = c.charAt(0);
        
   }
// end splituser 

// for picture zooming in & zooming out
   ImageViewer=(photos)=>{
    //    console.log(photos)
   
      this.setState({visibleModal:"fancy"})
      // console.log(photos)
      this.setState({viewer:photos})
    
    }
// complete image viewer

// for open side drawer
    opendrawer=()=>{
        this.props.navigation.openDrawer()
        this.setState({active: !this.state.active})
       }  
    render(){
      
        const {uservotedcategory} = this.state;
        // console.log(this.state.user_id)

        return(
            
                <View style={{height:'100%',width:'100%',backgroundColor:'#000'}}>
                    
                <View>
            {/* modal for picture zoomin & zoomout  */}
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
                    {/* completed picture zoomin & zoomout */}
                    {/* modal for clipboard  */}
                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={this.state.copymodalVisible}>
                        <View style={Styles.copymodal}>
                        <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>Address copied to</Text> 
                        <Text style={{color:'#000',fontSize:20,fontFamily:'Futura'}}>clipboard</Text>  
                        </View>      
                        </Modal>
                    {/* end clipboard modal */}
                    {/* modal for vote on post */}
                        <Modal

                            visible={this.state.Modal_Visibility}

                            transparent={true}

                            animationType={"slide"}

                            onRequestClose={this.ModalUnVisible} 
                            >

                            <View style={{ flex:1, alignItems:'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>


                            <View style={Styles.Modal_Main_View}>


                            <Text style={Styles.Modal_title}>{`You already have a restaurant\nvoted best in this category`
                            // `+` `+ (this.state.displayCategory) 
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
                            {/* end modal for vote */}
                            {/* modal for filter as most recent, closest, voted */}
                <Modal

                        visible={this.state.Alert_Visibility}

                        transparent={true}

                        animationType={'fade'}

                        onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >

                        <View style={{ flex:1, alignItems:'flex-end', justifyContent:'flex-end', backgroundColor: 'rgba(0,0,0,.5)' }}>


                        <View style={Styles.Alert_Main_View}>


                        <Text style={{color:'#ffffff',paddingBottom:20,paddingLeft:10,fontSize:15}}>Sort by</Text>    
                        <TouchableOpacity onPress={this.mostRecent}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>
                        
                        <Text style={Styles.textstyle}>Most Recent</Text>
                       
                        {this.state.recenticon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.mostVoted}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>
                        
                        <Text style={Styles.textstyle}>Most Voted</Text>
                       
                        {this.state.likedicon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.closest}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:390}}>
                       
                        <Text style={Styles.textstyle}>Closest</Text>
                       
                        {this.state.closeicon?
                        <Image
                        source={require('../src/Images/right.png')}
                        style={{height:25,width:20,resizeMode:'contain'}}
                        />:null
                        }
                        </View>
                        </TouchableOpacity>
                        <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                        <View style={{height:40,width:140}}>
                         <TouchableOpacity onPress={()=>this.Show_Custom_Alert(!this.state.Alert_Visibility)} style={{flex:2,alignSelf:'stretch',backgroundColor:'#000',borderRadius:20,borderWidth:1,borderColor:'#fff',marginLeft:5,marginRight:5}}>
                             <Text style={{alignSelf:'center',color:'#fff',fontSize:16,fontWeight:'600',paddingTop:10,paddingBottom:10}}>Cancel</Text>
                         </TouchableOpacity>
                        </View>
                        </View>
                        </View>

                        </View>
                    </Modal>
                    {/* end filter modal */}
                </View>
                <View style={{marginTop: 60,alignItems:'flex-end',width:700,zIndex:999}}>
                            <CategoryButton onPress={this.filterOption}>
                                FILTER
                            </CategoryButton>
                </View>
                <View style={Styles.navBar}>
              
                    {/* <Menubar /> */}
                  
                    {/* <View style={{flexDirection:'row',paddingTop:13,width:'100%',backgroundColor:'red'}}> */}
                    <Image
                    source={require('../src/Images/Search.png')}
                    style={{width:36,height:22,resizeMode:'contain'}}
                    />
                    <TextInput
                    style={{fontSize:22,width:300,paddingLeft:15,fontWeight:'700',color:'#fff',fontFamily:'Futura'}}
                    placeholder="Search here"
                    placeholderTextColor="grey"
                    onChangeText={text=>this.filterSearch(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    />
                
                </View>
               
                <PTRView onRefresh={this._refresh} >
                <ScrollView style={{marginTop:15}}>
                    {/* view all data of post  */}
                    {
                        this.state.businesses.map(data => {
                                const fullname = data.username.split(' ')
                                const firstname = fullname[0]
                                const lastname = fullname[1]
                                console.log(data)

                               

                            return(
                            <View>
                                
                            <View style={{width:"100%",paddingTop:10,height:'auto', paddingLeft:20, backgroundColor:'#000'}}>
                            
                           
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{width:'80%'}}>
                                <Text style={{fontSize:30,fontWeight:'800',fontFamily:'Futura',color:'#fff'}}>
                                 
                                    {data.Category_name}
                                   
                                    </Text>
                                </View>
                                
                            </View>
                         
                            <Text style={{fontSize:24,fontWeight:'600',fontFamily:'Futura',color:'#fff'}}>{data.name}</Text>
                            <View style={{flexDirection:'row',width:"100%",height:'auto'}}>
                          
                                    
                                    <Text style={{fontSize:16,fontWeight:'500',width:'85%',fontFamily:'Futura',color:'#fff'}}>
                                        {data['Business_Display_address']}
                                        
                                    </Text>
                                 
                                 
                                
                                </View>
                              
                                {data.photoname!=''?
                              
                                <Image
                                    source={{uri:data.photoname}}
                                    style={{height:350,width:'105%',resizeMode:'cover',left:-20,marginVertical:10}}
                                    />
                         
                                :null
                                }
                     
                                <View style={{flexDirection:'row',paddingTop:10,width:'100%',left:-10}}>
                                    {   
                               
                                        data.vote_for_like.some(vote=>vote.User_id==parseInt(this.state.user_id))?<TouchableOpacity onPress={()=>this.Like(data,'0')}>
                                        <Image
                                            source={require('../src/Images/like_fill.png')}
                                            style={{width:38,height:26,resizeMode:'contain'}}
                                            /> 
                                        </TouchableOpacity> 
                                        : <TouchableOpacity onPress={()=>this.Like(data,'1')}>
                                            <Image
                                        source={require('../src/Images/like.png')}
                                        style={{width:38,height:26,resizeMode:'contain'}}
                                        />
                                        </TouchableOpacity>
                                    
                                    }
                                                  
                                    
                                    {data.User_id==this.state.user_id && data.Business_vote==true?
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
                                <View>
                                   <TouchableOpacity onPress={()=>this.set_on_clipboard(data.Business_Display_address)}>
                                    <Image
                                    source={require('../src/Images/copy.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    />
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:'auto'}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Hotel',{data})}>
                                <Image
                                    source={require('../src/Images/add_icon_white.png')}
                                    style={{width:38,height:26,resizeMode:'contain'}}
                                    />
                                </TouchableOpacity>
                                </View>
                                
                                </View>
                                </View>
                                <View style={{marginTop:5}}> 
                                <Text style={{fontSize:18,fontWeight:'700',fontFamily:'Futura',color:'#fff'}}>{data.total_vote} Votes</Text>
                                </View>
                                <View style={{marginTop:3,paddingRight:5}}>
                                    <Text style={{fontFamily:'Futura',color:'#fff',fontSize:18,fontWeight:'400'}}>{data.free_text}</Text>
                                </View>
                                <View style={{marginTop:3}}>
                             
                                {data.User_id!=this.state.user_id?
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserTimeline',{data,uservotedcategory})}>
                            
                                    <Text style={{fontSize:18,fontWeight:'400',fontFamily:'Futura',color:'#fff'}}>{data.username}</Text>
                           
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SelfTimeline',{data})}>
                            
                                    <Text style={{fontSize:18,fontWeight:'400',fontFamily:'Futura',color:'#fff'}}>{data.username}</Text>
                           
                                </TouchableOpacity>
                                }   
                             
                                </View>
                                
                            </View>
                            
                            <View style={{ width: '100%', height: 0.7,paddingVertical:20, backgroundColor: '#000'}} />
                            </View>
                            )
                        })
                    }
               {/* end of view for all post  */}
                       
                </ScrollView>
                </PTRView>
                {/* plus icon for go to on voting page for created a new post */}
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('VotingPage')}>
                   <View style={{width:'100%',alignItems:'flex-end'}}>
                        <Image
                            source={require('../src/Images/add_black.png')}
                            style={{width:100,height:100,resizeMode:'contain',bottom:5,position:'absolute'}}
                        />
                    </View>
                    </TouchableOpacity>
                    {/* end plush icon  */}
                    <View>
                    
                   <Footer />
                   </View>
                   
                   </View>
                   
                
        );
    }
}

// all styling for feed page

const Styles = StyleSheet.create({
    navBar: {
        height:60,
        paddingTop:10,
        marginTop:20,
        width:'90%',
        flexDirection:'row',
        backgroundColor:'#000000',
        alignItems:'center',
        paddingLeft:5,
        borderBottomWidth: 1,
        borderColor:'#fff',
        marginLeft:20,

    },
    Alert_Main_View:{
     
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor : "#000000", 
        height: "30%" ,
        width: '100%',
        paddingLeft:10,
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
      textstyle: {
        color:'#ffffff',
        fontSize:20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20
      },
      thumbnailtext:{
        width:40,
        height:40,
        borderRadius:50,
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
        // borderColor:'#000000',
        // borderWidth:1,
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10
      },
    
    
})


export {FeedPage};