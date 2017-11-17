import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from '../src/components/common/Spinner';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

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
        
        const FOOD = this.props.food;       
        console.log(FOOD);

        const type = this.props.food.breadcrumbs.map((type)=> 
        <Text style={{ color: 'black', fontSize: 18 }} key={type}>{type}</Text>)

        const diet = this.props.food.badges.map((type)=> 
        <Text style={{ color: 'black', fontSize: 18 }} key={type}>{type
            .replace(/_/, ' ').replace(/_/, ' ')}</Text>)
        
        if (FOOD === null)
            return <Spinner size="large" message="LOADING..." />
        else
        {
            return (
                <ScrollView>
                    <View style={styles.mainContainer}>
                        
                        <View style={styles.textStyle}>
                            <Text 
                            style={{
                                fontWeight: 'bold', 
                                fontSize: 20, 
                                textAlign: 'center',
                                marginBottom: 20,
                                marginRight: 5,
                                marginLeft: 5
                            }}>
                            {FOOD.title}
                            </Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Image 
                                source={{uri: FOOD.images[1]}}
                                style={{width: 350, height: 350}}
                            />
                        </View>

                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Type</Text>
                            {type}
                        </View>

                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Serving</Text>
                            <Text style={styles.fontStyle}>serving size: {FOOD.serving_size}</Text>
                            <Text style={styles.fontStyle}>number of servings : {FOOD.number_of_servings}</Text>
                        </View>
                        
                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Nutrition</Text>
                            <Text style={styles.fontStyle}>calories: {FOOD.nutrition.calories}</Text>
                            <Text style={styles.fontStyle}>carbs: {FOOD.nutrition.carbs}</Text>
                            <Text style={styles.fontStyle}>fat: {FOOD.nutrition.fat}</Text>
                            <Text style={styles.fontStyle}>protein: {FOOD.nutrition.calories}</Text>
                        </View>

                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Diet</Text>
                            {diet}
                        </View>

                        <View style={styles.textStyle}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Ingredients</Text>
                            <Text style={{fontSize: 18, textAlign: 'center'}}>{FOOD.ingredientList}</Text>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Food Information Screen
const styles = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    textStyle: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10,
    },
    fontStyle: {
        fontSize: 18
    }
}

function mapStateToProps({ food }) {
    return {
      food: food.food
    };
}

export default connect(mapStateToProps, actions)(FoodInfoScreen);
