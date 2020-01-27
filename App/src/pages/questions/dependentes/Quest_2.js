import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import api from '../../../services/api';

const DATA = [
    {
        id: '1',
        title: 'Muito dependente',
    },
    {
        id: '2',
        title: 'Dependente',
    },
    {
        id: '3',
        title: 'Pouco dependente',
    },
];

function Item({ id, title, selected, onSelect, onChangeAns }) {

    if(id == 1){
        return (
            <TouchableOpacity
                onPress={ () => {
                    onSelect(id); 
                    onChangeAns(title);
                }}
                style={[
                styles.item,
                    { borderWidth: 4,
                        borderColor: selected ? 'rgb(62, 6, 136)' : 'rgb(170, 170, 170)' },
                ]}
            >

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Não tenho mais controle algum sobre meu consumo de drogas
                </Text>
            </TouchableOpacity>
        );
    }else if(id == 2){
        return (
            <TouchableOpacity
                onPress={ () => {
                    onSelect(id); 
                    onChangeAns(title);
                }}
                style={[
                styles.item,
                    { borderWidth: 4,
                        borderColor: selected ? 'rgb(62, 6, 136)' : 'rgb(170, 170, 170)' },
                ]}
            >

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Sinto que ainda tenho algum controle, mas não sei até quando conseguirei
                </Text>
            </TouchableOpacity>
        );
    }else if(id == 3){
        return (
            <TouchableOpacity
                onPress={ () => {
                    onSelect(id); 
                    onChangeAns(title);
                }}
                style={[
                styles.item,
                    { borderWidth: 4,
                        borderColor: selected ? 'rgb(62, 6, 136)' : 'rgb(170, 170, 170)' },
                ]}
            >

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Consigo levar uma vida normal a maior parte do tempo, mas tenho racaídas
                </Text>
            </TouchableOpacity>
        );
    }
}


function Flat ({onChangeAns}){

        const [selected, setSelected] = React.useState(new Map());

        const onSelect = React.useCallback(
          id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));
            
            setSelected(newSelected);
          },
          selected,
        );
        
        return(
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    title={item.title}
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                    onChangeAns = {onChangeAns}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        );
};

export default class Quest_2 extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        question2:{
            question: 'Como você descreveria a sua relação com a droga?',
            answer: null,
        }
    };

    onChangeAns = (text) => {
        this.setState({ question2: { ...this.state.question2, answer: text }});
    };

    navigate = () => {
        if(this.state.question2.answer != null){
            
            const question1 = this.props.navigation.getParam('question1');

            this.props.navigation.navigate('Quest_3', {
                questions: {
                    question1, question2: this.state.question2
                }
            });
        }
    };

    navigateNull = () => {
        
        this.setState({ question2: { ...this.state.question2, answer: null }});

        const question1 = this.props.navigation.getParam('question1');

        this.props.navigation.navigate('Quest_3', {
            questions: {
                question1, question2: this.state.question2
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
                    Pergunta 02 de 05
                </Text>

                <Text
                    style = { styles.textHeader }
                >
                    Como você descreveria a sua relação com a droga?
                </Text>

                <Flat
                    onChangeAns = {this.onChangeAns}
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
    },
    textQuest: {
        fontSize: 20,
        color: '#33333380',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 20,
    },
    textHeader: {
        fontSize: 28,
        color: 'rgb(62, 6, 136)',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
        marginHorizontal: -100,
        marginTop: -5,
        marginRight: -50,
        marginBottom: 6,
    },
    item: {
        backgroundColor: '#FFF',
        marginVertical: 0,
        marginHorizontal: 16,
        borderRadius: 15,
        paddingRight: 130,
        paddingLeft: 130,
        paddingVertical: 30,
        marginBottom: 15,
    },
    description: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: -100,
    },
    button: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(211, 189, 240)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginLeft: 17,
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
