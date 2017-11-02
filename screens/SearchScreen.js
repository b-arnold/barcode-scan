import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';

////////////////////////////////////////////////////////////////////////
// Class for searching for food to save to Profile
class SearchScreen extends Component {
    
    // Navigation/Header for Search screen
    static navigationOptions = ({ navigation }) => ({
        title: 'Search',
        headerLeft: null,

        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon 
                    name="search" 
                    size={30} 
                    color={tintColor} 
                /> 
            );
        },
    })
    
    render() {
        return (
            <View style={styles}>
                <Text>Search Screen!</Text>
            </View>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Search screen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default SearchScreen;