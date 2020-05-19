import React, { Component } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, ImageBackground } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { GetStartedButton } from './Common/Index';
 
class Information extends Component {
  render() {
    return (

      // this functionality is used for showing informative pages when complete all three pages redirect to voting page
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={300}
          autoplayLoop
          index={0}
          showPagination
        >
          <View style={styles.child}>
            <Image
              source={require('./Images/splash1.jpg')}
              style={{width: width * 1,height: height * 1}}
              />
          </View>
          <View style={styles.child}>
            <Image
            source={require('./Images/splash2.jpg')}
            style={{width: width * 1,height: height * 1}}
            />
            
          </View>

          <View style={styles.child}>
            <ImageBackground
            source={require('./Images/splash3.jpg')}
            style={{width: width * 1,height: height * 1}}
            >
            <View style={{height:'92%',justifyContent:'flex-end'}}>
              <GetStartedButton onPress={()=>this.props.navigation.navigate('VotingPage')}>
                  Get Started
              </GetStartedButton>
            </View>
            </ImageBackground>
            
          </View>

          
          
        </SwiperFlatList>
        </View>
    );
  }
}
 


// styling use on information page

export const { width, height } = Dimensions.get('window');
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  child: {
    height: height * 1,
    width,
    justifyContent: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});

export {Information};