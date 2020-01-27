import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    Image,
    TextInput,
    
} from 'react-native';

import api from '../services/api';

export default class Messages extends Component {
    
    constructor(props){
        super(props);

        const didWillFocusSubscription = this.props.navigation.addListener(
            'willFocus', (payLoad) => {
                this.readFriends();
            }
        );

        this.setState({didWillFocusSubscription});
    };

    state = {
        rooms: null,
        didWillFocusSubscription: null,
    };

    navigate = (user) => {

        this.props.navigation.navigate('Chat', {
            userDestiny: {
                name: user.name,
                avatar: user.avatar,
                id: user.id,
            },
        })
    }

    readFriends = async () => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');

            const response = await api.get('/chat/rooms/', {}, { headers: { Authorization: `Bearer ${token}` }});
            const rooms =  response.data;

            this.setState({rooms});
        }catch(erro){
            console.log(erro);
        } 
    }

    render(){
        return(
            <View
                style={styles.container}
            >

                <View
                    style={styles.containarHeader}
                >
                    <Text
                        style={styles.textHeader}
                    >
                        Mensagens
                    </Text>

                    <Text
                        style={styles.lengthMsg}
                    >
                        {this.state.rooms && this.state.rooms.length} 
                        {this.state.rooms && this.state.rooms.length == 1 ? ' conversa': ' conversas'}</Text>

                </View>

                <View
                    style={styles.containerInput}
                >

                    <TextInput
                        style={styles.input}
                        placeholder={'Pesquisar'}
                    />

                </View>

                <FlatList
                    data={this.state.rooms}
                    renderItem={({ item }) => {
                        return(

                            <View
                                style={styles.containerMessages}
                            >
                                <TouchableOpacity
                                    style={styles.buttonUser}
                                    onPress={() => this.navigate(item)}
                                >
                                    <Image
                                        style={styles.imageAvatar}
                                        source={item.avatar ? {uri: `data:image/jpeg;base64,${item.avatar}`} : require('../icons/nouser.png')}
                                    /> 
                                    <View style={styles.content}>
                                        <Text
                                            style={styles.textName}
                                        >
                                            {item.name}
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            style={styles.textLastMessage}
                                        >
                                            {item.lastMessage.message}
                                        </Text>
                                    </View>
                                
                                </TouchableOpacity>

                            </View>
                        );
                    }}
                
                />
                
                <View
                    style={styles.containerButtonCreate}
                >
                    <TouchableOpacity
                        style={styles.buttonCreate}
                        onPress={() => this.props.navigation.navigate('Users')}
                    >
                        <Image
                            style={styles.createImage}
                            source={require('../icons/createWhite.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containarHeader:{
        backgroundColor: '#FFF',
        height: 90,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
    },
    lengthMsg: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6667',
    },
    containerInput:{
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 10,
    },
    input: {
        borderRadius: 50,
        backgroundColor: 'rgb(228, 232, 236)',
        width: '90%',
        paddingHorizontal: 20,
        elevation: 2,
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
    content: {
        flex: 1,
    },  
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 15,
    },
    containerMessages: {
        backgroundColor: '#fff',
        height: 80,
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
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
    buttonUser: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 23,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    textLastMessage: {
        fontSize: 14,
        color: '#6667',
        fontWeight: 'bold',
    }
});