import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

////////////////////////////////////////////////////////////////////////
// Class for scanning barcode of Food product
class BarcodeScanScreen extends Component {
    
    // Navigation/Header for BarcodeScanScreen
    static navigationOptions = ({ navigation }) => ({
        title: 'Barcode',
        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon
                    name="barcode" 
                    size={30} 
                    color={tintColor} 
                /> 
            );
        },
    })

    render() {
        return (
            <View style={styles}>
                <Text>Barcode Screen!</Text>
            </View>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for BarcodeScanScreen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default BarcodeScanScreen;