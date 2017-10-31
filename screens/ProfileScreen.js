import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class ProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="account-box" size={30} color={tintColor} />;
        },
        headerRight: (
            <Button
                large
                iconRight={{ name: "settings", color:"black"}}
                onPress={() => navigation.navigate('settings')}
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

const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default ProfileScreen;