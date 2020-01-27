import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList,
    Image,
    ScrollView,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import io from '../Chat/socket';
import api from '../services/api';

export default class Chat extends Component {

    // constructor(props){
    //     super(props);

    //     const didWillFocusSubscription = this.props.navigation.addListener(
    //         'willFocus', (payLoad) => {
    //             this.listenerMessage();
    //         }
    //     );

    //     this.setState({didWillFocusSubscription});
    // };

    state = {
        user: null,
        origin: null,
        destiny: null,
        message: null,
        messages: [],
        refreshMessages: false,
        scrollEnd: null,
        status: false,
        roomId: null,
    };
    
    static navigationOptions = {
        header: null,
    };

    componentDidMount(){
        try{

            this.setOriginAndDestiny().then(() => {
                this.listenerStatus();
                this.getMessage();
                this.listenerRoom();
                this.createRoom();
            }).catch ( (erro) => {
                console.log(erro);
            });
            

        }catch(erro){
            console.log(erro);
        }
    }

    listenerRoom = () => {
        io.on('createRoom', (roomId) => {
            console.log(roomId)
            this.listenerMessage(roomId);

            this.setState({roomId});
        });
    }

    listenerStatus = () => {
        io.on(this.state.destiny, (status) => {
            this.setState({status})
        });
    }

    sendMessage = () => {
        if(this.state.message && this.state.roomId){
            io.emit(this.state.roomId, this.state.message);
            this.setState({message: null});
        }
    }

    createRoom = () => {
        io.emit('createRoom', {destiny: this.state.destiny, origin: this.state.origin});
    }

    listenerMessage = (roomId) => {
        io.on(roomId, (message) => {
            this.setState({messages:[...this.state.messages, message]});

            if(this.scrollView){
                this.scrollView.scrollTo({y: this.state.scrollEnd, animated: 0});
            }
        });
    }

    setOriginAndDestiny = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));
        const userDestiny = this.props.navigation.getParam('userDestiny');

        this.setState({
            origin: user._id,
            destiny: userDestiny.id,
            userDestiny
        });
    }

    getMessage = async () => {

        const token = await AsyncStorage.getItem('@CodeApi:token');

        const response = await api.get('/chat/',{
            origin: this.state.origin,
            destiny: this.state.destiny,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.data.chat) {
            this.setState({
                messages: response.data.chat.messages,   
            });
        }
    }

    onChangeTextMessage = (event) => {
        this.setState({ message: event.nativeEvent.text });
    };

    renderMessages = (messages=[]) => {
        const elements = messages.map(item => {

            const isOrigin = this.state.origin == item.originId;

            return (
                <Text style={[styles.message, isOrigin && styles.origin]} >
                    {item.message}
                </Text>
            )
        });

        return elements;
    }

    setScrollViewEnd = (scrollValue) => {
        this.setState({scrollEnd: scrollValue});
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
                        onPress={() => this.props.navigation.navigate('Messages')}
                    >
                        <Image
                            style={styles.imageBack}
                            source={require('../icons/arrow.png')}
                        />
                    </TouchableOpacity>

                    <Image
                        style={styles.imageAvatar}
                        source={this.state.userDestiny && 
                            this.state.userDestiny.avatar ? 
                            {uri: `data:image/jpeg;base64,${this.state.userDestiny.avatar}`} : 
                            require('../icons/nouser.png')}
                    /> 

                    <View
                        style={styles.containerName}
                    >
                    
                    <Text
                        numberOfLines={1}
                        style={styles.name}
                    >
                        {this.state.userDestiny && this.state.userDestiny.name}
                    </Text>

                    <Text
                        style={styles.status}
                    >
                        {this.state.status ? 'Online' : 'Offline'}
                    </Text>

                    </View>
                    
                </View>

                <ScrollView
                    style={styles.scrollView}
                    ref={ref => this.scrollView = ref }
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.setScrollViewEnd(contentHeight);
                        this.scrollView.scrollTo({y: contentHeight, animated: 0});
                    }}
                >
                    {this.renderMessages(this.state.messages)}
                    <View style={styles.scrollViewBottonSpace}></View>
                </ScrollView>

                <View
                    style={styles.containerSend}
                >
                    <TextInput
                        style={styles.input}
                        placeholder={'Escreva aqui...'}
                        multiline={true}
                        onChange={this.onChangeTextMessage}
                        value={this.state.message}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.sendMessage}
                    >
                        <Image
                            style={styles.sendImage}
                            source={require('../icons/send.png')}
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
    containerHeader: {
        backgroundColor: '#FFF',
        height: 90,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
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
    button: {
        alignItems: 'center',
        height: 30,
        width: 50,
        maxHeight: 50,
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 20,
    },
    textButton:{
        color: '#FFF',
        fontSize: 14,
    },
    input: {
        backgroundColor: 'rgb(228, 232, 236)',
        flex: 1,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    scrollView: {
        width: '100%',
        flex: 1,
        paddingHorizontal:13,
        paddingTop: 15,
    },
    scrollViewBottonSpace: {
        height: 20,
    },
    message: {
        display: 'flex',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        width: 'auto',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 14,
        marginVertical: 3,
        borderRadius: 25,
    },
    origin: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgb(62, 6, 136)',
        color: '#fff',
    },
    containerSend: {
        minHeight: 50,
        maxHeight: 150,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgb(228, 232, 236)',
    },
    sendImage: {
        width: 30,
        height: 30,
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 15,
    },
    imageBack: {
        marginRight: 15,
        width: 45,
        height: 45,
    },
    status: {
        fontSize: 13,
        color: '#6667',
        fontWeight: 'bold',
    },
});