import React, {Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class Footer extends Component{

    state = {businesses:[{ post: ''}]}

   

    
    render(){
        // console.log(this.state.businesses)
        return(
                
            <View style={styles.Bottom_Style}>
              {this.state.businesses.map(data=>

               
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SelfTimeline',{data})}>
                
            <Image 
            source={require('../Images/bottom_profile2.png')}
            style={styles.Bottom_Button}
            />
            </TouchableOpacity>
            )} 
            {/* <View style={{ width: 1, height: '100%', backgroundColor: '#fff'}} />             */}
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('FeedPage')}>
            <View>
            <Image 
            source={require('../Images/bottom_home2.png')}
            style={styles.Bottom_Button}
            />
            </View>
            </TouchableOpacity>     
            </View>
                    );
                }
            }
const styles = StyleSheet.create({

Bottom_Style: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    marginBottom:5
    // backgroundColor:'red',
    
    
    
},
Bottom_Button:{
    width:150,
    height:50,
    resizeMode:'cover',
    // backgroundColor:'red'
    
}
 
});


export default withNavigation(Footer);