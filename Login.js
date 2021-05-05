import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import SyncStorage from 'sync-storage';
import {RegisterAccount, checkAccountIfExist} from "./functions.js";
const Login = ({ navigation, route }) =>{
    
    const [user, setuser] = useState(null);
    const [pass, setPass] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    React.useEffect(()=>{
        route.params.variable(false, true);
    }, [])
    const login = () =>{
        new Promise(()=>{
            setErrMessage(null);
            if(user === null || user === ''){
                setErrMessage("Enter your Username!");
                return false;
            }
            if(pass === null || pass === ''){
                setErrMessage("Enter your Password!");
                return false;
            }
            checkAccountIfExist({user: user, pass: pass}).then((d)=>{
                if(d[0]){
                    new Promise((resolve, reject)=>{
                        route.params.variable(true, true);
                        resolve(true);
                      }).then(()=>{
                        SyncStorage.set("login", {user: d[1], loggedin: true, pass: pass}).then(()=>{
                            navigation.navigate('Dashboard');
                        });
                      })
                }else{
                    setErrMessage(d[1]);
                }
            }).catch((error) => {
                console.log(error);
            });
        });
    }
   
    return(
        <ImageBackground source={require('./bgdefault2.png')}  style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
            <View style={styles.container}>
                <View style={styles.topPosition}>
                    <Text style={styles.text}>Login</Text>
                <TextInput placeholder="Input Username" style={styles.inputtext} onChangeText={(val) =>setuser(val)}/>
                    <TextInput secureTextEntry placeholder="Input Password"  style={styles.inputtext} onChangeText={(val) =>setPass(val)}/>
                    <Text style={errMessage!==null?{color: 'red', margin: 10}:null}>{errMessage}</Text>
                <TouchableOpacity style={styles.button} onPress={login}><Text style={{color: '#f5ccff'}} >LOGIN</Text></TouchableOpacity>
                    <Text style={{color: 'blue', margin: 10}}>Doesn't Have an Account?</Text>
                    <TouchableOpacity style={styles.button} onPress={()=> navigation.push("Register")}><Text style={{color: '#f5ccff'}}>REGISTER</Text></TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </View>
    </ImageBackground>
    );
}

const Register = ({ navigation }) =>{
    const [fname, setfName] = useState(null);
    const [lname, setlName] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setuser] = useState(null);
    const [pass, setPass] = useState(null);
    const [rpass, setRPass] = useState(null);
    const [color, setColor] = useState("red");
    const [errMessage, setErrMessage] = useState(null);
    const [reg,setRegister] = useState(false);
    React.useEffect(()=>{

    }, [])
    const Register = () =>{
       new Promise(()=>{
        setErrMessage(null);
        setColor("red");
        if(fname===null || fname===''){
            setErrMessage("Enter your First Name!");
            return false;
        }
        if(lname===null || lname===''){
            setErrMessage("Enter your Last Name!");
            return false;
        }
        if(user===null || user===''){
            setErrMessage("Enter your UserName!");
            return false;
        }
        if(email===null || email===''){
            setErrMessage("Enter your Email!");
            return false;
        }else{
            let reemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]$/;
            if(!reemail.test(email)){
                setErrMessage("Enter a valid Email!");
                return false
            }
        }
        if(pass===null || pass===''){
            setErrMessage("Enter your Password!");
            return false;
        }
        if(rpass===null || rpass===''){
            setErrMessage("Enter repeat password!");
            return false;
        }
        let re = /[A-Z]/;
        let re2 = /[a-z]/;
        let re3 = /[!@#$%^&*\(\)_+\}\{\":?><|~\.\-]/;
        let re4 = /[0-9]/;
       
        if(pass.length<8){
            setErrMessage("Password should be 8 characters and higher");
            return false;
        }
        if(!re.test(pass)){
            setErrMessage("Password should contain capital letters");
            return false;
        }
        if(!re2.test(pass)){
            setErrMessage("Password should contain small letters");
            return false;
        }
        if(!re3.test(pass)){
            setErrMessage("Password should contain special characters Ex: [!,@,#,$,...]");
            return false;
        }
        if(!re4.test(pass)){
            setErrMessage("Password should contain numbers");
            return false;
        }
        if(pass!==rpass){
            setErrMessage("Passwords didn't match");
            return false;
        }
        
        setRegister(true);
        checkAccountIfExist({user: user, pass: pass}).then((d)=>{
            if((!d[0]) && d[1]==="User didn't Exist"){ 
                RegisterAccount({fname: fname, lname:lname, email: email, user: user, pass: pass}).then((d)=>{
                    setRegister(false);
                    if(d){
                        setColor("green");
                        setErrMessage("Account Registered");
                    }
                });
             }else{
                setRegister(false);
                setErrMessage("Account already Exist!");
             }
        }).catch((error) => {
            console.log(error);
          });
       
       })
    }

    return(
        <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover",
        justifyContent: "center"}}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.topPosition}>
                    <Text style={styles.text}>Register</Text>
                    <TextInput placeholder="Input First Name" style={styles.inputtext} onChangeText={(val) =>setfName(val)}/>
                    <TextInput placeholder="Input Last Name" style={styles.inputtext} onChangeText={(val) =>setlName(val)}/>
                    <TextInput placeholder="Input Email" style={styles.inputtext} onChangeText={(val) =>setEmail(val)}/>
                    <TextInput placeholder="Input Username" style={styles.inputtext} onChangeText={(val) =>setuser(val)}/>
                    <TextInput secureTextEntry={true} placeholder="Input Password"  style={styles.inputtext} onChangeText={(val) =>setPass(val)}/>
                    <TextInput secureTextEntry={true} placeholder="Repeat Password"  style={styles.inputtext} onChangeText={(val) =>setRPass(val)}/>
                    <Text style={errMessage!==null?{color: color, margin: 10}:null}>{errMessage}</Text>
                    {!reg?<TouchableOpacity style={styles.button} onPress={Register}><Text style={{color: '#f5ccff'}} >Register</Text></TouchableOpacity>:undefined}
                    <Text style={{color: 'blue', margin: 10}}>Already Have an Account?</Text>
                    <TouchableOpacity style={styles.button} onPress={()=> navigation.goBack()}><Text style={{color: '#f5ccff'}}>Login</Text></TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </View>
            </ScrollView>
    </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    topPosition:{
        position: 'relative',
        top: 0,
        width: '100%'
    },  
    text:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#bf6b63'
    },  
    inputtext: {
        borderColor: 'white',
        color: 'white',
        borderWidth: 3,
        borderRadius: 3,
        width: '100%',
        padding: 8,
        margin: 4,
    },
    button: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "#f5ccff",
        width: '100%',
        padding: 3,
        margin: 4,
        alignItems: 'center',
    
    }
  });
  
export {Login, Register};