import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

class CompareFoodScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Other Options',
        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon
                    name="exchange" 
                    size={30} 
                    color={tintColor} 
                /> 
            );
        },

        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    });

    onSaveRequest = () => {
        this.props.navigation.navigate("profile");
    };

    onInfoRequest = () => {
        // this.props.fetchFoodIdDetails(id);
        this.props.navigation.navigate("foodInfo");
    };

    render() {
        const COMPARE = this.props.compare;
        console.log(COMPARE);

        const compareProducts = COMPARE.comparableProducts.calories.map((type)=>
            <Card key={type.id} title={type.title}>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        source={{uri: type.image}}
                        style={{width: 300, height: 300}}
                    />
                </View>
                <View style={styles.cardNavBar}>
                    <TouchableWithoutFeedback onPress={this.onInfoRequest}>
                        <View style={{alignItems: 'center', marginTop: 10 }}>
                            <Icon name='info-circle' size={30} color='black' activeOpacity={10} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onSaveRequest}>
                        <View style={{alignItems: 'center', marginTop: 10 }}>
                            <Icon name='star' size={30} color='black' activeOpacity={10} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Card>
        )

        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    {compareProducts}
                </View>
            </ScrollView>
        );
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Food Information Screen
const styles = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    cardNavBar: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10
    }
}

function mapStateToProps({ food }) {
    return {
      compare: food.compare,
      food: food.food
    };
}

export default connect(mapStateToProps, actions)(CompareFoodScreen);