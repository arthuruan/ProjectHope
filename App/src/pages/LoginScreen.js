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
    TouchableWithoutFeedback,
    ActivityIndicator,
    StatusBar,
  } from 'react-native';

import api from '../services/api';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        errorMessage: null,
        loggedInUser: null,
        email: '',
        password: '',
    };

    onChangeTextEmail = (event) => {
        this.setState({ email:event.nativeEvent.text });
    };

    onChangeTextPassword = (event) => {
        this.setState({ password:event.nativeEvent.text });
    };

    navigate = async (token) => {
        const response = await api.get('/quiz/',{},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if(response.data.quiz.length || this.state.loggedInUser.isAdmin){
            this.props.navigation.navigate('Home');
        }else{
            this.props.navigation.navigate('Quest_1');
        }
    }

    signIn = async (email, password) => {
        try {
            const response = await api.post('/auth/authenticate', {
                email,
                password,
            });
            
            let { user, token } = response.data;

            if(user.avatar){
                user.avatar = `data:image/jpeg;base64,${user.avatar}`;
            }

            await AsyncStorage.multiSet([
                ['@CodeApi:token', token],
                ['@CodeApi:users', JSON.stringify(user)],
            ]);

            this.setState({ loggedInUser: user });

            Alert.alert('Login com sucesso!');

            this.navigate(token);

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    };

    async componentDidMount() {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

        if(token && user) {
            this.setState({ loggedInUser: user });
        }
    };
    
    render(){
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor= '#FFF' barStyle= 'dark-content' />
                
                <Image
                    source = { require('../icons/logo3.png') }
                    style = { styles.logo }
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
                    onPress = { () => this.signIn(this.state.email, this.state.password) }
                    style = { styles.button }
        
                >
                <Text 
                    style = { styles.textbutton }
                >
                    ENTRAR
                </Text>


                </TouchableOpacity>

                {/* { !!this.state.loggedInUser && <Text> { this.state.loggedInUser.name }</Text> } */}
                { !!this.state.errorMessage && <Text style = { styles.textError }> { this.state.errorMessage }</Text> }

                <TouchableWithoutFeedback
                    onPress = { () => this.props.navigation.navigate('ForgotPassword') }
                >
                <Text
                    style = { styles.textForgot }
                >
                    ESQUECI MINHA SENHA
                </Text>
                </TouchableWithoutFeedback>

                <Text
                    style = { styles.textInformation }
                >
                    NÃO POSSUI CONTA?
                </Text>

                <TouchableOpacity 
                    onPress = { () => this.props.navigation.navigate('Register') }
                    style = { styles.registerButton }
                >
                <Text 
                    style = { styles.registerTextButton }
                >
                    CRIAR NOVA CONTA
                </Text>
                
                </TouchableOpacity>

                <ActivityIndicator size = 'large' color = 'rgb(62, 6, 136)' animating = {false}/>
                
            </View>
            
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 120,
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
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textForgot: {
        marginTop: 55,
        marginBottom: 55,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(151, 150, 151)',
    },
    textInformation: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerButton: {
        height: 42,
        width: 350,
        borderWidth: 2,
        borderColor: 'rgb(62, 6, 136)',
        backgroundColor: '#FFF',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerTextButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    textError: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }

});