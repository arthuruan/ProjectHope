import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';


export default class Header extends Component {
    render() {
        return(
        <View
            style={styles.containerHeader}
        >
            <TouchableOpacity
                onPress={this.props.onPressBack}
            >
                <Image
                    style={styles.imageBack}
                    source={require('../icons/arrow.png')}
                />
            </TouchableOpacity>

            <Text
                numberOfLines={1}
                style={styles.title}
            >
                {this.props.title}
            </Text>
            

        </View>
        );
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: '#FFF',
        height: 80,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    title: {
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