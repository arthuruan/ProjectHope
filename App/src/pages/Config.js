import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Alert,
  } from 'react-native';

import Header from '../pages/Header';

import PhotoUpload from 'react-native-photo-upload';

import api from '../services/api';

import firebase, { RemoteMessage } from 'react-native-firebase';

export default class Config extends Component {

    state = {
        cards: null,
        loggedInUser: null,
        avatar: null,
    };

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        // firebase.messaging().getToken().then((token) => {
        //     console.log(token);
        // }).catch((error) => {
        //     console.log(error);
        // });

        
        firebase.messaging().hasPermission().then((permission) => {
            console.log(permission)
            if(permission){
                firebase.messaging().onMessage((message) => {
                    console.log(message);
                });

                AsyncStorage.getItem('@CodeApi:token').then(token => {

                    api.post('/firebase/notificationAll/',
                    {
                        notification: 'asdflasdfalsfjhlaskdfhasldkjh',
                    },
                    { headers: { Authorization: `Bearer ${token}` }})
        
                }).catch(error => {
                    console.log(error);
                });
            } else {
                firebase.messaging().requestPermission().then(() => {
                    firebase.messaging().onMessage((message) => {
                        console.log(message);
                    });

                    AsyncStorage.getItem('@CodeApi:token').then(token => {

                        api.post('/firebase/notificationAll/',
                        {
                            notification: 'asdflasdfalsfjhlaskdfhasldkjh',
                        },
                        { headers: { Authorization: `Bearer ${token}` }})
            
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        });        

    }

    async componentDidMount() {
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));
        this.setState({ loggedInUser: user, avatar: user.avatar });
  
    };

    updateAvatar = async (avatar, id) => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const user = this.state.loggedInUser;
            
            user.avatar = `data:image/jpeg;base64,${avatar}`;

            await AsyncStorage.setItem(
                '@CodeApi:users', JSON.stringify(user),
            );

            await api.put(`/user/${id}/avatar/`, {
                avatar
            }, { headers: { Authorization: `Bearer ${token}` }});

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }
    }


    render(){
        return(
            <View style = { styles.container }>

                <Header
                    onPressBack={() => this.props.navigation.navigate('Home')}
                    title="Configurações"
                />

                <View
                    style={styles.containerPhotoUp}
                >
                    <PhotoUpload
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                this.setState({avatar});
                                this.updateAvatar(avatar, this.state.loggedInUser._id)
                            }
                        }}
                        maxWidth={150}
                        maxHeight={150}
                    >
                        <Image
                            style={styles.image}
                            resizeMode='cover'
                            source={this.state.avatar ? {uri: this.state.avatar} : require('../icons/nouser.png')}
                        />
                    </PhotoUpload>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('InfoUser')}
                >
                    <Text
                        style={styles.textButton}
                    >
                        INFORMAÇÕES PESSOAIS
                    </Text>
                </TouchableOpacity>

                {this.state.loggedInUser && 
                this.state.loggedInUser.isAdmin &&

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('CardsConfig')}
                    >
                        <Text
                            style={styles.textButton}
                        >
                            CARDS
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    containerPhotoUp: {
        marginTop: 50,
        marginBottom: 80,
        width: 150,
        height: 150,
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    button: {
        height: 42,
        width: 350,
        backgroundColor: 'rgb(62, 6, 136)',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    }
});