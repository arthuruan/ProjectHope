import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import api from '../services/api';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

export default class Home extends Component {

    constructor(props){
        super(props);

        const didWillFocusSubscription = this.props.navigation.addListener(
            'willFocus', async (payLoad) => {
                const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

                if(user) {
                    this.setState({ loggedInUser: user });
                }
            }
        );

        this.setState({didWillFocusSubscription});
    }

    state = {
        cards: null,
        loggedInUser: null,
        isLoading: false,
        didWillFocusSubscription: null,
    }

    readCards = async () => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const response = await api.get('/cards/', {}, { headers: { Authorization: `Bearer ${token}` }});
        const cards =  response.data.cards;

        this.setState({cards});
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

        if(token && user) {
            this.setState({ loggedInUser: user });
        }
    };

    getCards = () => {
        wait(5000).then(() => this.setState({isLoading: true})).then(() => this.setState({isLoading: false}));
        this.readCards();
    }

    componentWillMount(){
        this.readCards();
    }

    render(){
        if(!this.state.cards){
            return null;
        }

        return(

            <View
                style={styles.container}
            > 
                <StatusBar backgroundColor= '#FFF' barStyle= 'dark-content' />

                <View
                    style={styles.header}
                >   
                    <View
                        style={styles.containerTextWelcome}
                    >
                        <Text
                            style={styles.textHeader}
                        >
                            Olá, {this.state.loggedInUser.name}
                        </Text>
                    </View>

                    <View
                        style={styles.containerAvatar}
                    >
                        <TouchableOpacity
                            style={styles.buttonUser}
                            onPress={() => this.props.navigation.navigate('Config')}
                        >
                            <Image
                                source={this.state.loggedInUser &&
                                    this.state.loggedInUser.avatar ? 
                                    {uri: this.state.loggedInUser.avatar} : 
                                    require('../icons/nouser.png')}
                                style={styles.iconUser}
                            />
                        </TouchableOpacity>
                    </View>


                </View>

                <FlatList 
                    data={this.state.cards}
                    refreshing={this.state.isLoading}
                    onRefresh={this.getCards}
                    renderItem={({ item }) => {
                        return(
                            <View style={styles.containerCards}>
                                {
                                    item.type === 'dicas' &&
                                    <View style={styles.container, styles.dicas}>
                                        <View style={styles.containerDicas}>
                                            <View style={styles.containerDicasIcon}>
                                                <Image
                                                    source = {require('../icons/dicas.png')}
                                                    style = { styles.iconDicas }
                                                    resizeMode='center'
                                                />
                                            </View>
                                            <View style={styles.containerDicasInfos}>
                                                <Text
                                                    style={styles.title}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    style={styles.description}
                                                >
                                                    {item.description}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.button}
                                        >
                                            <Text
                                                style={styles.textButton}
                                            >
                                                VER MAIS DICAS
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                {
                                    item.type === 'fatos' &&
                                    <View style={styles.container, styles.fatos}>
                                        <View style={styles.containerFatos}>
                                            <View style={styles.containerFatosInfos}>
                                                <Text
                                                    style={styles.title}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    style={styles.description}
                                                >
                                                    {item.description}
                                                </Text>
                                            </View>
                                            <View style={styles.containerFatosIcon}>
                                                <Image
                                                    source = {require('../icons/fatos.png')}
                                                    style = { styles.iconFatos }
                                                    resizeMode='center'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                }
                                {
                                    item.type === 'motivacional' &&
                                    <View style={styles.container, styles.motivacional}>
                                        <View style={styles.containerMotivacional}>
                                            <View style={styles.containerMotivacionalIcon}>
                                                <Image
                                                    source = {require('../icons/aspas.png')}
                                                    style = { styles.iconMotivacional }
                                                    resizeMode='center'
                                                />
                                            </View>
                                            <View style={styles.containerMotivacionalInfos}>
                                                <Text
                                                    style={styles.descriptionMotivacional}
                                                >
                                                    {item.description}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',
    },
    header:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 80,
        marginBottom: 10,
        position: 'relative',
    },
    containerTextWelcome: {
        justifyContent: 'center',
        marginLeft: 22,
        flex: 1,
        height:80,
        width: 300,
    },
    containerAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 95,
    },
    buttonUser: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderWidth: 5,
        borderColor: 'rgb(62, 6, 136)',
        borderRadius: 100,
    },
    iconUser: {
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    textHeader: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    //card dicas
    dicas: {
        height: 270,
        marginBottom: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: '#33333333',
    },  
    containerDicas: {
        flexDirection: 'row',
        marginRight: 10,
        borderRadius: 25,
        marginBottom: 10,
    },
    containerDicasIcon: {
        position: 'relative',
        width: 120,
        height: 200,
        justifyContent: 'flex-start',
        borderRadius: 25,
    },
    containerDicasInfos: {
        flex: 1,
        height: 200,
        borderRadius: 25,
    },
    iconDicas: {
        width: 110,
        height: 130,
    },
    button:{
        backgroundColor: 'rgb(211, 189, 240)',
        height: 43,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    title: {
        fontSize: 18,
        color: '#334',
        fontWeight: 'bold',
        paddingTop: 20,
    },
    description: {
        color: '#333',
        fontSize: 15,
        paddingTop: 10,
    },

    //fatos
    fatos: {
        height: 200,
        marginBottom: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: '#33333333',
    },  
    containerFatos: {
        flexDirection: 'row',
        marginLeft: 10,
        borderRadius: 25,
        marginBottom: 10,
    },
    containerFatosIcon: {
        position: 'relative',
        width: 110,
        height: 200,
        justifyContent: 'flex-start',
        borderRadius: 25,
        marginRight: 10,
    },
    containerFatosInfos: {
        flex: 1,
        height: 200,
        borderRadius: 25,
        paddingLeft: 10,
    },
    iconFatos: {
        width: 140,
        height: 140,
    },

    //motivacional
    motivacional: {
        height: 200,
        marginBottom: 20,
        backgroundColor: 'rgb(62, 6, 136)',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 15,
    },
    containerMotivacional: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    containerMotivacionalIcon: {
        alignItems: 'center',
        width: 110,
        height: 80,
        borderRadius: 25,
        marginRight: 10,
        paddingTop: 25,
    },
    containerMotivacionalInfos: {
        flex: 1,
        height: 200,
        borderRadius: 25,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 15,
    },
    iconMotivacional: {
        width: 60,
        height: 60,
    },
    descriptionMotivacional:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
        fontSize: 17,
        paddingTop: 10,
    }
    
});