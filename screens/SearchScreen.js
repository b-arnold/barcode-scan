import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon, Header, FormLabel, FormInput } from 'react-native-elements';

////////////////////////////////////////////////////////////////////////
// Class for searching for food to save to Profile
class SearchScreen extends Component {
    
    state = { search: true };

    // Navigation/Header for Search screen
    static navigationOptions = ({ navigation }) => ({
        title: 'Search',
        headerLeft: null,

        tabBarIcon: ({ tintColor }) => {
            return (
                <Icon 
                    name="search" 
                    size={30} 
                    color={tintColor} 
                /> 
            );
        },
    })
    
    render() {
        if(this.state.search)
        {
            return (
                <View>
                    <View style={{ marginTop: 30 }}>
                        <FormLabel>Food Search</FormLabel>
                        <FormInput 
                            placeholder="Barbecue chips"
                        />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Button 
                            title="Search"
                            icon={{ name: "search" }}
                        />
                    </View>
                </View>
            );
        }
    }
}

////////////////////////////////////////////////////////////////////////
// Styling for Search screen
const styles = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export default SearchScreen;