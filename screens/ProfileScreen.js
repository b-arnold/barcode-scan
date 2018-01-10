import React, { Component } from 'react';
import { Text, View, Platform, ScrollView, Card, ListView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

////////////////////////////////////////////////////////////////////////
// Class for the User's profile
class ProfileScreen extends Component {

    // Navigation/Header for Profile screen
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="account-box" size={30} color={tintColor} />;
        },
        headerRight: (
            <Button
                large
                iconRight={{ name: "settings", color:"black"}}
                onPress={() => navigation.navigate('settings')} //Navigate to settings
                backgroundColor="rgba(0,0,0,0)"
                color="black"
            />
        ),
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    })

    render() {
        return (
            <View style={styles}>
                <Text>Profile Screen!</Text>
            </View>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for ProfileScreen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F8F8FF'
}

export default ProfileScreen;