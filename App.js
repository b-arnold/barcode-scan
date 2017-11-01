import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './screens/WelcomeScreen';
import SearchScreen from './screens/SearchScreen';
import BarcodeScanScreen from './screens/BarcodeScanScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AuthScreen from './screens/AuthScreen';
import SignUpScreen from './screens/SignUpScreen';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {component: null, loaded: false}
  }

  // componentWillMount() {
  //   firebase.initializeApp(
  //     {
  //       apiKey: "AIzaSyChWClzpiZjGa_7tswq-s0PufdcaHkNHw4",
  //       authDomain: "barcode-9fa69.firebaseapp.com",
  //       databaseURL: "https://barcode-9fa69.firebaseio.com",
  //       projectId: "barcode-9fa69",
  //       storageBucket: "barcode-9fa69.appspot.com",
  //       messagingSenderId: "852345883710"
  //     }
  //   );

  //   AsyncStorage.getItem(userData).then((userData_json) =>
  //   {
  //     let userData = JSON.parse(userData_json);
  //     let component = { component: SignUpScreen };
  //     if (userData !== null)
  //     {
  //       app.authWithCustomToken(userData.token, (error, authData) => {
  //         if (error){
  //           this.setState(component);
  //         } else {
  //           this.setState({component: Account});
  //         }
  //       });
  //     } else {
  //       this.setState(component)
  //     }
  //   });
  // }

  render() {
    const MainNavigator = TabNavigator({
      auth: { screen: AuthScreen },
      welcome: { screen: WelcomeScreen },
      main: {
        screen: TabNavigator({
          search: { 
            screen: StackNavigator({
            search: { screen: SearchScreen }
          }) 
        },
          barcode: { 
            screen: StackNavigator({
            barcode: { screen: BarcodeScanScreen }
          }) 
        },
          profile: {
            screen: StackNavigator({
              profile: { screen: ProfileScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });
  
    return (
        <View style={styles.container}>
          <MainNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
