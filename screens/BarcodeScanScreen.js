import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class BarcodeScanScreen extends Component {
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

const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default BarcodeScanScreen;