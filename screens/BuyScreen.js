import React, { Component } from 'react';
import { Text, View, Linking } from 'react-native';
import { Button, Header, FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from '../src/components/common/Spinner';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

const amazonURL = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=';
const walmartURL = 'https://www.walmart.com/search/?query=';
const targetURL = 'https://www.target.com/s?searchTerm=';


////////////////////////////////////////////////////////////////////////
// Class for searching for food to save to Profile
class BuyScreen extends Component {
    
    state = { search: true };

    // Navigation/Header for Search screen
    static navigationOptions = ({ navigation }) => ({
        title: 'Buy',
        tabBarVisible: false
    })

    onAmazonRequest = (food) => {
        Linking.openURL(`https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${food}`);
    };

    onWalmartRequest = (food) => {
        Linking.openURL(`https://www.walmart.com/search/?query=${food}`);
    };

    onTargetRequest = (food) => {
        Linking.openURL(`https://www.target.com/s?searchTerm=${food}`);
    };
    
    renderBuyScreen = (food) => {
        FOOD = food.title;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        SELECT A STORE TO PURCHASE FOOD!
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button 
                        title="AMAZON"
                        onPress={() => this.onAmazonRequest(FOOD)}
                        backgroundColor='#ff9900'
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button 
                        title="WALMART"
                        onPress={() => this.onWalmartRequest(FOOD)}
                        backgroundColor='#007dc6'
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button 
                        title="TARGET"
                        onPress={() => this.onTargetRequest(FOOD)}
                        backgroundColor='red'
                    />
                </View>
            </View>
        )
    }

    render() {
        
        const foodId = this.props.foodId;
        const foodCode = this.props.food;

        if(this.props.check) {
            if ( foodId === null){
                return <Spinner size="large" message="LOADING..." />
            } else {
                return this.renderBuyScreen(foodId); }
        } else {
            if ( foodCode === null){
                return <Spinner size="large" message="LOADING..." />
            } else {
                return this.renderBuyScreen(foodCode); } 
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Search screen
const styles = {
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    }
}

function mapStateToProps({ food }) {
    return {
      food: food.food,
      check: food.check,
      foodId: food.foodId
    };
}

export default connect(mapStateToProps, actions)(BuyScreen);