import React, {Component} from 'react';
import {Text, View,TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {Button2} from '../src/Common/Index';


// array data of food name which are showing in animation

const textArray = ['BURGER', 'LATTE', 'WAFFLES', 'PAD THAI', 'CARNITAS' ];


class Home extends Component{

    constructor(){
        super();
        this.animated = new Animated.Value(1);
    }

    // animated = new Animated.Value(0)

    state = { textIdx: 0 }

    // animation functionality of food word change from right to left with opacity

    componentDidMount(){
        this.timeout = setInterval(()=>{
            let currentIdx = this.state.textIdx;
            this.setState({ textIdx: currentIdx + 1 });
            this.animate()
        }, 2500);
        
    }

   

      animate=()=>{
          this.animated.setValue(0);
          Animated.timing(this.animated,{
              toValue:1,
              duration:2000,
              
          }).start();
      }


    render(){

        const opacity = this.animated.interpolate({
            inputRange:[0,1],
            outputRange:[0,1]
        });
        const translateX = this.animated.interpolate({
            inputRange:[0,1],
            outputRange:[30,0]
        });
        const transform = [{translateX}];

        let textThatChanges = textArray[this.state.textIdx % textArray.length];

    // end of animation functionality

        return(
           
           <ImageBackground
           source={require('../src/Images/background.png')}
           style={{width: '100%', height: '100%'}}
           >
            <View style={{justifyContent: 'center', flex:1, paddingLeft: 15}}>
                <Text style={Styles.textStyle}>
                    MY
                </Text>
                <Text style={Styles.textStyle}>
                    FAVORITE
                </Text>
                <Animated.Text style={[Styles.changeText,{ transform, opacity}]}>
                    {textThatChanges}
                  
                </Animated.Text>
                <Text style={Styles.textStyle}>
                    SPOT
                </Text>
                <Text style={{fontSize:35, color: '#ffffff',fontFamily:'Futura'}}>
                    vote and search for the  
                </Text>
                <Text style={{fontSize:35, color: '#ffffff',fontFamily:'Futura'}}>
                    best dishes near you
                </Text>
            </View>
            
            <View style={{paddingBottom:30}}>
                
             
              {/* footer button continue which is coming from common folder */}

                <Button2 onPress={()=>this.props.navigation.navigate('SignIn')}>
                    CONTINUE
                    </Button2>
               
               
            </View>
            
           </ImageBackground>
       
        );
    }
}

// styling used in page 

const Styles = StyleSheet.create({
    textStyle: {
        fontSize: 60,
        color: '#ffffff',
        fontFamily: 'Futura'
    },
    buttonView: {
        flexDirection: 'row',
        height:60,
        width:'80%',
        marginBottom:20,
        marginLeft:40,
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
   
    changeText: {
        fontSize: 60,
        color: '#Ff6600',
        fontFamily:'Futura'
    }
})



export { Home }