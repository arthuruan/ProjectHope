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

import api from '../../services/api';

const DATA = [
    {
        id: '1',
        title: 'Dependente',
    },
    {
        id: '2',
        title: 'Co-dependente',
    },
    {
        id: '3',
        title: 'Ex-dependente',
    },
    {
        id: '4',
        title: 'Especialista',
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
                <Image
                    source = {require('../../icons/dependente.png')}
                    style = { styles.icon }
                />

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Sofro com dependência química e busco ajuda
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
                <Image
                    source = {require('../../icons/codependente.png')}
                    style = { styles.icon }
                />

                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Quero ajudar um familiar ou amigo dependente
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
                
                <Image
                    source = {require('../../icons/exdependente.png')}
                    style = { styles.icon }
                />

                <Text style = { styles.title }>
                    { title }
                </Text>

                <Text style = {styles.description}>
                    Saí do mundo das drogas e busco ajudar outra pessoas
                </Text>
            </TouchableOpacity>
        );
    }else if(id == 4){
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

                <Image
                    source = {require('../../icons/especialista.png')}
                    style = { styles.icon }
                />
                
                <Text style = {styles.title}>
                    {title}
                </Text>

                <Text style = {styles.description}>
                    Sou especialista e desejo ajudar mais pessoas
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

export default class Quest_1 extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        question1:{
            question: 'Com qual destes perfis você mais se identifica?',
            answer: null,
        }
    };

    onChangeAns = (text) => {
        this.setState({ question1: { ...this.state.question1, answer: text }});
    };

    navigate = async () => {
        if(this.state.question1.answer != null){

            if(this.state.question1.answer == 'Dependente'){
                
                this.props.navigation.navigate('Quest_2', {
                    question1: this.state.question1 
                });
                
            }else{
                this.props.navigation.navigate('Home');
    
                await this.Quiz(this.state.question1);
            }
        }

    };

    Quiz = async (questions) => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

        const quiz = {userId: user._id, questions};

        await api.post('/quiz/create_quiz', quiz, { headers: {
            Authorization: 'Bearer ' + token
        }});
    }

    render(){
        return(
            <View
            style = { styles.container }
            >
                <Text
                    style = { styles.textQuest }
                >
                    Pergunta 01 de 05
                </Text>

                <Text
                    style = { styles.textHeader }
                >
                    Com qual destes perfis você mais se identifica?
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
        marginLeft: 1,
        marginTop: -65,
        marginRight: -50,
        marginBottom: 3,
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
        marginRight: -80,
    },
    icon: {
        width: 60,
        height: 60,
        marginLeft: -100,
    },
    button: {
        height: 48,
        width: 376,
        backgroundColor: 'rgb(211, 189, 240)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 50,
        marginLeft: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    }

});
