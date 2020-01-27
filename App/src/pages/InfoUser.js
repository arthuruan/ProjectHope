import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
  } from 'react-native';

import api from '../services/api';

export default class Quiz extends Component {

    static navigationOptions = {
        headerTitle: 'Informações pessoais',
        headerTintColor: 'rgb(62, 6, 136)',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    state = {
        loggedInUser: null,
    }

    async componentWillMount(){
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:users'));

        this.setState({ loggedInUser: user });
    }

    render(){
        return(
            <View
                style={styles.container}
            >
                <View
                    style={styles.avatar}
                >
                    <Image
                        source={this.state.loggedInUser &&
                            this.state.loggedInUser.avatar ? 
                            {uri: this.state.loggedInUser.avatar} : 
                            require('../icons/nouser.png')}
                        style={styles.iconUser}
                    />
                </View>

                <View
                    style={styles.content}
                >
                    <Text
                        style={styles.textTitle}
                    >
                        Nome
                    </Text>

                    <Text
                        style={styles.textDescription}
                    >
                        { this.state.loggedInUser &&this.state.loggedInUser.name }
                    </Text>

                    <Text
                        style={styles.textTitle}
                    >
                        E-mail
                    </Text>

                    <Text
                        style={styles.textDescription}
                    >
                        { this.state.loggedInUser && this.state.loggedInUser.email}
                    </Text>

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
    avatar: {
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderColor: '#6667',
    },  
    iconUser: {
        height: 300,
        width: 300,
        borderRadius: 300,
    },
    content:{
        alignItems: 'flex-start',
        paddingLeft: 32,
    },
    textTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'rgb(62, 6, 136)',
        marginVertical: 10,
    },
    textDescription: {
        fontSize: 15,
        color: '#6669',
    }
});
