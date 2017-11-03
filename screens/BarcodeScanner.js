//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////     Taken from Expo Wepsite     //////////////////////
/////https://docs.expo.io/versions/latest/sdk/bar-code-scanner.html///////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import BarcodeScanScreen from './BarcodeScanScreen';

class BarcodeScanner extends Component {
  
  state = {
    hasCameraPermission: null
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

  render() {
    const { hasCameraPermission } = this.state;

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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({hasCameraPermission: null})
    this.props.firstScanChanged(false);
    //console.log(this.props.scan);
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
function mapStateToProps({ barcode }) {
  return {
    scan: barcode.scan
  };
}

export default connect(mapStateToProps, actions)(BarcodeScanner);