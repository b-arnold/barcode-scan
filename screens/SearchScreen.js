import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';

class SearchScreen extends Component {
    
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

const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default SearchScreen;