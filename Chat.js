import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, ImageBackground, Button } from 'react-native';
import normalize from 'react-native-normalize';
import { useState } from 'react/cjs/react.development';
import SyncStorage from 'sync-storage';
import {getChat, getChatOpen, sendChat} from "./functions.js"

const Chat = ({navigation, route}) =>{
    const [chats, setChats] = useState([]);
    const [chatID, setChatID] = useState('');
    const [m, setM] = useState(null)
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(10);
    const [handleLag, setHandleLag] = useState(true);
    React.useEffect(()=>{
        const timer = setTimeout(() => {
            let x = count;
            x+=0.000001;
            setCount(x);
            if(chatID===''){
                getChatOpen(SyncStorage.get('login').user,  route.params.id, chatID ).then((d)=>{
                    setChatID(d);
                }).catch((error) => {
                    console.log(error);
                });
             }
            getChat(chatID, num).then((d1)=>{
                let o = [];
               for(let i in d1){
                    o.push(d1[i]);
                }
                setChats(o);
                setHandleLag(true);
            }).catch((error) => {
                console.log(error);
              });
          }, 200);
          return () => clearTimeout(timer);
    })

    const sendChatMessage = () =>{
        sendChat(chatID, m,  SyncStorage.get('login').user).then(()=>{
            console.log("Sent");
        })
    }
    const handleScroll = (event) => {
        const positionY = event.nativeEvent.contentOffset.y;
        if(positionY===0){
            if(handleLag){
                setNum(15);
                setHandleLag(false);
            }
        }
      };

    return(
        <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} onScroll={handleScroll}>
                {handleLag===false?<TouchableOpacity style={{alignSelf: 'center', position: 'relative', top: 0, marginBottom: 10}}><Text>Load More</Text></TouchableOpacity>: null}
                {chats.map((d, i)=>{
                    return(d.who===SyncStorage.get('login').user?
                    <View style={styles.userM} key={i}>
                    <Text style={styles.dateUser}>{new Date(d.date).toDateString()} {new Date(d.date).toLocaleTimeString()}</Text>
                        <Text style={styles.text}>
                            {d.message}
                        </Text>
                    </View>:
                    <View style={styles.otherM} key={i}>
                    <Text style={styles.dateOther}>{new Date(d.date).toDateString()} {new Date(d.date).toLocaleTimeString()}</Text>
                        <Text style={styles.text}>
                       {d.message}
                        </Text>
                    </View>);
                })}
               
                
               
                </ScrollView>
                <View style={styles.chat}>
                <TextInput placeholder="Type Message..."  multiline onChangeText={(v)=>setM(v)}/>
                </View>
                <TouchableOpacity style={styles.sendB} onPress={sendChatMessage}><Text>Send</Text></TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'transparent',
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 10
    },
    text: {
      fontSize: 13,
     
    },
    userM: {
        borderWidth: 2,
        borderRadius: 8,
        position: 'relative',
        backgroundColor: '#f5ccff',
        marginLeft: '35%', 
        right:0, 
        marginBottom: 23,
        padding: 10,
        width: 'auto',
    },
    otherM: {
        borderWidth: 2,
        borderRadius: 8,
        position: 'relative',
        backgroundColor: 'white',
        marginRight: '35%', 
        right:0,
        marginBottom: 23,
        padding: 10
    },
    dateUser: {
        position: 'absolute',
        right: 0,
        bottom: -15,
        fontSize: 8,
        color: 'white'
    },
    dateOther: {
        position: 'absolute',
        left: 0,
        bottom: -15,
        fontSize: 8,
        color: 'white'
    },
    chat: {
        borderRadius: 4,
        borderWidth: 1,
        width: '100%',
        padding: normalize(10, 'height'),
        backgroundColor: 'white',
        height: normalize(75, 'height'),
        margin: 2,
    },
    sendB: {
        position: 'absolute',
        bottom: normalize(0, 'height'),
        right: 0,
        margin: 10,
        borderRadius: 5,
        padding: normalize(20, 'height'),
        borderWidth: 2,
        backgroundColor: 'purple'
    }
  });
export default Chat;