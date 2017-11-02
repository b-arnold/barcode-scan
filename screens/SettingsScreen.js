import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import { Spinner } from '../src/components/common/Spinner';

////////////////////////////////////////////////////////////////////////
// Class for Updating settings of Barcode-scan
class SettingsScreen extends Component {

    // Navigation/Header for Settings screen
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="settings" size={30} color={tintColor} />;
        }
    })

    onButtonPress = () => {
          this.props.navigation.navigate("signout"); // Passing a callback function
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Main render method
    render() {
        return (
            <View style={styles}>
                <Button 
                    title="Sign Out"
                    icon={{ name: 'close' }}
                    onPress={this.onButtonPress}
                />
            </View>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Settings screen
const styles = {
    marginTop: 30,
    justifyContent: 'center',
}

export default SettingsScreen;