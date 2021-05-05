import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView, ScrollView,Image, StatusBar, View, ImageBackground, Button } from 'react-native';
import normalize from 'react-native-normalize';
import { Dimensions } from "react-native";
import SyncStorage from 'sync-storage';
const width = Dimensions.get('window').width; 

const styles = StyleSheet.create({
  
    cols:{
      backgroundColor: 'white',
      height: normalize(115, 'height'),
      width: '100%',
      margin: normalize(4, 'width'),
      borderRadius: 5
    },
    img:{width:35, height: '110%',margin:1, position:'relative',   borderRadius: 50},
    rightside:{
        
    }
  })
const Header = (props) =>{
    const logout = () =>{
      new Promise((resolve, reject)=>{
        props.variable(false, true);
        resolve(true);
      }).then(()=>{
          SyncStorage.set("login", {user: null, loggedin: false}).then(()=>{
           props.myRef.current?.navigate("Login");
       });
      })
        
        
    
 }
    return(
        <View style={{ borderTopColor:'black', borderTopWidth: 1, width: '100%', backgroundColor: '#410F57', padding: 10, height: 50, opacity: 1, flexDirection: 'row'}}>
   
  
    <View style={{width:'50%', flexDirection: 'row'}}><Text style={{color: 'white', fontSize: 20,  position:'relative'}}>Companion</Text><Image source={require('../assets/ic_launcher.png')} style={styles.img} /></View>
    <View style={{width:'26%', marginRight: 4}}><TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>props.myRef.current?.navigate("Cart")}><Image source={require('../assets/shopping-cart.png')}/></TouchableOpacity></View>
    <View style={{width:'20%'}}><TouchableOpacity onPress={logout}><Text style={{textAlign:'right', color:'white', fontSize: 18}}>{'Logout'}</Text></TouchableOpacity></View>
    </View>
    )
}
export default Header;