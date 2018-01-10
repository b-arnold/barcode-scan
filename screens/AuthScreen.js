import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../src/actions';
import { Spinner } from '../src/components/common/Spinner';

const icon = '../assets/icon.png';

class AuthScreen extends Component {

    //////////////////////////////////////////////////////////////////////////////////
    // State definition
    state = { signup: true, showLoading: true };

    //////////////////////////////////////////////////////////////////////////////////
    // Register the event which detects a change of state in the logged-in user
    componentWillMount() {

        // Checks if User is logged in --> if logged in, navigates to main
        if(firebase.auth().currentUser){
            return this.props.navigation.navigate('barcode')
        }

        // Listen for authentication state to change
        firebase.auth().onAuthStateChanged(user => {
            // Show login screen b/c firebase has just authenticated/denied user
            this.props.loading = false;
            this.setState({ showLoading: this.props.loading }); // Retrigger components

            if (user) {
                // Navigate to main page
                this.props.navigation.navigate('barcode');
                return;
            }

            this.props.navigation.navigate('auth');
        });
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Called whenever one of the props changes - when the login/token changes,
    // this will be called
    componentWillReceiveProps(nextProps) {
        this.setState({ showLoading: nextProps.loading });
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Update the property when changed
    onEmailChange = text => {
        this.props.emailChanged(text);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Update the property when changed
    onPasswordChange = text => {
        this.props.passwordChanged(text);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Update the property when changed
    onPasswordRetypeChange = text => {
        this.props.passwordRetypeChanged(text);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Login user via username/password
    onStandardLoginButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser(email, password);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Login user via username/password
    onStandardSignupButtonPress = () => {
        const { email, password, passwordRetype } = this.props;
        this.props.signupUser(email, password, passwordRetype);
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Toggles between Login mode and Signup mode
    onSignupLoginToggle = () => {
        this.setState({ inSignupMode: !this.state.inSignupMode });
        this.props.resetSignupLoginPages();
    };

    //////////////////////////////////////////////////////////////////////////////////
    // Render login buttons conditionally (show spinner when working on login)
    renderButtons() {
        if (this.state.inSignupMode) {
        return (
            <View>
                <Button
                    title="Sign Up"
                    backgroundColor='#000080'
                    onPress={this.onStandardSignupButtonPress}
                />
                <View style={{ marginTop: 40 }}>
                    <Text style={{ textAlign: 'center' }}>Already have an account?&nbsp;</Text>
                    <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Log In</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
        }
        return (
            <View>
                <View>
                    <Button
                    title="Log In"
                    icon={{ name: 'vpn-key' }}
                    backgroundColor='#000080'
                    onPress={this.onStandardLoginButtonPress}
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                
                    <Text style={{ textAlign: 'center' }}>Don't have an account?&nbsp;</Text>
                    
                    <TouchableWithoutFeedback onPress={this.onSignupLoginToggle}>
                        <View style={{alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Sign Up</Text>
                        </View>
                    </TouchableWithoutFeedback>
                
                </View>
            </View>
        );
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Render password retype button if in signup mode
    renderPasswordRetypeButton() {
        if (this.state.inSignupMode) {
        return (
            <View style={{ marginBottom: 10 }}>
            <FormLabel labelStyle={{ color: 'black'}}>Retype Password</FormLabel>
            <FormInput
                placeholder="password"
                secureTextEntry
                value={this.props.passwordRetype}
                onChangeText={this.onPasswordRetypeChange}
            />
            </View>
        );
      }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Get screen style (used to center activity spinner when loading)
    getScreenStyle() {
        if (this.state.showLoading) {
        return styles.spinnerStyle;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Render loading screen (if attempting a persist login) or login screen
    renderContent() {
        if (this.state.showLoading) {
            return <Spinner size="large" message="Authenticating..." />
        }
        return (
        <View>
             <View style={{alignItems: 'center', marginBottom: 15}}>
                <Image 
                    source={require('../assets/icon.png')}
                    style={{width: 150, height: 150}}
                />
            </View>
            <View style={{alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Welcome to FoodScan!</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
            <FormLabel labelStyle={{ color: 'black'}}>E-mail</FormLabel>
            <FormInput
                placeholder="brett@email.com"
                value={this.props.email}
                onChangeText={this.onEmailChange}
            />
            </View>

            <View style={{ marginBottom: 10 }}>
            <FormLabel labelStyle={{ color: 'black'}}>Password</FormLabel>
            <FormInput
                placeholder="password"
                secureTextEntry
                value={this.props.password}
                onChangeText={this.onPasswordChange}
            />
            </View>

            {this.renderPasswordRetypeButton()}

            <FormValidationMessage containerStyle={{ marginBottom: 10 }}>
            {this.props.error}
            </FormValidationMessage>
            
            <View>
                {this.renderButtons()}
            </View>
        </View>
        );
    }

    //////////////////////////////////////////////////////////////////////////////////
    // Main render method
    render() {
        return (
        <View style={styles.mainContainer}>
            {this.renderContent()}
        </View>
        );
    }
}

//////////////////////////////////////////////////////////////////////////////////
// Map redux reducers to component props.
function mapStateToProps({ auth }) {
    return {
      email: auth.email,
      password: auth.password,
      passwordRetype: auth.passwordRetype,
      error: auth.error,
      loading: auth.loading
    };
  }

const styles = {
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    signUpStyle: {
        flex: 1,
        justifyContent: 'center'
    }
}

export default connect(mapStateToProps, actions)(AuthScreen);
  