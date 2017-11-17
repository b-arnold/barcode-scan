////////////////////////////////////////////////////////////////////////
// Initial Imports
import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { GOOGLE_FIREBASE_CONFIG } from "./src/constants/api_keys";
import store from "./src/store";

////////////////////////////////////////////////////////////////////////
// List of screens imported
import WelcomeScreen from './screens/WelcomeScreen';
import SearchScreen from './screens/SearchScreen';
import BarcodeScanScreen from './screens/BarcodeScanScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AuthScreen from './screens/AuthScreen';
import SignoutScreen from './screens/SignoutScreen';
import BarcodeScanner from './screens/BarcodeScanner';
import FoodInfoScreen from './screens/FoodInfoScreen';
import CompareFoodScreen from './screens/CompareFoodScreen';

export default class App extends React.Component {

////////////////////////////////////////////////////////////////////////
// Upon loading app, initialize firebase
componentWillMount() {
  firebase.initializeApp(GOOGLE_FIREBASE_CONFIG);
}

  render() {
    
    ////////////////////////////////////////////////////////////////////////
    // Main screens used in Barcode-scan
    // (StackNavigator is used strictly for styling purposes)
    const MainScreens = TabNavigator(
      {
        //search: { screen: StackNavigator({ search: { screen: SearchScreen }})},
        barcode: { screen: StackNavigator(
          { barcode: { screen: BarcodeScanScreen }, barcodeScan: { screen: BarcodeScanner }, 
          foodInfo: { screen: FoodInfoScreen }, compareFood: { screen: CompareFoodScreen }
        })},
        profile: { screen: StackNavigator({ 
          profile: { screen: ProfileScreen }, settings: { screen: SettingsScreen }
        })}  
      },
        {
          swipeEnabled: true
        }
    );
   
    ////////////////////////////////////////////////////////////////////////
    // Render Main Navigation of Barcode-Scan
    const MainNavigator = TabNavigator({
      auth: { screen: AuthScreen },
      welcome: { screen: WelcomeScreen }, // open with welcome slides
      main: { screen: MainScreens },
      signout: { screen: SignoutScreen }
    },
    {
      // TabBar not visible between auth, welcome, and main screens
      navigationOptions: {
        tabBarVisible: false
      },
        tabBarPosition: "bottom",
        swipeEnabled: false,
        lazy: true, // Each screen will not mount/load until user clicks on them
        animationEnabled: false
      }
    );
  
    return (
      // Return main view for barcode-scan
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

////////////////////////////////////////////////////////////////////////
// Styles for Navigation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
