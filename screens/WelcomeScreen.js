import Expo, { AppLoading } from 'expo';
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../src/components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to FoodScan!', color: '#3498db' },
    { text: 'Use this to compare foods', color: '#2ecc71' },
    { text: 'Scan a barcode or search for a food!', color: '#2980b9'}
];

class WelcomeScreen extends Component {
    //////////////////////////////////////////////////////////////////////////////////
    // State definition
    state = { welcomeCompleted: null }; // Just for local use
  
    //////////////////////////////////////////////////////////////////////////////////
    // Check if logged in; if so, skip the welcome/login screens and jump to main page
    async componentWillMount() {
      //AsyncStorage.removeItem("welcome_completed"); // Just used for testing to clear item
      try {
        const welcomeCompleted = await AsyncStorage.getItem("welcome_completed");
  
        if (welcomeCompleted) {
          return this.props.navigation.navigate("auth");
          //this.setState({ welcomeCompleted });
        }
        this.setState({ welcomeCompleted: false });
      } catch (err) {
        console.error(err);
      }
    }
  
    //////////////////////////////////////////////////////////////////////////////////
    // When complete, save that we've made a first run so we don't run the welcome
    // screen again and navigate to login page - Do not need to async/await b/c time
    // is not critical.
    onSlidesComplete = () => {
      try {
        AsyncStorage.setItem("welcome_completed", "true");
      } catch (err) {
        console.error(err);
      }
      return this.props.navigation.navigate("auth");
      //this.props.navigation.navigate('auth', { param: 'Param test!!' });
    };
  
    //////////////////////////////////////////////////////////////////////////////////
    // Main render method
    render() {
      if (_.isNull(this.state.welcomeCompleted)) {
        // return <AppLoading />; Apparently only works in iOS and in App.js
        return <ActivityIndicator size="large" style={styles.spinnerStyle} />;
      }
      return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
    }
  }

export default WelcomeScreen;