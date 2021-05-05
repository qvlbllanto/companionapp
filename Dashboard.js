import {TouchableOpacity, TextInput, Image, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, ImageBackground, Button } from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
const Dashboard = ({navigation, route}) =>{
    React.useEffect(()=>{
        route.params.variable(false, false);
    }, [])
    return(
        <ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
             <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.quote}>{'"The greatest glory in living lies not \nin never falling, but in rising every \ntime we fall." - Nelson Mandela'}</Text>
                        <View style={{marginTop: 30}}>
                            <View style={styles.container2}>
                                <View style={styles.topContainer}>
                                    <Image style={styles.bgimg}/>
                                    <Text style={styles.title}>Plan For the Day</Text>
                                </View>
                               
                               <Text>Exercise</Text>
                               <Text>Bath</Text>
                               
                               <Text>Attend Class</Text>
                               <Text>Lunch</Text>
                               
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.topContainer}>
                                    <Image style={styles.bgimg}/>
                                    <Text style={styles.title}>Take this everyday</Text>
                                </View>
                                <Text>Vitamins</Text>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.topContainer}>
                                    <Image style={styles.bgimg}/>
                                    <Text style={styles.title}>Stay in touch</Text>
                                </View>
                                <Text>Update the doctor</Text>
                            </View>
                            <View style={styles.container2}>
                                <View style={styles.topContainer}>
                                    <Image style={styles.bgimg}/>
                                    <Text style={styles.title}>Duty for the doggo</Text>
                                </View>
                                <Text>Feed the Dog</Text>
                                <Text>Walk the dog</Text>
                               <Text>Play with dog</Text>
                            </View>
                        </View>
                </ScrollView>
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
      quote: {
        color: '#84126d',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
      },
      container2: {
        backgroundColor: 'white',
        width: '100%',
        height: normalize(130, 'height'),
        marginBottom: 14,
        padding: 10,
        borderRadius: 7
      },
      title:{
        position: 'absolute', 
        left: normalize(30), 
        top: normalize(3), 
        textDecorationLine: 'underline', 
        fontSize: normalize(14), 
        color: '#441043' 
      },
      bgimg:{
        width: normalize(16),
        height: normalize(16),
        backgroundColor: 'white'
      },
      topContainer: {
        backgroundColor: '#fc9fca', 
        width: '100%', 
        height: normalize(25, 'height'), 
        padding: 6
      }
})
export default Dashboard;