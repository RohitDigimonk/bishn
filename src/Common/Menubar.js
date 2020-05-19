import React,{Component} from 'react';
import {View,Animated,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation';

class Menubar extends Component{

    constructor(){
        super();
        this.animated = new Animated.Value(0);
        this.opacity = new Animated.Value(1);
    }
    
    startanimation = () => {
        
                Animated.timing(this.opacity,{
                    toValue:0,
                    duration:300
                }).start(()=>{
                    Animated.timing(this.opacity,{
                        toValue:1,
                        duration:1000
                    }).start();
                });
        
               Animated.timing(this.animated,{
                   toValue: 50,
                   duration: 300
               }).
                   start(()=>{
                    Animated.timing(this.animated,{
                        toValue:0,
                        duration:300
                    }).start();
                  
               });
            //    this.timeoutHandle = setTimeout(()=>{
            //     this.props.navigation.toggleDrawer();
            // }, 200);
               
            }
    

    render(){
        const rotateinterpolatedown = this.animated.interpolate({
                            inputRange: [0,90],
                            outputRange: ['0deg','110deg']
                        })
                        const animatedStyles1 = {
                            transform: [
                                {
                                    rotate: rotateinterpolatedown
                                }
                            ]
                        }
                        const rotateinterpolateup = this.animated.interpolate({
                            inputRange: [0,90],
                            outputRange: ['0deg','-110deg']
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
        return(
            <TouchableWithoutFeedback onPress={this.startanimation}>
            <Animated.View style={Styles.container}>
                
                     <TouchableWithoutFeedback onPress={this.startanimation}>
                     <Animated.View style={[Styles.line,animatedStyles1]} />
                     </TouchableWithoutFeedback>

                    

                     <TouchableWithoutFeedback onPress={this.startanimation}>
                     <Animated.View style={[Styles.line,animatedStyles2]} />
                     </TouchableWithoutFeedback>

                     <TouchableWithoutFeedback onPress={this.startanimation}>
                     <Animated.View style={[Styles.line,vanish]} />
                     </TouchableWithoutFeedback>
                     
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
            // backgroundColor:'red',
            width:40,
            height:35
            
        },
        line: {
            width:40,
            height:5,
            backgroundColor:'#ffffff',
            justifyContent:'center',
            alignItems:'center',
            marginVertical:1.5
        }
    })

export default withNavigation(Menubar);