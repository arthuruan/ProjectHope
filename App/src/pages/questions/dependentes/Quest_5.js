import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';

import api from '../../../services/api';

export default class Quest_5 extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        data: [
            {
                item1: {
                    id:'1',
                    answer:'muito mau',
                    icon: require('../../../icons/muitomau.png'),
                    color: 'red',
                    marginLeft: 25,
                    marginTop: 25,
                },
                item2: {
                    id: '2',
                    answer: 'mau',
                    icon: require('../../../icons/mau.png'),
                    color: 'rgb(120, 158, 230)',
                    marginLeft: 215,
                    marginTop: -160,
                }
            },
            {
                item1: {
                    id: '3',
                    answer: 'boa',
                    icon: require('../../../icons/boa.png'),
                    color: 'rgb(206, 193, 17)',
                    marginLeft: 25,
                    marginTop: 20,
                },
                item2: {
                    id: '4',
                    answer: 'muito boa',
                    icon: require('../../../icons/muitoboa.png'),
                    color: 'rgb(9, 185, 53)',
                    marginLeft: 215,
                    marginTop: -158,
                }
            },
        ],
        selected: null,
        question5:{
            question: 'Como você descreveria a sua relação com sua família?',
            answer: null,
        },
    }

    onChangeAns = (text) => {
        this.setState({ question5: { ...this.state.question5, answer: text }});
    };

    onSelected(id){
        this.setState({selected: id});
    }

    navigate = async () => {

        if(this.state.question5.answer != null){

            let questions = this.props.navigation.getParam('questions');

            questions = {
                ...questions, question5: this.state.question5
            }

            await this.Quiz(questions);

            this.props.navigation.navigate('Home');
        }
    };

    navigateNull = async () => {
        
        this.setState({ question5: { ...this.state.question5, answer: null }});

        let questions = this.props.navigation.getParam('questions');

        questions = {
            ...questions, question5: this.state.question5
        }


        await this.Quiz(questions);

        this.props.navigation.navigate('Home');
        
    };

    Quiz = async (questions) => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

        const quiz = {userId: user._id, questions};

        await api.post('/quiz/create_quiz', quiz, { headers: {
            Authorization: 'Bearer ' + token
        }});
    }
    

    render () {
        return (
            <View
                style = { styles.container }
            >

                <Text
                    style = { styles.textQuest }
                >
                    Pergunta 05 de 05
                </Text>

                <Text
                    style = { styles.textHeader }
                >
                    {this.state.question5.question}
                    
                </Text>

                <FlatList
                    data={this.state.data}
                    style={styles.flatList}
                    renderItem = {({item}) => {

                        return(
                            <View
                                style={styles.contentflatList}
                            >
                                <TouchableOpacity
                                    onPress={() => {this.onSelected(item.item1.id)
                                        this.onChangeAns(item.item1.answer)
                                    }}
                                    style = {{
                                            ...styles.button,
                                            borderWidth: 4,
                                            borderColor: this.state.selected == item.item1.id ? item.item1.color : 'rgb(170, 170, 170)',
                                        }
                                    }
                                >
                                    <Image
                                        style={styles.icon}
                                        source = {item.item1.icon}
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.onSelected(item.item2.id)
                                        this.onChangeAns(item.item2.answer)
                                    }}
                                    style = {{
                                            ...styles.button,
                                            borderWidth: 4,
                                            borderColor: this.state.selected == item.item2.id ? item.item2.color : 'rgb(170, 170, 170)',
                                        }
                                    }
                                >
                                    <Image
                                        source = {item.item2.icon}
                                        style = { styles.icon }
                                        resizeMode='center'
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

                <TouchableOpacity
                    style = { styles.button1 }
                    onPress = { this.navigate }
                >
                    <Text
                        style = { styles.textbutton }
                    >
                        CONCLUIR QUESTIONÁRIO
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style = { styles.button2 }
                    onPress = { this.navigateNull }
                >
                    <Text
                        style = { styles.textbutton2 }
                    >
                        RESPONDER MAIS TARDE
                    </Text>

                </TouchableOpacity>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    textQuest: {
        fontSize: 20,
        color: '#33333380',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: -150,
        marginRight: 20,
    },
    textHeader: {
        fontSize: 28,
        color: 'rgb(62, 6, 136)',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 31,
        marginRight: 20,
    },
    contentflatList: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    flatList: {
        minHeight: 300,
    },
    button: {
        padding: 10,
        borderWidth: 3,
        borderRadius: 14,
        marginBottom: 10,
        width: '45%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 130,
        height: 130,
    },
    button1: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(62, 6, 136)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textbutton2: {
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

