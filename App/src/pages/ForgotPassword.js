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

import api from '../services/api';

export default class ForgotPassword extends Component {

    static navigationOptions = {
        title: 'Esqueci senha',
        headerTintColor: 'rgb(62, 6, 136)',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    state = {
        errorMessage: null,
        email: '',
    };

    onChangeTextEmail = (event) => {
        this.setState({ email:event.nativeEvent.text });
    };

    forgot = async (email) => {
        try{
            await api.post('/auth/forgot_password', {
                email,
            });

            Alert.alert( '' ,'Enviado com sucesso!', [{
                text: 'Ok',
                onPress: () => this.props.navigation.navigate('ResetPassword', {
                    email: email,
                }),
            }]);

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    };
    
    render(){
        return (
            <View style = { styles.container }>
                
                <Image
                    source = { require('../icons/logo3.png') }
                    style = { styles.logo }
                />

                <Text
                    style = { styles.textInformation }
                >
                    Informe seu e-mail para que possamos enviar um token para mudança de sua senha:
                </Text>

                <TextInput 
                    style = { styles.input }
                    placeholder = "E-mail"
                    onChange = { this.onChangeTextEmail }
                />
    
                <TouchableOpacity 
                    onPress = { () => this.forgot(this.state.email) }
                    style = { styles.button }
                >
                <Text 
                    style = { styles.textbutton }
                >
                    SOLICITAR ALTERAÇÃO
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
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 25,
        marginTop: 50,
    },
    textError: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }
});