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

export default class CreatQuest extends Component {

    state = {
        errorMessage: null,
        question: '',
    }

    onChangeTextCreat = (event) => {
        this.setState({ question: event.nativeEvent.text });
    };


    creatquest = async (question) => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');

            await api.post('/create_quest', {
                question,
            }, { headers: { Authorization: `Bearer ${token}` }});

        } catch(erro) {
            this.setState({ errorMessage: erro.data.error });
        }
    }

    render(){
        return(
            <View style = { styles.container }>
                <Text
                    style = { styles.textInformation }    
                >
                    Insira a pergunta:
                </Text>
                <TextInput
                    style = { styles.input }
                    placeholder = "Pergunta"
                    onChange = {this.onChangeTextCreat}
                />
                <TouchableOpacity
                    style = { styles.button }
                    onPress = {() => this.creatquest(this.state.question)}
                >
                    <Text>
                        ENVIAR
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        
    },
    input: {

    },
    textInformation: {

    }
});