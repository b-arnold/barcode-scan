import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SearchScreen extends Component {
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