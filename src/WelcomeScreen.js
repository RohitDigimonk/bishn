import React, {Component} from 'react';
import { Image,View, AsyncStorage} from 'react-native';

class WelcomeScreen extends Component{

  // Welcome page change functionality time limit set 3000 if login so redirect to feed page oterwise home page 
  
  async componentDidMount(){
   
   var user_id=await AsyncStorage.getItem('user_id')
   if(user_id==null){
    this.timeoutHandle = setTimeout(()=>{
      this.props.navigation.navigate('Home')
  }, 3000);
   }
   else{
    this.props.navigation.navigate('FeedPage')
   }
    
    }
    // time limit functionality end

    // clear time interval code

    componentWillUnmount() {
        clearInterval(this.timeoutHandle);
      }

      // end of clear time interval

  render(){
    return(
     <View style={{height:"100%",weight:"100%",backgroundColor:'#000000',justifyContent:'center',alignItems:'center'}}>
       <Image
       source={require('../src/Images/Bestof.png')}
       style={{height:291,width:300,resizeMode:'contain'}}
       />
     </View>
      
    );
  }
}




export { WelcomeScreen };