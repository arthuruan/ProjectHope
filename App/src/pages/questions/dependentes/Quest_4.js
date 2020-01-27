import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Picker,
} from 'react-native';

export default class Quest_4 extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        time: 'dias',
        question4: {
            question: 'Há quanto tempo você não ultiliza drogas?',
            answer: null,
        }
    };

    onChangeAns = (event) => {
        this.setState({ question4: { ...this.state.question4, answer: event.nativeEvent.text + this.state.time}});
    };

    navigate = () => {

        if(this.state.question4.answer != null){

            const questions = this.props.navigation.getParam('questions');

            this.props.navigation.navigate('Quest_5', {
                questions: {
                    ...questions, question4: this.state.question4
                }
            });
        }
    };

    navigateNull = () => {
        
        this.setState({ question4: { ...this.state.question4, answer: null }});

        const questions = this.props.navigation.getParam('questions');

        this.props.navigation.navigate('Quest_5', {
            questions: {
                ...questions, question4: this.state.question4
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
                    Pergunta 04 de 05
                </Text>

                <Text
                    style = { styles.textHeader }
                >
                    Há quanto tempo você não ultiliza drogas?
                </Text>

                <TextInput
                    style = { styles.input }
                    keyboardType = 'number-pad'
                    onChange = { this.onChangeAns }
                />

                <Picker
                    style = { styles.picker }
                    selectedValue={this.state.time}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({time: itemValue})
                    }
                >
                    <Picker.Item label = 'dias' value = 'dias' />
                    <Picker.Item label = 'meses' value = 'meses'/>
                    <Picker.Item label = 'anos' value = 'anos'/>
                    
                </Picker>

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
        alignItems: 'center'
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
        marginLeft: 31,
        marginRight: 20,
    },
    input: {
        borderColor: '#33333333',
        borderBottomWidth: 1,
        marginLeft: -190,
        width: 150,
        padding: 10,
        color: 'rgb(62, 6, 136)',
        fontSize: 80,
    },
    picker: {
        width: 150,
        padding: 10,
        marginLeft: 250,
        marginTop: -47,
        fontSize: 50,
        color: 'rgb(62, 6, 136)',
    },
    button: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(211, 189, 240)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 330,
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