import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

class SearchScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="settings" size={30} color={tintColor} />;
        }
    })
    
    render() {
        return (
            <View style={styles}>
                <Text>Settings Screen!</Text>
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