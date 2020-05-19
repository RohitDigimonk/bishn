import React, {Component} from 'react';
import {Text,View,SafeAreaView, Image, AsyncStorage,StyleSheet} from 'react-native';
import {MenuButton} from './Common/Index';
import axios from 'axios';
import MenubarCross from '../src/Common/Menubar_Cross';


class DrawerContainer extends Component{

    state = {data:'',user_id:'',businesses:[{ post: ""}]}
    
    removeSession = async() => {
        await AsyncStorage.removeItem('user_id')
        this.props.navigation.navigate('SignIn');
        navigation.closeDrawer();
    }

    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id')
        })
        axios.post('http://203.190.153.22/api/user-data',{
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


    componentWillReceiveProps(){
       this.loadSession().done()
    }

    
    
   
    render(){
        const { navigation } = this.props
        const data = this.state
        return(
            
            <View style={{alignItems:'center',flex:1,backgroundColor:'#1A1A1A'}}>
                   <View style={{width:20,height:20,paddingTop:60,marginLeft:200}}>
                
                <MenubarCross />
               
                </View>
               {this.state.data['photo']==""?
               <View style={{justifyContent:'center',alignItems:'center'}}>
                    
                <View style={Styles.thumbnailtext}>
                    <Text style={{color:'#000000',fontSize:30,fontWeight:'900'}}>{this.state.firstnameletter+this.state.lastnameletter}
                    </Text>
                </View>
                    <Text style={{color:'#fff', fontSize:25, fontWeight:'bold', marginTop:20, marginBottom:80}}>{this.state.data['name']}</Text>
                </View> : 
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={Styles.thumbnailImage}source= {{uri:this.state.data['photo']}}/>
                    <Text style={{color:'#fff', fontSize:25, fontWeight:'bold', marginTop:20, marginBottom:80}}>{this.state.data['name']}</Text>
                </View>
            }     
                <MenuButton
                title="Settings"
                source={require('../src/Images/bottom_profile.png')}
                onPress={() => {
                    navigation.navigate('UserProfile',{data});
                    navigation.closeDrawer();
                }}
                />
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                 <MenuButton
                title="Notification"
                source={require('../src/Images/notification.png')}
                onPress={() => {
                    navigation.navigate('Notification');
                    navigation.closeDrawer();
                }}
                />
                
                {/* <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                {this.state.businesses.map(data=>
                 <MenuButton
                title="My Page"
                source={require('../src/Images/vote_drawer.png')}
                onPress={() => {
                    navigation.navigate('SelfTimeline',{data});
                    navigation.closeDrawer();
                }}
                />
                )} */}
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                
                <View style={{alignItems:'center',height:'62%',justifyContent:'center',width:'100%'}}>
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff'}} />
                
                 <MenuButton
                title="Logout"
                source={require('../src/Images/logout.png')}
                onPress={
                    this.removeSession
                    // navigation.navigate('SignIn');
                    // navigation.closeDrawer();

                }/>
                <View style={{ width: '100%', height: 1, backgroundColor: '#fff',}} />
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    
    thumbnailtext:{
        width:100,
        height:100,
        borderRadius:60,
        backgroundColor:'#EE82EE',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60
      },
      thumbnailImage:{
        width:100,
        height:100,
        resizeMode:'stretch',
        borderRadius:60,
        borderWidth:1,
        borderColor:'#ffffff',
        marginTop:60
      }
})

export  {DrawerContainer};