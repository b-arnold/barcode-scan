import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './screens/WelcomeScreen';
import SearchScreen from './screens/SearchScreen';
import BarcodeScanScreen from './screens/BarcodeScanScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      main: {
        screen: TabNavigator({
          search: { screen: SearchScreen },
          barcode: { screen: BarcodeScanScreen },
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
    })
  
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
