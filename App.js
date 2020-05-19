import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator,DrawerLockMode} from 'react-navigation-drawer';
import React, {Component} from 'react';
import { AsyncStorage} from 'react-native';
import {WelcomeScreen, Home, SignIn, SignUp, VotingPage,SelfTimeline,Information,
Hotel, FeedPage, UserTimeline, DrawerContainer, Notification, UserProfile,ThanksPage, ResetPassword, OtpRegistration} from './src/Index';
// import PushNotificationAndroid from 'react-native-push-notification';
import firebase from 'react-native-firebase';



const messaging = firebase.messaging();

messaging.hasPermission()
  .then((enabled) => {
      if (enabled) {
          messaging.getToken()
              .then(token => { 
                // console.log(token) 
                AsyncStorage.setItem('token',token)

              })
              .catch(error => { /* handle error */ });
      } else {
          messaging.requestPermission()
              .then(() => { /* got permission */ })
              .catch(error => { /* handle error */ });
      }
  })
  .catch(error => { /* handle error */ });


  messaging.getToken()
              .then(token => { 
                // console.log(token) 
                AsyncStorage.setItem('token',token)

              })
              .catch(error => { /* handle error */ });

              // console.log(AppState.currentState)




const AppNavigator = createStackNavigator({
  
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
      
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header:null
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  VotingPage: {
    screen: VotingPage,
    navigationOptions: {
      header:null
    }
  },
  Hotel: {
    screen: Hotel,
    navigationOptions: {
      header:null
    }
  },
  FeedPage: {
    screen: FeedPage,
    navigationOptions: {
      header:null,
      DrawerLockMode:''
    }
  },
  UserTimeline: {
    screen: UserTimeline,
    navigationOptions: {
      header:null
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      header:null
    }
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      header:null
    }
  },
  ThanksPage: {
    screen: ThanksPage,
    navigationOptions: {
      header:null
    }
  },
  SelfTimeline: {
    screen: SelfTimeline,
    navigationOptions: {
      header: null
    }
  },
  Information: {
    screen: Information,
    navigationOptions: {
      header:null
    }
  },
  OtpRegistration: {
    screen: OtpRegistration,
    navigationOptions: {
      header:null
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null
    }
  },

},
{
  initialRouteName:"WelcomeScreen"
}
)
// drawer navigation function which is not using now

// const DrawerStack = createDrawerNavigator(
//   {
//     Main: AppNavigator
//   },
//   {
//     drawerPosition:'left',
//     drawerType:'front',
//     initialRouteName:'Main',
//     drawerWidth:280,
  
//     contentComponent: DrawerContainer,
//     // drawerLockMode:
//     drawerLockMode:'locked-closed.locked-open',
//     disableGestures: true
    
//   }
// );

// end of drawer navigation

export default createAppContainer(AppNavigator);