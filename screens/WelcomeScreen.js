import Expo, { AppLoading } from 'expo';
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to FoodScan!', color: '#3498db' },
    { text: 'Use this to compare foods', color: '#2ecc71' },
    { text: 'Scan a barcode or search for a food!', color: '#2980b9'}
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        let token = AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('map');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlideComplete = () => {
        this.props.navigation.navigate('search');
    }

    render() {
        if (_.isNull(this.state.token)){
            return <Apploading />;
        }
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete}/>
        );
    }
}

export default WelcomeScreen;