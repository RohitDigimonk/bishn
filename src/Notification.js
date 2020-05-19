import React, {Component} from 'react';
import {Text,View, StyleSheet,TouchableOpacity,Image,ScrollView,AsyncStorage} from 'react-native';
import Footer from '../src/Common/Footer';
import Axios from 'axios';
import Menubar from '../src/Common/Menubar';


class Notification extends Component{

    state={user_id:'',notificationdata:[]}

// function for getting current data, hour,minute
    currentdate = new Date().getDate();

    currenthours = new Date().getHours();
    currentminutes = new Date().getMinutes();
   

    componentDidMount=async()=>{
       this.loadSession().done()
    }

// load session for getting user id & notification data
    loadSession = async() => {
        this.setState({
          user_id:await AsyncStorage.getItem('user_id'),
        //   token:await AsyncStorage.getItem('token')
        })
        Axios.post('http://203.190.153.22/api/notification-value',{
        User_id:this.state.user_id
    }).then((response)=>{
        const data = response['data']
        const notificationdata = data['data']
        // console.log(notificationdata)
        this.setState({notificationdata:notificationdata})
        })
        
    }

    

    render(){
        // console.log(this.state.user_id,this.currenthours,this.currentminutes)
        return(
            <View style={{height:'100%',backgroundColor:'#000'}}>

                    <View style={Styles.navBar}>
                     {/* <View>
                         <Menubar />
                     </View> */}
                        
                        <Text style={{color:'#fff',fontSize:20}}>Notification</Text>
                        
                    </View>
                    <ScrollView>
                        {this.state.notificationdata.map(data=>{
                            // console.log(data)
                                const fullname = data.user_name.split(' ')
                                const firstname = fullname[0]
                                const lastname = fullname[1]
                                // console.log(firstname,lastname)
                                const day = data.date.split('-')
                                // console.log(day)
                                const dateday = day[0]
                                // console.log(dateday)
                                const time = data.time.split(':')
                                const time_hours = time[0]
                                const time_minutes = time[1]
                                // console.log(time_minutes,this.currentminutes)
                            return(
                            <>
                    <View style={{height:70,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                 
                    <View style={{flexDirection:'row'}}>
                    
                    {
                    data.user_image==""?
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserTimeline',{data})}>
                    <View style={Styles.thumbnailtext}>
                    <Text>{firstname[0]}</Text>
                    <Text>{lastname[0]}</Text>
                    </View></TouchableOpacity>:
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserTimeline',{data})}>
                    <Image
                        source={{uri:data.user_image}}
                        style={{width:50,height:45,borderRadius:40,marginLeft:10}}
                        />
                        </TouchableOpacity>
                    }
                    
                    <View style={{justifyContent:'center',paddingLeft:10}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SelfTimeline',{data})}>
                    <Text style={{color:'#fff'}}>{data.message}</Text>
                    </TouchableOpacity>
                    </View>
                        
                    </View>

                    <View style={{height:'100%',justifyContent:'flex-end'}}>
                <Text style={{color:'#fff'}}>
                {
                    dateday < this.currentdate?data.date: this.currenthours == time_hours?<Text>{this.currentminutes-time_minutes} Minutes Ago</Text>:
                   <Text> {this.currenthours - time_hours} Hours Ago </Text>
                }
                </Text>
                    </View>
                    
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#999999'}} />
                        </>
                    )}
                )}
                    
                  
                  
                   
                    </ScrollView>
                    <Footer />
            </View>
        );
    }
}

// styling for notification page

const Styles = StyleSheet.create({
    navBar: {
        height:60,
        marginTop:45,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#000000',
        justifyContent:'center',
        alignItems:'center'
    },
    thumbnailtext:{
        width:50,
        height:45,
        borderRadius:50,
        backgroundColor:'#EE82EE',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      }
    
})

export  {Notification};