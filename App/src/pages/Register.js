import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
  } from 'react-native';

import Header from '../pages/Header';

import api from '../services/api';

import firebase from 'react-native-firebase';

export default class Register extends Component {

    static navigationOptions = {
        title: 'Cadastro',
        headerTintColor: 'rgb(62, 6, 136)',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    state = {
        errorMessage: null,
        name: '',
        email: '',
        password: '',
    };

    onChangeTextName = (event) => {
        this.setState({ name:event.nativeEvent.text });
    };
    onChangeTextEmail = (event) => {
        this.setState({ email:event.nativeEvent.text });
    };
    onChangeTextPassword = (event) => {
        this.setState({ password:event.nativeEvent.text });
    };

    forgot = async (name, email, password) => {
        try{

            firebase.messaging().getToken().then(async (token) => {
                await api.post('/auth/register', {
                    name,
                    email,
                    password,
                    tokenNotification: token
                });

                Alert.alert( '' ,'Cadastro realizado', [{
                    text: 'Ok',
                    onPress: () => this.props.navigation.navigate('Login'),
                }]);
            }).catch((error) => {
                console.log(error);
            });

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    };
    
    render(){
        return (
            <View style = { styles.container }>
                
                <View
                    style={styles.content}
                >
                    <Image
                        source = { require('../icons/logo3.png') }
                        style = { styles.logo }
                    />
                    <TextInput 
                        style = { styles.input }
                        placeholder = "Nome ou apelido"
                        onChange = { this.onChangeTextName }
                    />
                    <TextInput 
                        style = { styles.input }
                        placeholder = "E-mail"
                        onChange = { this.onChangeTextEmail }
                    />
                    <TextInput 
                        style = { styles.input }
                        placeholder = "Senha"
                        secureTextEntry = { true }
                        onChange = { this.onChangeTextPassword }
                    />
                    <TouchableOpacity 
                        onPress = { () => this.forgot(this.state.name, this.state.email, this.state.password) }
                        style = { styles.button }
                    >
                    <Text 
                        style = { styles.textbutton }
                    >
                        CADASTRAR
                    </Text>
                    </TouchableOpacity>

                </View>

                { !!this.state.errorMessage && <Text style = { styles.textError }> { this.state.errorMessage }</Text> }

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFF',
    },
    content:{
        paddingTop: 40,
        alignItems: 'center',
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
    textError: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }
});