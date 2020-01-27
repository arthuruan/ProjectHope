import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import api from '../../../services/api';

export default class Quest_3 extends Component {
    static navigationOptions = {
        header: null,
    };
    
    state = {
        question3: {
            question: 'Qual sua idade?',
            answer: null,
        }
    };

    onChangeAns = (event) => {
        this.setState({ question3: { ...this.state.question3, answer: event.nativeEvent.text }});
    };

    navigate = () => {
        if(this.state.question3.answer != null){

            const questions = this.props.navigation.getParam('questions');

            this.props.navigation.navigate('Quest_4', {
                questions: {
                    ...questions, question3: this.state.question3
                }
            });
        }
    };

    navigateNull = () => {
        
        this.setState({ question3: { ...this.state.question3, answer: null }});

        const questions = this.props.navigation.getParam('questions');

        this.props.navigation.navigate('Quest_4', {
            questions: {
                ...questions, question3: this.state.question3
            }
        });

    };

    render(){
        return(

            <View
                style = { styles.container }
            >

                <Text
                    style = { styles.textQuest }
                >
                    Pergunta 03 de 05
                </Text>

                <Text
                    style = { styles.textHeader }
                >
                    Qual sua idade?
                </Text>

                <TextInput
                    style = { styles.input }
                    keyboardType = 'number-pad'
                    onChange = { this.onChangeAns }
                />

                <TouchableOpacity
                    style = { styles.button }
                    onPress = { this.navigate }
                >
                    <Text
                        style = { styles.textbutton }
                    >
                        PRÓXIMA PERGUNTA
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style = { styles.button2 }
                    onPress = { this.navigateNull }
                >
                    <Text
                        style = { styles.textbutton }
                    >
                        RESPONDER MAIS TARDE
                    </Text>

                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',

    },
    textQuest: {
        fontSize: 20,
        color: '#33333380',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: -155,
        marginRight: 20,
    },
    textHeader: {
        fontSize: 28,
        color: 'rgb(62, 6, 136)',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 110,
        marginLeft: -115,
        marginRight: 20,
    },
    input: {
        borderColor: '#33333333',
        borderBottomWidth: 1,
        width: 350,
        padding: 10,
        color: 'rgb(62, 6, 136)',
        fontSize: 80,
    },
    button: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(211, 189, 240)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    button2: {
        height: 48,
        width: 376,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 50,
        marginLeft: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
