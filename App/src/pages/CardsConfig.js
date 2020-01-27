import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Image,
    FlatList,
    TextInput,
    Alert,
} from 'react-native';

 import api from '../services/api';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

export default class CardsConfig extends Component {

    static navigationOptions = {
        headerTitle: 'Cards',
        headerTintColor: 'rgb(62, 6, 136)',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    state = {
        cards: null,
        loggedInUser: null,
        isLoading: false,
        isUpdateDelete: false,
        isUpdate: false,

        idCard: null,
        title: null,
        type: null,
        description: null,
        link: null,
        image: null,
    }

    readCards = async () => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const response = await api.get('/cards/', {}, { headers: { Authorization: `Bearer ${token}` }});
            const cards =  response.data.cards;
    
            this.setState({cards});
        }catch(erro){
            Alert.alert('erro ao ler os cards, tente novamente');
        } 
    }

    getCards = () => {
        wait(5000).then(() => this.setState({isLoading: true})).then(() => this.setState({isLoading: false}));
        this.readCards();
    }
    
    componentWillMount(){
        this.readCards();
    }

    delete = async (id) => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        await api.delete(`/cards/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});

        Alert.alert('Card excluído com sucesso, \nporfavor atualize a página!!');

        this.setState({isUpdateDelete: false});
    }

    update = async (title, type, description, link, image, id) => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');

            await api.put(`/cards/${id}`, {
                title,
                type,
                description,
                link,
                image
            }, { headers: { Authorization: `Bearer ${token}` }});

            Alert.alert('Card editado com sucesso, \nporfavor atualize a página!!');

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    }

    onChangeTextTitle = (event) => {
        this.setState({ title: event.nativeEvent.text });
    };

    onChangeTextDescription = (event) => {
        this.setState({ description: event.nativeEvent.text });
    };

    render(){
        if(!this.state.cards){
            return null;
        }

        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: this.state.isUpdateDelete || this.state.isUpdate ? '#0000004d' : '#fff'
                }}
            >
                <FlatList
                    data={this.state.cards}
                    refreshing={this.state.isLoading}
                    onRefresh={this.getCards}
                    renderItem={({ item }) => {
                        return(
                            <View>   
                                <View
                                    style={styles.containerRow}
                                >   
                                    <View
                                        style={styles.containerInfo}
                                    >

                                        <Text
                                            style={styles.textType}
                                        >
                                            {item.type}
                                        </Text>

                                        <Text
                                            style={styles.textDescription}    
                                        >
                                            {item.description}
                                        </Text>

                                    </View>

                                    <TouchableOpacity
                                        style={styles.buttonMore}
                                        onPress={() => {
                                            this.setState({
                                                isUpdateDelete: true, 
                                                idCard: item._id,
                                                title: item.title,
                                                type: item.type,
                                                description: item.description,
                                                link: item.link,
                                                image: item.image
                                            });
                                        }}
                                    >
                                        <Image
                                            style={styles.imageButton}
                                            source={require('../icons/3points.png')}
                                        />

                                    </TouchableOpacity>

                                </View>
                            </View>
                        );

                    }}
                />
                {
                    this.state.isUpdateDelete &&

                    <View
                        style={styles.containerUD}
                    >
                        <TouchableOpacity
                            style={styles.buttonUD}
                            onPress={() => this.setState({isUpdate: true, isUpdateDelete: false})}
                        >
                            <Text
                                style={styles.TextUD}
                            >
                                EDITAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonUD}
                            onPress={() => this.delete(this.state.idCard)}
                        >
                            <Text
                                style={styles.TextUD}
                            >
                                DELETAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonBack}
                            onPress={() => this.setState({isUpdateDelete: false})}
                        >
                            <Text
                                style={styles.TextBack}
                            >
                                VOLTAR
                            </Text>
                        </TouchableOpacity>

                    </View>

                }
                {
                    this.state.isUpdate &&

                    <View
                        style={styles.containerUpdate}
                    >
                        <FlatList
                            data={this.state.cards}
                            refreshing={this.state.isLoading}
                            onRefresh={this.getCards}
                            renderItem={({ item }) => {

                                return(
                                    <View>
                                        {
                                            (item._id == this.state.idCard) &&

                                            <View>
                                                { 
                                                    (item.type == 'dicas' ||
                                                    item.type == 'fatos') &&

                                                    <View
                                                        style={{height: 320}}
                                                    >
                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextTitle}
                                                            placeholder = 'Título'
                                                        />

                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextDescription}
                                                            placeholder = 'Descrição'
                                                        />
                                                    </View>
                                                }
                                                {
                                                    item.type == 'motivacional' &&

                                                    <View
                                                        style={{height: 320}}
                                                    >

                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextDescription}
                                                            placeholder = 'Descrição'
                                                        />

                                                    </View>
                                                }

                                                <TouchableOpacity
                                                    style={styles.buttonUD}
                                                    onPress={() => {
                                                        this.setState({isUpdate: false}),
                                                        this.update(
                                                            this.state.title, 
                                                            this.state.type, 
                                                            this.state.description, 
                                                            this.state.link, 
                                                            this.state.image,
                                                            this.state.idCard,
                                                        )
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.TextUD}
                                                    >
                                                        EDITAR
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.buttonBack}
                                                    onPress={() => this.setState({isUpdate: false, isUpdateDelete: true})}
                                                >
                                                    <Text
                                                        style={styles.TextBack}
                                                    >
                                                        VOLTAR
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        }   
                                    </View>
                                );

                            }}
                        />
                    </View>
                 
                }
                {
                    !this.state.isUpdateDelete && 
                    !this.state.isUpdate &&

                        <View
                            style={styles.containerButtonCreate}
                        >
                            <TouchableOpacity
                                style={styles.buttonCreate}
                                onPress={() => this.props.navigation.navigate('CreateCards')}
                            >
                                <Image
                                    style={styles.createImage}
                                    source={require('../icons/createWhite.png')}
                                />
                            </TouchableOpacity>
                        </View>
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerRow:{
        flex: 1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#6667',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    containerInfo: {
        marginTop: -10,
        width: 350,
    },
    textType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    textDescription: {
        fontSize: 18,
        color: '#6669',
    },
    buttonMore: {
        alignItems: 'center',
        paddingTop: 1,
        borderRadius: 100,
        width: 40,
        height: 40,
    },
    imageButton: {
        width: 25,
        height: 25,
    },
    containerUD: {
        backgroundColor: 'rgb(224, 212, 245)',
        borderTopWidth: 3,
        borderColor: 'rgb(62, 6, 136)',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextUD: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    buttonUD: {
        backgroundColor: '#FFF',
        height: 42,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
    TextBack: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    buttonBack: {
        backgroundColor: 'rgb(62, 6, 136)',
        height: 42,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        borderRadius: 10,
    },
    containerUpdate: {
        backgroundColor: 'rgb(224, 212, 245)',
        borderTopWidth: 3,
        borderColor: 'rgb(62, 6, 136)',
        paddingTop: 20,
        height: 500,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        marginTop: 25,
        borderRadius: 10,
        height: 42,
        width: 350,
    },
    containerButtonCreate: {
        backgroundColor: 'rgb(62, 6, 136)',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        elevation: 3,
        borderRadius: 100,
    },
    buttonCreate:{
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(62, 6, 136)',
    },
    createImage: {
        height: 25,
        width: 25,
    },
});


