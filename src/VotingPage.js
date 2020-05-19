import React,{Component} from 'react';
import {Text,View, StyleSheet,TextInput, Image, ScrollView,Alert, TouchableOpacity,Modal,AsyncStorage}from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import {Spinner3,Cspinner} from './Common/Index';
import Geolocation from '@react-native-community/geolocation';



class VotingPage extends Component{

    state={businesses:[], arrayholder: [],
          Alert_Visibility:false,Alert_Visibility_Vote:false, votedata: '',
          categories:[], blankcategories: [], All_data:[],
           photo: null, food_photo:'',loading:false,loading:false,Cloading:false,freeText:'',hashdata:[],hashdata1:[],text1:''}

   
// alert function for showing when favourite food name not filled
    alertfunciton = () => {
        Alert.alert(
                    '',
                    'please fill your favourite food name',
                    [
                      
                      {
                        text: 'Ok',
                        onPress: () => this.setState({text:null}),
                        style: 'cancel',
                      },
                    //   {text: 'Ok', onPress: () => console.log('OK Pressed')},
                    ],
                    // {cancelable: false},
                  );
                
    }
// end of alert funciton favourite food not filled

// photoupload functionality with dependcy imagepicker of post
    photoUpload = () => {
        const options = {
          quality: 100.0,
          maxWidth: 600,
          maxHeight: 600,
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              // path: 'images',
            },
            // noData: true
          };

          ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.uri) {
                this.setState({ photo: response })
            }
          
            if (response.didCancel) {
              // console.log('User cancelled image picker');
            } else if (response.error) {
              // console.log('ImagePicker Error: ', response.error);
            } 
            else if (response.customButton) {
              // console.log('User tapped custom button: ', response.customButton);
            }
             else {
              const source = { uri: response.uri };
              // console.log(response)
              // You can also display the image using data:
            //   const source = { uri: 'data:image/jpeg;base64,' + response.data };
            //  console.log(response.data)
              this.setState({
                avatarSource: source,
                food_photo:response.data
              });
            }
          });
    }

  // end of photoupload functionality

  // function for use userid from sync storage, search food name/category data from api, get user profile & current location & 
  // data as per distance

    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id')
        })
       
        // api for fetch data of food_name / category 

        axios.post('http://203.190.153.22/api/category-data',{
          User_id : this.state.user_id
    })
        .then((response)=>{
            const data1 = response['data']
            const uservotedcategory = data1['category_data']
            const data = data1['data']
            // console.log(uservotedcategory)
            this.setState({categories:data,uservotedcategory:uservotedcategory})
        })

        // api for getting user profile information like distance & current location
        axios.post('http://203.190.153.22/api/user-data',{
            User_id:this.state.user_id,
            post_id:''
        }).then((response)=>{
            // console.log(response)
            const profiledata = response['data']
            // const location = profiledata['location']
            const distance = profiledata['distance']
            // console.log(distance)
            this.setState({distance:distance})
        })
        // console.log(this.state.user_id)
        Geolocation.getCurrentPosition((position) => {
          // console.log(position);
          var cord = position['coords']
          var longitude = cord['longitude']
          var latitude = cord['latitude']
          // console.log(latitude,longitude)
          this.setState({latitude:latitude,longitude:longitude})
        })
        
      } 

    
    
    componentDidMount(){
        this.loadSession().done(); 
    }
// end of load session 


    Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible})
    }

    Show_Custom_Alert_Vote(visible) {
      // console.log(visible)
      this.setState({Alert_Visibility_Vote: visible})
  }

// continue functionality for vote confirmation & redirect to thank's page after success

    continue = () => {
     
        this.setState({loading:true})
        const data = this.state.votedata
        const coordinates = data['coordinates']
        const latitude = coordinates['latitude']
        const longitude = coordinates['longitude']
        const category = this.state.text1
        const food_photo = this.state.food_photo
        const Business_id = data['id']
        const Business_name = data['name']
        const Business_location = data['location']
        const Business_address = Business_location['display_address']
        const yelpcategories = data['categories']
        // console.log(yelpcategories)

        axios.post('http://203.190.153.22/api/business-vote-confirm',{
            Business_name:Business_name,
            Business_Display_address:Business_address,
            Business_id:Business_id,
            Category_name:category,
            User_id:this.state.user_id,
            Business_vote:"1",
            free_text:this.state.freeText,
            photoname:food_photo,
            phototype:"1",
            postuserid:'',
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
        this.Show_Custom_Alert_Vote(!this.state.Alert_Visibility_Vote)  
        const category = this.state.text1      
        this.props.navigation.navigate('ThanksPage',{Business_name,Total_votes,category});}
        else{
          alert("You have already voted for this restaurant in this category.")
          this.setState({loading:false})
          console.log(response)
        }
 
      })
  }

  // end of continue functionality
  
  //render button for spinner on continue click for vote confirmation
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
                        
                    <Text style={Styles.TextStyle}> Continue </Text>
            
                </TouchableOpacity> 
                  )
              }
// end of continue spinner

// yelp spinner functionality for wait yelp data to fetch

          yelpspinner(){
            if (this.state.loading2) {
              return <Spinner3 />;
            }
              return null
          }

          cloading(){
            if (this.state.Cloading){
              return <Cspinner />
            }
            return null
          }


// vote functionality for check new post & post already in particular category
    
    Vote = (user_id,category_name,votedata) => {
      // console.log(this.state.text1)
      if(this.state.text1==''){
        alert('favourite food should be filled')
      }
     else if(
       this.state.uservotedcategory.some(category=>category.Category_name==String(category_name))){
      // alert('ok')
        this.setState({displayCategory:category_name})
        
       
        this.setState({votedata:votedata})
        this.Show_Custom_Alert_Vote(!this.state.Alert_Visibility_Vote)
        
      }
     
      else{
        this.setState({Cloading:true})
        const data = votedata
        const coordinates = data['coordinates']
        const latitude = coordinates['latitude']
        const longitude = coordinates['longitude']
        const category = this.state.text1
        const food_photo = this.state.food_photo
        const Business_id = data['id']
        const Business_name = data['name']
        const Business_location = data['location']
        const Business_address = Business_location['display_address']
        const yelpcategories = data['categories']
        
        axios.post('http://203.190.153.22/api/business-vote-confirm',{
            Business_name:Business_name,
            Business_Display_address:Business_address,
            Business_id:Business_id,
            Category_name:category,
            User_id:this.state.user_id,
            Business_vote:"1",
            free_text:this.state.freeText,
            photoname:food_photo,
            phototype:"1",
            postuserid:'',
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
        this.setState({Cloading:false})
        this.Show_Custom_Alert(!this.state.Alert_Visibility)  
        const category = this.state.text1      
        this.props.navigation.navigate('ThanksPage',{Business_name,Total_votes,category})
        }
        else{
          // console.log(status)
          alert("Something went wrong")
          this.setState({Cloading:false})
        }
 
      })
      }
    }

    // end of vote functionality

    // filtersearch functionality for fetching data from yelp api after pressing 2 or more then 2 letter 

    filterSearch=(text)=> {
      // console.log(text)
        if(text.length > 1)
        {
          this.setState({loading2:true})
          axios.get('https://api.yelp.com/v3/businesses/search', 
              {headers: {'Authorization':'Bearer XkjWF9GSy19xRS_yytCtISMaViqsPuXGmQiTzzAdcRHHNJmISD9bnHisRb8tgF5H7xVuMnbcybxOvEHHM7o91yTFKcGO7KrERhOSMS9NtRiPQNq9tCxMl61oD10pXnYx'},
              params: {
                  term: text,
                  // categories:'desserts',
                  // name:'the house',
                  // location: 'Unnamed Road, Cupertino, CA 95014, USA',
                  latitude:this.state.latitude,
                  longitude:this.state.longitude,
                  radius:this.state.distance * 1600, // max value 25 miles = 40000 (mtr) 
                  limit:50
              }
          })
                    .then((response)=>{
                        console.log(response)
                          this.setState({loading2:false})
                          const data = response.data
                          const businesses = data['businesses']
                          // console.log(businesses)
                          this.setState({
                              arrayholder:businesses,
                              businesses:businesses
  
                          })
                          // console.log(this.state.businesses)
                    })
          //passing the inserted text in textinput
          const newData = this.state.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            businesses: newData,
            text: text,
          });
           
        }else
       
        this.setState({businesses:[]})

      }

  // end of filter search functionality

  //search functionality in category/food name in top search bar

      categorySearch=(categorytext)=> {
        var text = categorytext.toLowerCase()
        // console.log(lowercasetext)
        var BlanK_array=[]
       if(text==""){
           this.setState({
               All_data:BlanK_array,
               text1:""
           })
       }
       else{
        const newData = this.state.categories.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.Category_name ? item.Category_name.toUpperCase() : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            
          });
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            All_data: newData,
            text1: text,
            // blankcategories:newData
          });
        
       }
      }
// end of category search

      Automenu=(categories)=>{
        //   console.log(categories)
        //   var BlanK_array=[]
        this.setState({ text1: categories,All_data:[]})
        // console.log(this.state.text1)
      }

     

      freetext=(text)=>{
        if(text==""){
          this.setState({
              hashdata1:[],
              hashtext:""
          })
      }else{
        this.setState({freeText:text})
      }
        
    }

    Autohashtext=(hashtext)=>{
          // console.log(hashtext)
         var text= this.state.hashtext.split(" ")
          
          text.map((value, key)=>{
            if(value.includes("#")){
              // console.log(value, key)
              text[key]=hashtext
            }
          })
          // console.log(text)
          var new_text= text.join(" ")
      
           var value= this.state.hashtext+hashtext
          this.setState({ hashtext: new_text,hashdata1:[]})
    }
        
      

    render(){
        
        const { photo } = this.state;
        
        return(

           // all voting page design view
          <SafeAreaView>
            <View style={{height:'100%',paddingTop:10,width:"100%"}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedPage')}>
                <Image
                    source={require('../src/Images/back2.png')}
                    style={{width:19,height:33,marginLeft:26}}  
                />
                </TouchableOpacity>
                <View style={Styles.MainContainer}>
                
                {/* modal for new post spinner */}

                <Modal

                    visible={this.state.Cloading}

                    transparent={true}

                    animationType={"slide"}

                    // onRequestClose={ () => { this.(!this.state.Alert_Visibility_Vote)} } 
                    >
                
                <View style={{ flex:1, alignItems:'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>


                                {this.cloading()}

                            </View>
                </Modal>

                {/* end of cloading modal */}

                {/* modal for check if user already vote in same category (ok & contiue button) */}
                 
                <Modal

                            visible={this.state.Alert_Visibility_Vote}

                            transparent={true}

                            animationType={"slide"}

                            onRequestClose={ () => { this.Show_Custom_Alert_Vote(!this.state.Alert_Visibility_Vote)} } >

                            <View style={{ flex:1, alignItems:'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)' }}>


                            <View style={Styles.Alert_Main_View}>


                            <Text style={Styles.Alert_Title}>{`You already have a restaurant\nvoted best in this category.`
                            // +` `+ (this.state.displayCategory) 
                            }
                            </Text>

                            <Text style={Styles.Alert_Title}>{`Should we crown a new champion \nand remove your previous vote?`
                            // +` `+ (this.state.displayCategory) 
                            }
                            </Text>

                            <View style={Styles.buttonStyle}>

                           
                            <TouchableOpacity 
                                   
                                    onPress={() => {this.Show_Custom_Alert_Vote(!this.state.Alert_Visibility_Vote)} } 
                                    activeOpacity={0.7} 
                                    >

                            <Text style={Styles.TextStyle}> No </Text>

                        
                            </TouchableOpacity>
                           
                                {this.renderButton()}

                            </View>

                            </View>

                            </View>
                  </Modal>

                  {/* end of modal */}

                    </View>
                <View style={Styles.containerStyle}>
                    <TextInput
                    placeholder={"The best (name of dish) in town!"}
                    placeholderTextColor='#000'
                    multiline={true}
                    style={{fontSize:24,width:360,fontFamily:'Futura'}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={ category => this.categorySearch(category)}
                    value={this.state.text1}
                    
                    />
                   
                </View>
                
                  <View style={{flexDirection:'row'}}>
                <ScrollView horizontal={true} keyboardShouldPersistTaps='always' showsHorizontalScrollIndicator={false}> 
                    
                    {
                        this.state.All_data.map(categories => 
                         
                        <TouchableOpacity onPress={()=>this.Automenu(categories.Category_name)}>
                        <View style={Styles.Suggestion}>
                        <Text style={{fontFamily:'Futura'}}>{categories.Category_name}</Text>
                        </View>
                        </TouchableOpacity>
                        
                            )
                    }
                </ScrollView>
                </View>
                <View style={{paddingLeft:20,marginBottom:10, marginTop:5,alignItems:'flex-start'}}>
                {photo && (
                <Image
                    source={{ uri: photo.uri}}
                    style={{width:140,height:140,borderRadius:20,margin:5}}
                 />
                 )}
                
                </View>
                <TouchableOpacity onPress={this.photoUpload}>
                <Image
                source={require('../src/Images/attach.png')}
                style={{height:25,width:20,resizeMode:'contain',paddingLeft:70,marginTop:-10}}
                />
                </TouchableOpacity>
                <View style={Styles.containerStyle}>
                <TextInput
                    placeholder={'Wanna share your thoughts ?'}
                    placeholderTextColor='#000'
                    multiline={true}
                    style={{fontSize:24,width:400,fontFamily:'Futura'}}
                    maxLength={140}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => this.freetext(text)}
                    // value={this.state.hashtext}
                    />
                
                </View>
                <View style={{position:'absolute',width:'110%',marginTop:"40%",backgroundColor:'#ffffff'}}>
                <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}> 
                    
                    {
                        this.state.hashdata1.map(hashdata1 => 
                         
                        <TouchableOpacity onPress={()=>this.Autohashtext(hashdata1.value)}>
                        <View style={Styles.Suggestion2}>
                        <Text style={{fontSize:20,fontFamily:'Futura'}}>{hashdata1.value}</Text>
                        </View>
                        </TouchableOpacity>
                        
                            )
                    }
                </ScrollView>
                </View>
                
                <View style={[Styles.containerStyle2,{marginTop:20}]}>
                 <TouchableOpacity onPress={this.search}>   
                <Image
                    source={require('../src/Images/Search.png')}
                    style={{width:24,height:18,marginTop:10,resizeMode:'contain'}}                
                    />
                </TouchableOpacity>
                
                    <TextInput
                    placeholder="Find the restaurant"
                    placeholderTextColor="#000"
                    style={{fontSize:22,width:300,paddingLeft:15,fontWeight:'700',fontFamily:'Futura'}}
                    onChangeText={text => this.filterSearch(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    // value={this.state.text}
                    
                    />
                {this.yelpspinner()}
                </View>
                  <View style={{height:"65%",width:'100%',paddingBottom:'10%'}}>
                 
                <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} >
                    
                        
                {
                   
                    this.state.businesses.map(data => 
                        // console.log(data);
                    
                    <View style={{flexDirection:'row',borderBottomWidth:1,paddingBottom:10,marginLeft:20,width:360,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.Vote(this.state.user_id,this.state.text1,data)} 
                            activeOpacity={0.7}>
                    <Text style={Styles.businessName}>{data.name}</Text>
                    {/* <Text style={Styles.addressText}>{data.location['display_address']}</Text> */}
                    {
                      data.location.display_address.map(display_address=>
                        <Text style={Styles.addressText}>{display_address}</Text>

                      )
                    }
                    </TouchableOpacity>
                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Hotel', {data})}>   
                        <Image
                        source={require('../src/Images/add_icon_black.png')}
                        style={{width:20,height:20,resizeMode:'contain'}}
                        />
                        </TouchableOpacity>
                        
                    </View>
                 
                    )
                }    


                    </ScrollView>
                  
                    </View>
                   
            </View>
            
            </SafeAreaView>
        );
    }
}

// styling for voting page
const Styles = StyleSheet.create({
    Suggestion:{
        width: 100,
        alignSelf: 'center',
        backgroundColor: 'grey',
        borderRadius: 30,
        height:40,
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center'
    },
    Suggestion2:{
      
      width: "1000%",
      alignSelf: 'flex-start',
      height:30,
      alignItems:"flex-start",
      marginLeft: 15,
      marginRight: 5,
      justifyContent: 'center',
      marginVertical:10,
      borderBottomWidth:0.4,
      borderColor:'lightgrey',
    
  },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
      },
    MainContainer :{
        flex:1,
       },
       Alert_Main_View:{
     
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor : "#ffffff", 
        height: 250 ,
        width: '90%',
        paddingLeft:10,
        fontFamily:'Futura'
       
      },
       
      Alert_Title:{
        fontSize: 20, 
        color: "#000000",
        padding: 10,
        fontFamily:'Futura'
      },
       
      Alert_Message:{
       
          fontSize: 20, 
          color: "#000000",
          fontFamily:'Futura',
          padding: 10,
        },
       
      buttonStyle: {
          flexDirection: 'row',
          justifyContent:'space-between',
          width:'100%',
          paddingLeft:5,
          paddingTop:30,
          paddingRight:30
      },
         
      TextStyle:{
          color:'#000000',
          textAlign:'center',
          fontSize: 22,
          marginTop: -5,
          fontWeight:'700',
          fontFamily:'Futura'
      },
      containerStyle: {
          height: 60,
          width:300,
          flexDirection: 'row',
          paddingLeft:20,
          zIndex:99,
          position:'relative',
          marginTop:10

      },
      containerStyle2: {
          height: 40,
          width:360,
          flexDirection: 'row',
          alignContent: 'center',
          borderBottomWidth: 2,
          borderColor:'#000000',
          marginBottom: 25,
          marginLeft:20,
          fontFamily:'Futura'
      },
      businessName: {
          fontSize:24,
          fontWeight:'600', 
          width:360,
          paddingLeft:20 ,
          marginTop:10,
          fontFamily:'Futura'
      },
      addressText: {
          fontSize:16,
          fontWeight:'500',
          width:'80%',
          paddingLeft:20,
          fontFamily:'Futura'
      },
      votestext: {
          fontSize:18,
          fontWeight:'500',
          width:45,
        fontFamily:'Futura'
          
      }

})

export{VotingPage}

