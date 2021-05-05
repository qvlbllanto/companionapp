import React from 'react';
import {TouchableOpacity, TextInput, StyleSheet, Text, SafeAreaView,   Platform,
    ScrollView, View, ImageBackground, Button, Image } from 'react-native';
import normalize from 'react-native-normalize';
import { useState } from 'react/cjs/react.development';
import SyncStorage from 'sync-storage';

const Services = () =>{
    return(<ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover"}} >
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.body}>
            <Text style={styles.headText}>HOSPITALS AT YOUR SERVICE</Text>
            <Text>THESE ARE THE HOSPITALS THAT YOU CAN CALL 24/7</Text>
        </View>
        <View style={styles.bodyForRow}>
            
            <Image source={require("./assets/hosp2.png")} style={styles.img}/>
            <View style={{width: '45%', marginLeft: 10}}>
                <Text style ={styles.bigText}>St. Luke's Hospital</Text>
                <Text>Address: 2nd Floor, Institute of Neurosciences, Main Building
Rizal Drive cor. 32nd St. and 5th Ave

Taguig City, Philippines </Text>
                <Text>Phone: 8-789-7700</Text>
            </View>
        </View>
        <View style={styles.bodyForRow}>
            <View style={{width: '45%', marginRight: 10}}>
            <Text style ={styles.bigText}>National Center for Mental Health</Text>
            <Text>Address: Nueve de Pebrero St., Mauway, Mandaluyong, Metro Manila </Text>
            <Text>Phone: (02) 8531 9001</Text>
            </View>
            <Image source={require("./assets/hosp3.png")} style={styles.img}/>
        </View>
        <View style={styles.bodyForRow}>
            
            <Image source={require("./assets/hosp1.png")} style={styles.img}/>
            <View style={{width: '45%', marginLeft: 10}}>
                <Text style ={styles.bigText}>Life Change Recovery Center</Text>
                <Text>Address: 105 Scout Rallos St,. Kamuning, Barangay Sacred Heart, Quezon City </Text>
                <Text>Cellphone: 0917 520 3509 / 0922 877 5972</Text>
                <Text>Telephone: 3415-79-64 / 8921-35-97</Text>
            </View>
        </View>

        <View style={{borderTopWidth: 2, height: 10, width: '100%', borderColor: 'black', marginTop: 20, marginBottom: 20}}>
            </View>
        <View style={styles.body}>
            <Text style={styles.headTextCenter}>VETERINARY CLINICS AT YOUR SERVICE</Text>
            <Text>TAKE CARE OF YOUR DOGS TOO!</Text>
        </View>

        <View style={styles.bodyForRow}>
         <Image source={require("./assets/hosp4.png")} style={styles.img}/>
             <View style={{width: '45%', marginLeft: 10}}>
            <Text style ={styles.bigText}>Pendragon Veterinary Clinic</Text>
                <Text>Address: G/F 107-A Kalayaan Avenue Diliman 1101 Quezon City, Philippines </Text>
                <Text>Contact Number: 285529868</Text>
             </View>
        </View>
        <View style={styles.bodyForRow}>
            <View style={{width: '45%', marginLeft: 10}}>
             <Text style ={styles.bigText}>ManilaVets Animal Clinic</Text>
                <Text>Address: 683 Manga Avenue 1008 Manila, Philippines </Text>
                <Text>Contact Number: 0915 194 2009</Text>
            </View>
            <Image source={require("./assets/hosp5.png")} style={styles.img}/>
        </View>
        <View style={styles.bodyForRow}>
        <Image source={require("./assets/hosp6.png")} style={styles.img}/>
        <View style={{width: '45%', marginLeft: 10}}>
            <Text style ={styles.bigText}>CuraPet Animal Clinic</Text>
                <Text>Address: 2543 Tejeron ( boundary of makati and manila ) 1009 Manila, Philippines </Text>
                <Text>Contact Number: (02) 253 1668</Text>
        </View>
        </View>
        <View style={{borderTopWidth: 2, height: 10, width: '100%', borderColor: 'black', marginTop: 20, marginBottom: 20}}></View>
        <View style={styles.body}>
            <Text style={styles.headTextCenter}>DOG GROOMING</Text>
            <Text>KEEPING YOUR DOGS CLEAN AND TIDY</Text>
        </View>

        <View style={styles.bodyForRow}>
        <Image source={require("./assets/pshop2.png")} style={styles.imgMax}/>
        </View>
        <View style={{width: '100%', marginLeft: 10}}>
            <Text style ={styles.bigText}>Barking Bubbles Pet Supplies and Grooming Center</Text>
                <Text>Address: Don Celso Tuazon Ave. Valley Golf Road, Brgy. San Juan, Cainta, Rizal 1920 Cainta, Philippines </Text>
                <Text>Contact Number: 0917 503 5318</Text>
        </View>
        <View style={styles.bodyForRow}>
        <View style={{width: '45%', marginLeft: 10}}>
            <Text style ={styles.bigText}>Pet Express</Text>
                <Text>Address: Building A SM Megamall, EDSA Corner Dona Julia Vargas Avenue, Ortigas Center, Mandaluyong, 1550 Metro Manila </Text>
                <Text>Contact Number: (02) 8650 4693</Text>
        </View>
        <Image source={require("./assets/pshop.png")} style={styles.img}/>
        </View>

        <View style={styles.bodyForRow}>
        <Image source={require("./assets/pshop3.png")} style={styles.img}/>
        <View style={{width: '45%', marginLeft: 10}}>
            <Text style ={styles.bigText}>Scrub A Dub A Dog</Text>
                <Text>Address: 172 Justice Ramon Jabson Street, Bambang, Pasig City 1607 Pasig, Philippines </Text>
                <Text>Contact Number: 0956 719 6414</Text>
        </View>
        </View>
        
        
       
        
 </ScrollView>
 </View>
    </ImageBackground>)
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    body: {
        position: 'relative',
        top: 0,
        marginBottom: 18
    },
    headText:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'purple'
    },
    headTextCenter:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'purple',
        textAlign: 'center'
    },
    bigText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    bodyForRow:{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        height: 200,
        width: '100%'
    },
    img:{
        width:'50%', 
        height: '100%', 
        marginRight: 7, 
        alignSelf: 'center',
        borderRadius: 9
    },
    imgR:{
        width:'50%', 
        height: '100%', 
        marginLeft: 7, 
        alignSelf: 'center',
        borderRadius: 9,
        position:'relative'
    },
    imgMax: {
        width: '100%',
        height: 220,
        borderRadius: 9,
        marginBottom: 10
    }
})
export default Services;