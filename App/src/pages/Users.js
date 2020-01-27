import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    Image
} from 'react-native';

import api from '../services/api';

export default class Users extends Component {

    constructor(props){
        super(props);

        const didWillFocusSubscription = this.props.navigation.addListener(
            'willFocus', async (payLoad) => {
                this.readFriends();
            }
        );

        this.setState({didWillFocusSubscription});
    }

    static navigationOptions = {
        header: null, 
    };

    state = {
        friends: null,
        loggedInUser: null,
    };

    navigate = (user) => {
        this.props.navigation.navigate('Chat', {
            userDestiny: {
                name: user.name,
                avatar: user.avatar,
                id: user._id,
            }
        })
    };

    readFriends = async () => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

            const response = await api.get('/user/', {}, { headers: { Authorization: `Bearer ${token}` }});
            const friends =  response.data.user.filter((item) => {
                return (item._id != user._id);
            });
    
            this.setState({friends: friends});
            this.setState({ loggedInUser: user });

        }catch(erro){
            console.log(erro);
        } 
    }

    componentDidMount(){
        this.readFriends();
    }

    render(){
        return(
            <View
                style={styles.container}
            >

                <View
                    style={styles.containerHeader}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            style={styles.imageBack}
                            source={require('../icons/arrow.png')}
                        />
                    </TouchableOpacity>

                    <Text
                        numberOfLines={1}
                        style={styles.name}
                    >
                        Usuários
                    </Text>
                    

                </View>

                <FlatList
                    data={this.state.friends}
                    renderItem={({ item }) => {
                        return(
                            <View
                                style={styles.containerMessages}
                            >
                                {/* {this.state.loggedInUser && (item.name != this.state.loggedInUser.name) && */}
                                
                                    <TouchableOpacity
                                        style={styles.buttonUser}
                                        onPress={() => this.navigate(item)}
                                    >
                                        <Image
                                            style={styles.imageAvatar}
                                            source={item.avatar ? {uri: `data:image/jpeg;base64,${item.avatar}`} : require('../icons/nouser.png')}
                                        />

                                        <View>
                                            <Text
                                                style={styles.textName}
                                            >
                                                {item.name}
                                            </Text>
                                        </View>
                                    
                                    </TouchableOpacity>
                                
                                {/* } */}

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
        flex: 1,
        backgroundColor: '#FFF',
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
    containerHeader: {
        backgroundColor: '#FFF',
        height: 80,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    containerName: {
        justifyContent: 'flex-start',
        height: '100%',
        paddingVertical: 18,
    },
    name: {
        color: 'rgb(62, 6, 136)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageBack: {
        marginRight: 15,
        width: 45,
        height: 45,
    },
});