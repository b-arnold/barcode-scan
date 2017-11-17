//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////     Taken from Expo Wepsite     //////////////////////
/////https://docs.expo.io/versions/latest/sdk/bar-code-scanner.html///////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import BarcodeScanScreen from './BarcodeScanScreen';

class BarcodeScanner extends Component {
  
  state = {
    hasCameraPermission: null,
    foodUPC: ''
  }

  static navigationOptions = {
    title: 'BarcodeScan',
    header: null,
    tabBarVisible: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  removeFirstZero = ( data ) => {
    var str = data;
    str = str.substring(1);
    //console.log(str);
    return str;
  }

  render() {

    const { hasCameraPermission, foodUPC } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <Image 
            source={require('../assets/Icons8-Ios7-Editing-Rectangle.png')}
            style={{ marginTop: 180, marginLeft: 60 }} 
          />
          <View style={styles.backgroundStyle}>
            <Text style={styles.textStyle}>Center Barcode</Text>
          </View>
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({hasCameraPermission: null})
    this.props.firstScanChanged(false);

    var UPC = this.removeFirstZero(data);
    this.props.getFoodUPC(UPC);
    this.props.fetchFoodDetails(UPC);
    this.props.fetchCompareDetails(UPC);
    
    //console.log(this.props.food);
    
    this.props.navigation.navigate("barcode");
  }

}

const styles = {
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center'
  }
}

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ food }) {
  return {
    scan: food.scan,
    upc: food.upc,
    food: food.food,
    compare: food.compare
  };
}

export default connect(mapStateToProps, actions)(BarcodeScanner);