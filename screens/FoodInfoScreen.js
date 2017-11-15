import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class FoodInfoScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Food Information',
        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon
                    name="info-circle" 
                    size={30} 
                    color={tintColor} 
                /> 
            );
        },

        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    });

    render() {
        return (
            <View style={styles}>
                <Text>Food Information!</Text>
            </View>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Food Information Screen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

export default FoodInfoScreen;
