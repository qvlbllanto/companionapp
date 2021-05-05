import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView,   Platform,
             ScrollView, View, ImageBackground, Button, Image } from 'react-native';
import normalize from 'react-native-normalize';
import { useState } from 'react/cjs/react.development';
import SyncStorage from 'sync-storage';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage, deletePROFPIC, checkAccountIfExist2, updateAccount} from "./functions.js"
const Account = () =>{
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [fname, setFname] = useState(null);
    const [lname, setlname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rp, setRP] = useState(null);
    const [count, setCount] = useState(0);
    const [account, setAccount] = useState({});
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  React.useEffect(()=>{
    const timer = setTimeout(() => {
        checkAccountIfExist2(SyncStorage.get("login").user, SyncStorage.get("login").pass).then((d)=>{
           let x = count;
           x+=0.00000001;
           setCount(x);
            if(d[0]){
                setAccount(d[1]);
            }else{
                route.params.variable({l: false});
                SyncStorage.set("login", {user: null, loggedin: false}).then(()=>{
                 navigation.navigate("Login");
                });
            }
        }).catch((error) => {
            console.log(error);
          });
      }, 600);
      return () => clearTimeout(timer);
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const update = () =>{
       updateAccountValue().then((d)=>{
            if(d[0]){
                updateAccount(SyncStorage.get("login").user, d[1]).then(()=>{
                    setUploading(false);
                    setImage({});
                    setFname(null);
                    setlname(null);
                    setEmail(null);
                    setPassword(null);
                    setRP(null);
                    alert("Updated");
                })
              }else{
                    alert(d[1])
                    setUploading(false);
              }
      }).catch((e)=>{
          console.log(e);
      })
  }

  const updateAccountValue = () =>{
      return new Promise((resolve, reject)=>{
        setUploading(true);
        let reemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]$/;
        let accounts = {
            fname: fname!==null && fname!==''?fname:account.fname,
            lname: lname!==null && lname!==''?lname:account.lname,
            email: account.email,
            pass: account.pass,
        }
        let ch = true;
        let str = "";
        if(account.image!==undefined){
            accounts.image= account.image;
        }
        if(email!==null && email!==''){
            if(!reemail.test(email)){
                str+="Enter a valid Email!\n";
                ch=false;
            }else{
                accounts.email = email;
            }
        }

        if(password!==null && password!==''){
            let re = /[A-Z]/;
            let re2 = /[a-z]/;
            let re3 = /[!@#$%^&*\(\)_+\}\{\":?><|~\.\-]/;
            let re4 = /[0-9]/;
            
            if(password.length<8){
                str+="Password should be 8 characters and higher\n";
                ch=false;
            }
            if(!re.test(password)){
                str+="Password should contain capital letters\n";
                ch=false;
            }
            if(!re2.test(password)){
                str+="Password should contain small letters\n";
                ch=false;
            }
            if(!re3.test(password)){
                str+="Password should contain special characters Ex: [!,@,#,$,...]\n";
                ch=false;
            }
            if(!re4.test(password)){
                str+="Password should contain numbers\n";
                ch=false;
            }
            console.log(password, rp);
            if(password!==rp){
                str+="Password and repeat password didn't match\n";
                ch=false;
            }else{
                accounts.password = password;
            }
        }
        if(ch){
            if(JSON.stringify(image) !== "{}"){
                let arr = image.uri.split("/");
                let getname = arr[arr.length-1];
                deletePROFPIC(SyncStorage.get("login").user).then((d)=>{
                    if(d){
                        uploadImage(image.uri, getname, SyncStorage.get("login").user).then((x)=>{
                                accounts.image = x;
                                resolve([true,accounts]);
                        }).catch((e)=>{
                            accounts.image = account.image!==undefined?account.image:null;
                            resolve([true,accounts]);
                        })
                    }
                })
            }else{
                resolve([true,accounts])
            }
        }else{
            resolve([ch, str])
        }
      });
    
      
  }
  const [change, setChange] = useState(false);
    return(
    <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
        {!change?
         <SafeAreaView style={styles.container}>
         <Image style={styles.header} source={account.image===undefined?JSON.stringify(image)==="{}"?{uri: './assets/icon.png'}:{uri: image.uri}:JSON.stringify(image)==="{}"?{uri: account.image}:{uri: image.uri}}/>
         <Button title="Select Image" color="#410F57" onPress={()=>pickImage()}/>
         <View style={{marginTop: 10}}>
         <Button title="View Profile" color="#410F57" onPress={()=>setChange(true)}/>
         </View>
         {uploading?<Text style={{margin: 10, fontSize: 13, color: 'black'}}>Updating...</Text>:null}
         <ScrollView style={styles.scrollView}>
         <Text style={{marginLeft: normalize(7)}}>First name: </Text>
         <TextInput placeholder={account.fname} style={styles.inputtext} onChangeText={(v) => setFname(v)}/>
         <Text style={{marginLeft: normalize(7)}}>Last name: </Text>
         <TextInput placeholder={account.lname} style={styles.inputtext}  onChangeText={(v) => setlname(v)}/>
         <Text style={{marginLeft: normalize(7)}}>Username: </Text>
         <Text style={styles.inputtext} >{account.user}</Text>
         <Text style={{marginLeft: normalize(7)}}>Email: </Text>
         <TextInput placeholder={account.email} style={styles.inputtext} onChangeText={(v) => setEmail(v)}/>
         <Text style={{marginLeft: normalize(7)}}>Password: </Text>
         <TextInput placeholder="********" style={styles.inputtext} onChangeText={(v)=>setPassword(v)}/>
         {password!==null && password!==''?<View><Text style={{marginLeft: normalize(7)}} >Repeat Password: </Text>
         <TextInput placeholder="********" style={styles.inputtext} onChangeText={(v)=>setRP(v)}/></View>:null}
         {(fname===null || fname==='') && (lname === null || lname==='') && (password === null || password==='') && (email === null || email==='') && JSON.stringify(image)==='{}'?null:<TouchableOpacity style={styles.button} onPress={update}><Text>Update Account</Text></TouchableOpacity>}
         </ScrollView>
     </SafeAreaView>:
     <Profile set={setChange} name={account.fname +" "+account.lname} img={account.image===undefined?{uri: './assets/icon.png'}:{uri: account.image}}/>}
       
    </ImageBackground>)

}


const Profile = (props) =>{
    return(
            <SafeAreaView style={styles2.container}>
                <ScrollView style={styles2.scrollView}>
                    <View style={styles2.header}>
                        <Text style={{fontSize:30,
                            fontWeight: 'bold',
                            color: 'purple'}}>Your Profile</Text>
                         <TouchableOpacity style={styles2.buttonSt2}><Text style={{textAlign: 'center', color: 'white'}} onPress={()=>props.set(false)}>Back</Text></TouchableOpacity>   
                    </View>
                    <View style={styles2.rows2}>
                    <View style={styles2.left2}>
                            <Image source={props.img} style={{width: '100%', height: '100%',  borderRadius: 70}} />
                     </View>
                     <View style={styles2.right2}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Name: <Text style={{fontWeight:'normal'}}>{props.name}</Text></Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Age: <Text style={{fontWeight:'normal'}}>21</Text></Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Gender: <Text style={{fontWeight:'normal'}}>Male</Text></Text>
                        
                    </View>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mental Illness:</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Depression</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Symptoms:</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Panic Attacks</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Muscle Twitching</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Increased</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Fatigue:</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Insomnia</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Treatments:</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Antidepressant</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Light Theraphy</Text>
                    <Text style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>Exercise</Text>
                </ScrollView>
            </SafeAreaView>
            )
    
}
const styles2 = StyleSheet.create({
    left:{
        position: 'absolute',
        left: 0,
        width: '50%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'black'
    },
    left2:{
        position: 'absolute',
        left: 0,
        width: '45%',
        height: '92%',

    },
    right2:{
        position: 'absolute',
        right: 15,
        width: '50%',
        height: 'auto',
    },
    right:{
        position: 'absolute',
        right: 0,
        width: '50%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'black'
        
    },
    rows:{
        padding: 10,
        height: normalize(200, 'height'),
        width: '100%',
    },
    rows2:{
        padding: 10,
        height: normalize(160, 'height'),
        width: '100%',
    },
    header:{
        position: 'relative',
        top: 0,
        width: '100%',
        height: 'auto',
        padding: normalize(20, 'height'),
        marginBottom: normalize(20),
    },
    scrollView: {
        backgroundColor: 'transparent',
        marginBottom: 20,
        width: '100%',
      },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
    },
    buttonSt:{
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#410F57',
        margin: 3,
        padding: 2,
        backgroundColor: '#583d72',
    },
    buttonSt2:{
        width:95,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#410F57',
        margin: 3,
        padding: 8,
        backgroundColor: '#583d72',
    }
})

const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: 'transparent',
        marginBottom: 20,
        width: '100%',
      },
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
        borderColor: 'black',
        color: 'white',
        borderWidth: 3,
        borderRadius: 6,
        width: '98%',
        padding: 8,
        margin: 4,
    },
    button: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "black",
        backgroundColor: '#f5ccff',
        width: '98%',
        padding: 5,
        margin: 4,
        alignItems: 'center',
    
    }, header:{
        backgroundColor: 'white',
        width: '50%',
        height: normalize(114, 'height'),
        alignSelf: 'center',
        padding: 20,
        marginBottom: normalize(20, 'height'),
        borderRadius: 50
      },
  });
  
export default Account;