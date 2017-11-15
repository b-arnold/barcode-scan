import React, { Component } from 'react';
import { 
    AsyncStorage, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableWithoutFeedback
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarcodeScanner from './BarcodeScanner';
import axios from 'axios';
import { Spinner } from '../src/components/common/Spinner';
import FlipCard from 'react-native-flip-card';
import Accordion from 'react-native-collapsible/Accordion';

////////////////////////////////////////////////////////////////////////
// Class for scanning barcode of Food product
class BarcodeScanScreen extends Component {

    state = {
        firstScan: true, 
        foodUPC: null,
        seeMore: false 
    };
 

    componentWillMount() {
        this.setState({ firstScan: this.props.scan})
        this.setState({ foodUPC: this.props.upc})
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

    onSaveRequest = () => {
        this.props.navigation.navigate("profile");
    };

    onInfoRequest = () => {
        this.props.navigation.navigate("foodInfo");
    };

    onComparisonRequest = () => {
        this.props.navigation.navigate("compareFood");
    };

    render() {

        //console.log(this.state.firstScan);
        if(this.state.firstScan){
            //console.log("Goes here")
            
            return (
                <View style={styles.mainContainer}>
                    <Button 
                        title="Scan Bardcode"
                        icon={{ name: 'crop-free'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            );
        } else {
            const FOOD = this.props.food;
            console.log(FOOD);
            if (FOOD === null)
                return <Spinner size="large" message="LOADING..." />
            else
            {
                return (
                    <View style={styles.mainContainer}>
                        <Card title={FOOD.title}>
                            <View style={{alignItems: 'center'}}>
                                <Image 
                                    source={{uri: FOOD.images[1]}}
                                    style={{width: 300, height: 300}}
                                />
                            </View>
                            <View style={styles.cardNavBar}>
                                <TouchableWithoutFeedback onPress={this.onInfoRequest}>
                                    <View style={{alignItems: 'center', marginTop: 10 }}>
                                        <Icon name='info-circle' size={30} color='black' activeOpacity={10} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onComparisonRequest}>
                                    <View style={{alignItems: 'center', marginTop: 10 }}>
                                        <Icon name='exchange' size={30} color='black' activeOpacity={10} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onSaveRequest}>
                                    <View style={{alignItems: 'center', marginTop: 10 }}>
                                        <Icon name='star' size={30} color='black' activeOpacity={10} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </Card>
                        
                        <View style={{ marginTop: 20 }}>
                            <Button 
                                title="Scan New Bardcode"
                                icon={{ name: 'crop-free'}}
                                onPress={this.onButtonPress}
                                backgroundColor='#2F4F4F'
                            />
                        </View>
                    </View>
                );
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for BarcodeScanScreen
const styles = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardNavBar: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10
    }
}

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ barcode }) {
    return {
      scan: barcode.scan,
      upc: barcode.upc,
      food: barcode.food
    };
}

export default connect(mapStateToProps, actions)(BarcodeScanScreen);