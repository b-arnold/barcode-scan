import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarcodeScanner from './BarcodeScanner';

////////////////////////////////////////////////////////////////////////
// Class for scanning barcode of Food product
class BarcodeScanScreen extends Component {

    state = {firstScan: true};

    componentWillMount() {
        this.setState({ firstScan: this.props.scan})
        //console.log(this.state.firstScan);
    }

    // Navigation/Header for BarcodeScanScreen
    static navigationOptions = ({ navigation }) => ({
        title: 'Barcode',
        headerLeft: null,
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

    onButtonPress = () => {
        this.props.navigation.navigate("barcodeScan"); // Passing a callback function
    };

    render() {
        console.log(this.state.firstScan);
        if(this.state.firstScan){
            //console.log("Goes here")
            return (
                <View style={styles}>
                    <Button 
                        title="Scan Bardcode"
                        icon={{ name: 'crop-free'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles}>
                    
                    <Text style={{marginBottom: 40}}>Food Card Goes Here!</Text>
                    
                    <Text>Scan New Food!</Text>
                    
                    <Button 
                        title="Scan Bardcode"
                        icon={{ name: 'crop-free'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            );
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for BarcodeScanScreen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ barcode }) {
    return {
      scan: barcode.scan
    };
  }

export default connect(mapStateToProps, actions)(BarcodeScanScreen);