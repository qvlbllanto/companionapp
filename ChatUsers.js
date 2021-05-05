import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, ImageBackground, Image } from 'react-native';
import { useState } from 'react/cjs/react.development';
import {getAccounts} from "./functions.js";
import normalize from 'react-native-normalize';
import SyncStorage from 'sync-storage';
const ChatUsers = ({navigation, route}) =>{
    const [accs, setAccs] = useState([]);
    React.useEffect(()=>{
        route.params.variable(false, false);
        new Promise(()=>{
            
            getAccounts().then((d)=>{
               let o = [];
               for(let x in d){
                   o.push([x, d[x]]);
               }
               setAccs(o);
            })
        })
       
    }, [])

    const changeUser = (v) =>{
        route.params.variable(true, false);
        navigation.replace("Chat", {
            id: v,
            });
            
    }
    return(  <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Need Help? Chat us</Text>
                {accs.map((d, i)=>{
                    return(
                    d[0]!==SyncStorage.get('login').user?
                    <TouchableOpacity key={i} onPress={()=>changeUser(d[0])}>
                    <View style={styles.accounts}>
                        <Image source={d[1].image===undefined?require('./assets/icon.png'):{uri: d[1].image}} style={styles.img}/>
                        <View style={styles.details}>
                            <Text style={styles.name}>{d[1].fname+" "+d[1].lname}</Text>
                            <Text>{d[1].email}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>:null);
                })}
          
       
            </ScrollView>
        </SafeAreaView>
</ImageBackground>);
}


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    rightItems: {
        position: 'absolute',
        right: 10,
        padding: 20,
        width: '50%',
        top: normalize(150, 'height'),
    },
    leftItems: {
     position: 'absolute',
     left: 0,
     padding: 20, 
     width: '50%',
     top: normalize(150, 'height'),
     
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#0D98BA',
        borderRadius: 4,
        margin: 10, 
        height: normalize(90, 'height'),
        width: normalize(150, 'width')
    },
    accounts: {
        width: '100%',
        height: normalize(100, 'height'),
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 6,
        marginBottom: 6
    },
    details:{
        position: 'absolute',
        left: '30%',
        height: '100%',

        padding: 10
    },  
    img:{
        position: 'absolute',
        height: normalize(85, 'height'),
        width: normalize(90, 'width'),
        borderWidth: 2,
        borderRadius: 80,
        marginTop: 5,
        marginLeft:5
        
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    }
   });

export default ChatUsers;