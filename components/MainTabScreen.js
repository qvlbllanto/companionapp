import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ChatUsers from "../ChatUsers.js";
import Chat from "../Chat.js";
import Account from "../Account.js";



const HomeStack = createStackNavigator();
const ChatUserStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {

    return(
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="rgba(0, 0, 0, 1)"
      barStyle={{ backgroundColor: '#FFC0CB' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'rgba(0, 0, 0, 1)',
          LabelColor:'#000000',

        }}
      />
     
       <Tab.Screen
        name="ChatUsers"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarColor: '#FFC0CB',

        }}
      />
       <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#FFC0CB',

        }}
      />
    </Tab.Navigator>
    );

};


export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC0CB",
        },
        title:null
      }}>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
  
  
  const ChatStackScreen = ({navigation}) => (
    <ChatUserStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC0CB",
        },
        title:null
      }}>
        <ChatUserStack.Screen name="ChatUsers" component={ChatUsers} />
        <ChatUserStack.Screen name="Chat" component={Chat}  />
  
    </ChatUserStack.Navigator>
  );
  
  const AccountStackScreen = ({navigation}) => (
    <AccountStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC0CB",
        },
        title:null
      }}>
        <AccountStack.Screen name="Account" component={Account} />
    </AccountStack.Navigator>
  );