import { 
    createStackNavigator, 
    createNavigationContainer, 
    createBottomTabNavigator, 
    createDrawerNavigator 
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';

import React from 'react';

import Login from '../pages/LoginScreen';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Register from '../pages/Register';
import Quest_1 from '../pages/questions/Quest_1';
import Quest_2 from '../pages/questions/dependentes/Quest_2';
import Quest_3 from '../pages/questions/dependentes/Quest_3';
import Quest_4 from '../pages/questions/dependentes/Quest_4';
import Quest_5 from '../pages/questions/dependentes/Quest_5';
import Home from '../pages/Home';
import Messages from '../pages/Messages';
import Config from '../pages/Config';
import CardsConfig from '../pages/CardsConfig';
import CreateCards from '../pages/CreateCards';
import Chat from '../pages/Chat';
import Users from '../pages/Users';
import InfoUser from '../pages/InfoUser';

const AppDrawer = createDrawerNavigator(
    {
        Messages: {
            screen: Messages,
        }
    }   
);

const AppDrawerHome = createDrawerNavigator(
    {
        Home: {
            screen: Home,
        },
    }   
);


const AppTab = createBottomTabNavigator(
    {   
        Home: {
            screen: AppDrawerHome,
        },
        Messages: {
            screen: AppDrawer,
        }
    }, 
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let Icon = null;

                if (routeName === 'Home') {
                    iconName = 'home-outline';
                    Icon = <MaterialIcons name={iconName} size={horizontal ? 20 : 30} color={tintColor} />;
                } else if (routeName === 'Messages') {
                    iconName = 'message-square';
                    Icon = <FeatherIcons name={iconName} size={horizontal ? 20 : 30} color={tintColor} />;
                }
                return Icon;
            },
          }),
        tabBarOptions: {
            activeTintColor: 'rgb(62, 6, 136)',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 14,
            },
            style: {
                height: 62,
            },
            showLabel: false,
        },
        initialRouteName: 'Home',
        
    }
);

const AppNavigator = createStackNavigator({
    Login:{
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    ResetPassword: {
        screen: ResetPassword
    },
    Register: {
        screen: Register
    },
    Quest_1: {
        screen: Quest_1
    },
    Quest_2: {
        screen: Quest_2
    },
    Quest_3: {
        screen: Quest_3
    },
    Quest_4: {
        screen: Quest_4
    },
    Quest_5: {
        screen: Quest_5
    },
    Home: { 
        screen: AppTab,
        navigationOptions: {
            header: null,
        }
    },
    Config: {
        screen: Config
    },
    CardsConfig: {
        screen: CardsConfig
    },
    CreateCards: {
        screen: CreateCards
    },
    Chat: {
        screen: Chat
    },
    Users: {
        screen: Users
    },
    InfoUser: {
        screen: InfoUser
    }

}, {
    initialRouteName: 'Login',
});

const AppContainer = createNavigationContainer(AppNavigator);

export default AppContainer;