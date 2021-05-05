import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView,   Platform,
    ScrollView, View, ImageBackground, Button, Image } from 'react-native';
import normalize from 'react-native-normalize';
import { useState } from 'react/cjs/react.development';
import SyncStorage from 'sync-storage';

const dogsDesc = [{
                    name: "Stephen",
                    age: "9 months old",
                    gender: "Male",
                    breed: "German Shepherd",
                    trainor: "Shinchi Mia",
                    description: "German Shepherd are intelligent, trainable, gentle, and loyal dogs that perform the tasks they have been assigned flawlessly. Shepherd's can assist people who are visually impaired, have impaired hearing, and need theraphy dogs that can help out with particular tasks",
                    characteristics: ["Good guard dog", "Good temperament", "Intelligent", "Trained"],
                    image: require('./assets/stephen.png')
                }
                ,
                {
                    name: "Lexi",
                    age: "10 months old",
                    gender: "Female",
                    breed: "Labrador",
                    trainor: "Brett",
                    description: "Labradors are intelligent, trainable, gentle, and loyal dogs that perform the tasks they have been assigned flawlessly. Labrador can assist people who are visually impaired, have impaired hearing, and need theraphy dogs that can help out with particular tasks",
                    characteristics: ["Good medic dog", "Good temperament", "Intelligent", "Trained"],
                    image: require('./assets/Lexi.png')
                }
                ,
                {
                    name: "Pickles",
                    age: "8 months old",
                    gender: "Male",
                    breed: "Shar Pei",
                    trainor: "Brett",
                    description: "Shar Pei are intelligent, trainable, gentle, and loyal dogs that perform the tasks they have been assigned flawlessly. Shar Pei can assist people who are visually impaired, have impaired hearing, and need theraphy dogs that can help out with particular tasks",
                    characteristics: ["Good medic dog", "Good temperament", "Intelligent", "Trained"],
                    image: require('./assets/doggydog.jpg')  
                }
                ]

const Dogs = ({navigation, route}) =>{
    const temp = [0,0];
    React.useEffect(()=>{
        route.params.variable(false, false);
    }, []);
    const [toDetails, settoDetails] = useState(false);
    const [value, setValue] = useState({});
    return( 
        
        <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
            
            {!toDetails?
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={{fontSize:30,
        fontWeight: 'bold',
        color: 'purple'}}>Your Dog Assistant</Text>
                    </View>
                    {dogsDesc.slice(0, Math.round(dogsDesc.length/2)).map((d, i)=>
                    <View style={styles.rows} key={i}>
                        {dogsDesc.slice(i*2, (i*2)+2).map((d2, i2)=>
                        i2%2===0?
                        <View style={styles.left} key={i2}>
                            <Image source={d2.image} style={{width: '100%', height: '65%',  borderRadius: 10}} />
                            <TouchableOpacity style={styles.buttonSt}><Text style={{textAlign: 'center', color: 'white'}} onPress={()=>{setValue(d2); settoDetails(true)}}>Details</Text></TouchableOpacity>
                             <TouchableOpacity style={styles.buttonSt}><Text style={{textAlign: 'center', color: 'white'}}>Pick</Text></TouchableOpacity>
                        </View>:
                        <View style={styles.right} key={i2}>
                        <Image source={d2.image} style={{width: '100%', height: '65%',  borderRadius: 10,}} />
                            <TouchableOpacity style={styles.buttonSt}><Text style={{textAlign: 'center', color: 'white'}} onPress={()=>{setValue(d2); settoDetails(true)}}>Details</Text></TouchableOpacity>
                             <TouchableOpacity style={styles.buttonSt}><Text style={{textAlign: 'center', color: 'white'}}>Pick</Text></TouchableOpacity>

                        </View>)
                        }
                    
                    
                </View>
                    )}
                    
                </ScrollView>
            </SafeAreaView>
              :<DogsDetails set = {settoDetails} value={value}/>}
        </ImageBackground>
      
    );
}



const DogsDetails = (props) =>{
    return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={{fontSize:30,
                            fontWeight: 'bold',
                            color: 'purple'}}>Your Dog Assistant</Text>
                         <TouchableOpacity style={styles.buttonSt2}><Text style={{textAlign: 'center', color: 'white'}} onPress={()=>props.set(false)}>Back</Text></TouchableOpacity>   
                    </View>
                    <View style={styles.rows2}>
                    <View style={styles.left2}>
                            <Image source={props.value.image} style={{width: '100%', height: '100%',  borderRadius: 70}} />
                     </View>
                     <View style={styles.right2}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Name: <Text style={{fontWeight:'normal'}}>{props.value.name}</Text></Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Age: <Text style={{fontWeight:'normal'}}>{props.value.age}</Text></Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Gender: <Text style={{fontWeight:'normal'}}>{props.value.gender}</Text></Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Breed: <Text style={{fontWeight:'normal'}}>{props.value.breed}</Text></Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Patient: <Text style={{fontWeight:'normal'}}>{props.value.patient}</Text></Text>
                    </View>
                    </View>
                    <Text style={{fontSize: 15, marginBottom: 15}}>{props.value.description.replace("\n", "")}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Characteristics:</Text>
                    {props.value.characteristics.map((d, i)=><Text key={i} style={{width:'100%'}}><Text style={{margin: 10}}>• </Text>{d}</Text>)}
                </ScrollView>
            </SafeAreaView>
            )
    
}
const styles = StyleSheet.create({
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
        height: normalize(192, 'height'),
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

export {Dogs, DogsDetails};