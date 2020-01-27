import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
  } from 'react-native';

import api from '../services/api';

export default class ResetPassword extends Component {
    static navigationOptions = {
        title: 'Redefinir senha',
        headerTintColor: 'rgb(62, 6, 136)',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    state = {
        errorMessage: null,
        email: '',
        token: '',
        password: '',
    };

    componentWillMount() {
        this.setState ({
            email: this.props.navigation.getParam('email')
        });
    }

    onChangeTextEmail = (event) => {
        this.setState({ email:event.nativeEvent.text });
    };
    onChangeTextToken = (event) => {
        this.setState({ token:event.nativeEvent.text });
    };
    onChangeTextPassword = (event) => {
        this.setState({ password:event.nativeEvent.text });
    };

    reset = async (email, token, password) => {
        try{
            await api.post('/auth/reset_password', {
                email,
                token,
                password,
            });
            Alert.alert( '' ,'Senha redefinida!', [{
                text: 'Ok',
                onPress: () => this.props.navigation.navigate('Login'),
            }] );
        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    };
    
    render(){
        return (
            <View style={styles.container}>
                
                <Image
                    source={require('../icons/logo3.png')}
                    style={styles.logo}
                />
                <Text
                    style = { styles.textInformation }
                >
                    Digite as informações enviadas para seu email
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder = "E-mail"
                    onChange={this.onChangeTextEmail}
                    value = {this.state.email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = "Token"
                    onChange={this.onChangeTextToken}
                />
                <TextInput 
                    style={styles.input}
                    placeholder = "Nova senha"
                    secureTextEntry = { true }
                    onChange={this.onChangeTextPassword}
                />
                <TouchableOpacity 
                    onPress={() => this.reset(this.state.email, this.state.token, this.state.password)}
                    style={styles.button}
                >
                <Text 
                    style={styles.textbutton}
                >
                    REDEFINIR
                </Text>
                </TouchableOpacity>

                { !!this.state.errorMessage && <Text style = { styles.textError }> { this.state.errorMessage }</Text> }

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    logo: {
        width: 400,
        height: 150,
    },
    input: {
        borderColor: '#33333333',
        borderBottomWidth: 1,
        marginTop: 15,
        width: 350,
        padding: 10,
        backgroundColor: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        height: 42,
        width: 350,
        backgroundColor: 'rgb(62, 6, 136)',
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textInformation: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 20,
    },
    textError: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }
});