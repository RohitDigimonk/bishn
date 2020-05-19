import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Modal,TouchableOpacity,AsyncStorage } from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';



class ThanksPage extends Component {


  Business_name = this.props.navigation.state.params.Business_name
  category = this.props.navigation.state.params.category
  Total_votes = this.props.navigation.state.params.Total_votes
  


  state = {Alert_Visibility: true}

  // for getting userid from syncstorage

  loadSession = async() => {
    this.setState({
      user_id: await AsyncStorage.getItem('user_id')
    })

  } 

  Show_Custom_Alert(visible) {
      this.setState({Alert_Visibility: visible})
  }
  
  // testfucntion user for redirect to feedpage after click on arrow button
  TestFunction = () => {
 
    this.Show_Custom_Alert(!this.state.Alert_Visibility)
    // this.props.navigation.navigate('FeedPage');
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
          NavigationActions.navigate({ routeName: 'FeedPage' })
      ],
      }))
 
  }
  // end of test function

  componentDidMount(){
    this.loadSession().done()
  }
  
  render() {

    // console.log(this.category)

    return (
      <View>
      {/* modal of thanks message for post */}
        <Modal

          visible={this.state.Alert_Visibility}

          transparent={false}

          animationType={"none"}

          onRequestClose={() => { this.Show_Custom_Alert(!this.state.Alert_Visibility) }} >

          <View style={{
             flex: 1, 
             alignItems: 'center', 
             justifyContent: 'center', 
             backgroundColor: 'rgba(0,0,0,.9)',
             
              }}>

            {/* ALert View Start*/}

            <View style={{height:270,width:"70%",backgroundColor:"#fff" , borderRadius:10, alignItems:"center" }}>
                {/* Background Image */}
                <ImageBackground style={{width:270, height:270, alignItems:"center",resizeMode:'contain'}} source={require('../src/Images/BISH.png')}>
                  {/* Thumb Image */}
                  <Image style={{height:100, width:100, resizeMode:"contain", marginTop:-50}} source={require('../src/Images/bishthumb.png')}/>
                  {/* Text Area */}
                  <View style={{marginTop:40,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:40,}}>Thanks!</Text>
                    <View style={{paddingTop:15,justifyContent:'center',alignItems:'center'}}>
                    <Text>You and {this.Total_votes} other Voted</Text>
                    <Text style={{fontSize:20, fontWeight:"bold"}}>"{this.Business_name}"</Text>
                   
                    <Text style={{fontSize:20, fontWeight:"bold"}}>"{this.category}"</Text>
                    </View>
                  </View>
                  {/* Right Side Area */}
                  <View style={{height:60, width:60, borderRadius:60/2}}>
                    <TouchableOpacity onPress={this.TestFunction} style={{height:60, width:60, borderRadius:60/2}}>
                    <Image style={{width:"100%", height:"100%" ,left:140, marginTop:50}} source={require('../src/Images/arrow.png')}/>
                    </TouchableOpacity>
                                  </View>
                </ImageBackground>
              </View>
            {/*End Alert View */}





          </View>
        </Modal>
      </View>


    );
  }
};

export {ThanksPage};