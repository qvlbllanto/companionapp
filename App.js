

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login, Register} from './Login.js';
import Chat from "./Chat.js";
import Account from "./Account.js";
import SyncStorage from 'sync-storage';
import ChatUsers from "./ChatUsers.js";
import Dashboard from "./Dashboard.js";
import {Shop, Cart} from "./Shop.js";
import {Dogs} from "./Dogs.js";
import { useState } from 'react/cjs/react.development';
import BottomNav from "./components/BottomNav.js";
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView, ScrollView,Image, StatusBar, View, ImageBackground, Button } from 'react-native';
import normalize from 'react-native-normalize';
import MainTabScreen from "./components/MainTabScreen.js";
import Header from "./components/Header.js"
import Services from "./Services.js";
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Stack = createStackNavigator();

let horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};



export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ch: false,
      l: SyncStorage.get("login")!==undefined?SyncStorage.get("login").loggedin:false,
      chat: false
    },
    this.myRef = React.createRef();
  }
  componentDidMount = async() =>{
      await SyncStorage.init();
      if(SyncStorage.get("login")===undefined){
        SyncStorage.set("login", {user: null, loggedin: false, pass: null});
      }else{
        this.setState({l: SyncStorage.get("login").loggedin})
      }
  }

  changel = (va, x) =>{
    if(x){
      this.setState({l: va});
    }else{
      this.setState({chat: va});
    }
  } 

render(){
  return (
<View style={{flex: 1}}>
  {this.state.l?<Header myRef={this.myRef} chat = {this.state.chat} variable={this.changel} login = {this.state.l}/>:null}

    <NavigationContainer ref={this.myRef}>
      
    <Stack.Navigator
     screenOptions={{
      headerShown: false
    }}>
      {!this.state.l?<Stack.Screen
        name="Login"
        component={Login}
        options={horizontalAnimation}
        initialParams={{ variable: this.changel }}
      />:undefined}
      {!this.state.l?<Stack.Screen
        name="Register"
        component={Register}
        options={horizontalAnimation}
      />:undefined}
      {this.state.l?<Stack.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{variable: this.changel}}
      />:undefined}
      {this.state.l?<Stack.Screen
        name="Chat"
        component={Chat}
        initialParams={{variable: this.changel,
                        cha: this.state.chat}}
      />:undefined}
      {this.state.l?<Stack.Screen
        name="ChatUsers"
        component={ChatUsers}
        initialParams={{variable: this.changel}}
      />:undefined}
      {this.state.l?<Stack.Screen
          name="Services"
          component={Services}
          initialParams={{variable: this.changel}}
      />:undefined}
      {this.state.l?<Stack.Screen
          name="Shop"
          component={Shop}
          initialParams={{variable: this.changel}}
      />:undefined}
       {this.state.l?<Stack.Screen
          name="Cart"
          component={Cart}
          initialParams={{variable: this.changel}}
      />:undefined}
      {this.state.l?<Stack.Screen
        name="Account"
        component={Account}
        initialParams={{variable: this.changel}}
      />:undefined}
      {this.state.l?<Stack.Screen
          name="Dogs"
          component={Dogs}
          initialParams={{variable: this.changel}}
      />:undefined}
    </Stack.Navigator>
    {this.state.l?<BottomNav myRef={this.myRef}/>:null}
    {/* <Text onPress={()=>this.myRef.current?.navigate("Register")}>FOOTERAKO
      </Text> */}
  </NavigationContainer>

  </View>
  );
}
}
