import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView, ScrollView,Image, StatusBar, View, ImageBackground, Button } from 'react-native';
import normalize from 'react-native-normalize';
import { Dimensions } from "react-native";
import { useState } from 'react/cjs/react.development';

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height; 
const styles = StyleSheet.create({
  
    cols:{
      backgroundColor: 'white',
      height: normalize(110, 'height'),
      width: '100%',
      margin: normalize(4, 'width'),
      borderRadius: 5
    },
    img:{width: width>490?normalize(width/8, 'width'):normalize(width/6, 'width'), height: '90%', position:'relative', marginTop: 5},
    img2:{width: normalize(width/8, 'width'), height: '100%', position:'relative'},
    tabM:{
      backgroundColor:'#410F57'
    },
    tab:{
      backgroundColor:'#c67ace'
    },
    
  })
const BottomNav = (props) =>{
  const [highlight, setHighlight] = useState([true, false, false, false, false, false]);
  React.useEffect(()=>{
  })  
    return(
        <View style={{position:'relative', bottom: 0,  width: '100%',  opacity: 1.5, backgroundColor: '#410F57'}}>
          <View style={{ alignSelf:'center'}}>
        <View style={{width: '100%', height: 70, flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>{setHighlight([true, false, false, false, false, false]);props.myRef.current?.navigate("Dashboard")}} style={!highlight[0]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[0]?require('../assets/home.png'):require('../assets/home2.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setHighlight([false, true, false, false, false, false]);props.myRef.current?.navigate("Dogs")}}  style={!highlight[1]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[1]?require('../assets/dog.png'):require('../assets/dog2.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setHighlight([false, false, true, false, false, false]);props.myRef.current?.navigate("Services")}} style={!highlight[2]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[2]?require('../assets/services.png'):require('../assets/services2.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{setHighlight([false, false, false, true, false, false]);props.myRef.current?.navigate("ChatUsers")}} style={!highlight[3]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[3]?require('../assets/chat.png'):require('../assets/chat2.png')} style={styles.img} />
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{setHighlight([false, false, false, false, false, true]);props.myRef.current?.navigate("Shop")}} style={!highlight[5]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[5]?require('../assets/cart.png'):require('../assets/cart2.png')} style={styles.img} />
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{setHighlight([false, false, false, false, true, false]);props.myRef.current?.navigate("Account")}}  style={!highlight[4]?styles.tabM:styles.tab}>
          <View style={{width: '100%'}}>
            <Image source={!highlight[4]?require('../assets/people.png'):require('../assets/people2.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
          
          </View>
        </View>
    </View>
    )
}
export default BottomNav;