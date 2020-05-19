import React,{Component} from 'react';
import {View,Animated,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';

class Menubar extends Component{

    constructor(){
        super();
        this.animated = new Animated.Value(1);
        this.opacity = new Animated.Value(0);
    }
    
    startanimation = () => {
        
        Animated.timing(this.opacity,{
            toValue:1,
            duration:300
        }).start(()=>{
            Animated.timing(this.opacity,{
                toValue:0,
                duration:300
            }).start();
        });

       Animated.timing(this.animated,{
           toValue: 0,
           duration: 300
       }).start(()=>{
            Animated.timing(this.animated,{
                toValue:1,
                duration:300
            }).start();
          
       });
       this.timeoutHandle = setTimeout(()=>{
        this.props.navigation.toggleDrawer();
    }, 200);
      
       
    }
    

    render(){
        const rotateinterpolatedown = this.animated.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg','60deg']
        })
        const animatedStyles1 = {
            transform: [
                {
                    rotate: rotateinterpolatedown
                }
            ]
        }
        const rotateinterpolateup = this.animated.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg','-60deg']
        })
        const animatedStyles2 = {
            transform: [
                {
                    rotate: rotateinterpolateup
                }
            ]
        }

        const vanish = {
            opacity:this.opacity
        }


        return( <TouchableWithoutFeedback onPress={this.startanimation}>
                <Animated.View style={[Styles.container]}>

                    {/* <TouchableWithoutFeedback onPress={()=>alert('ok')}> */}
                    <TouchableWithoutFeedback onPress={this.startanimation}>
                    <Animated.View style={[Styles.line1,animatedStyles2]} />
                    </TouchableWithoutFeedback>

                    

                    <TouchableWithoutFeedback onPress={this.startanimation}>
                    <Animated.View style={[Styles.line2,animatedStyles1]} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.startanimation}>
                    <Animated.View style={[Styles.line,vanish]} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.startanimation}>
                    <Animated.View style={[Styles.line,vanish]} />
                    </TouchableWithoutFeedback>
                    {/* </TouchableWithoutFeedback> */}

                </Animated.View>
                </TouchableWithoutFeedback>
            );
        }
   
}

const Styles = StyleSheet.create({
    container:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:0,
        // backgroundColor:'#000000',
        height:50,
        width:50
        
    },
    line: {
        marginBottom:1,
        width:40,
        height:4,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:1.5,
        // transform:[{rotate: '65deg'}]
    },
    line1: {
        top:7,
        width:40,
        height:4,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:1.5,
        // transform:[{rotate: '65deg'}]
    },
    line2: {
        width:40,
        height:4,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:1.5,
        // transform:[{rotate: '-65deg'}]
    }
})

export default withNavigation(Menubar);