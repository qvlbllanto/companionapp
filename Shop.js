import React from 'react';
import {TouchableOpacity, TextInput, Image, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, ImageBackground, Button } from 'react-native';
import normalize from 'react-native-normalize';
import { useState } from 'react/cjs/react.development';
import SyncStorage from 'sync-storage';
import {getCartData,addToCart, updateCartData} from "./functions.js";
const items = [{name: "Pedigree 5 Kinds Of Meat 400g",
                desc: "A Delicious meal for your companion",
                price: 89,
                img: require("./assets/shop/dogfood89php.png")
                },
                {name: "Vitality Valuemeal Puppy Small Bite",
                desc: "Perfect Meal for Pups",
                price: 169,
                img: require("./assets/shop/dogfood169php.png")
                },
                {name: "Pet One Beef Teriyaki 8kg",
                desc: "A meaty snack",
                price: 549,
                img: require("./assets/shop/dogfood549php.png")
                },
                {name: "Organic Dog Shampoo",
                desc: "Maintain that fluffy coat",
                price: 529,
                img: require("./assets/shop/shampoo529php.png")
                },
                {name: "Dog Coat Conditioner",
                desc: "For a Healthy and Strong Coat",
                price: 429,
                img: require("./assets/shop/conditioner429php.png")
                },
                {name: "Pedigree Meat Jerky Grilled Liver 80g",
                desc: "DELICIOUS",
                price: 79,
                img: require("./assets/shop/treat79php.png")
                },
                {name: "Happi Doggy Mint 150g",
                desc: "Keep Your companion fresh",
                price: 279,
                img: require("./assets/shop/treat279php.png")
                },
                {name: "Sleeky Chewy Stick Liver Flavored 50g",
                desc: "A treat for your Companion",
                price: 89,
                img: require("./assets/shop/treat89php.png")
                },
                {name: "Happy Pets Vitamin C Pet-C 60mL",
                desc: "To keep your babies healthy",
                price: 169,
                img: require("./assets/shop/vitamins169php.png")
                },
                {name: "NutraTech Livotine Syrup 60mL",
                desc: "Liver Tonic and Renal Enhancer",
                price: 199,
                img: require("./assets/shop/vitamins199php.png")
                },];
const Shop = () =>{
    return(<ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerShopText}>SHOP</Text>
                    </View>
                    <ScrollView style={styles.scrollView} >
                        {items.map((d, i)=><View style={styles.rows} key={i}>
                        <Image source={d.img} style={styles.img} />
                    <View style={{width: '100%'}}>
                        <Text style={styles.headerText}>{d.name}</Text>
                        <Text style={{marginBottom: 3}}>Php{d.price}</Text>
                        <Text style={{marginBottom: 3, overflow: 'hidden'}}>{d.desc}</Text>
                        <TouchableOpacity style={styles.buybutton} onPress={()=>{addToCart(SyncStorage.get("login").user, d).then((d)=>{d?alert("Added to cart"):null})}}><Text style={{color: 'white', textAlign: 'center'}}>Add To Cart</Text></TouchableOpacity>
                    </View>
                </View>)}
            </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}
const Cart = () =>{
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [total, settotal] = useState(0);
  React.useEffect(()=>{
    const timer = setTimeout(() => {
      let x = count;
      x+=0.000001;
      setCount(x);
      getCartData(SyncStorage.get("login").user, setCart);
      let total = 0;
      for(let o of cart){
        total+=o[1].price*o[1].amt;
      }
      settotal(Number(total).toFixed(2));
      }, 600);
      return () => clearTimeout(timer);
  })

  const arrayRemove = (arr, value) => { 
    return arr.filter(function(ele, i){ 
        return i !== value; 
    });
}

  const update = (index, add) =>{
      let x = add!=="buyall"?cart:[];
      if(add === "add"){
        x[index][1].amt += 1;
      }else if(add==="minus"){
        x[index][1].amt -= 1;
      }else{
        x = arrayRemove(x, index);
      }
      let data = {};
      for(let i of x){
          data[i[0]] = i[1];
      }
       updateCartData(SyncStorage.get("login").user, data, setCart, x);

  }

  return(<ImageBackground source={require('./bgdefault2.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
              <SafeAreaView style={styles.container}>
                  <View style={styles.header}>
                      <Text style={styles.headerShopText}>Cart</Text>
                      <TouchableOpacity style={styles.buybutton2} onPress={()=>update(0, "buyall")}><Text style={{color: 'white', textAlign: 'center'}}>Buy now</Text></TouchableOpacity>
                      <Text style={{fontWeight: 'bold', fontSize: 14}}>Total price: Php{total}</Text>
                  </View>
                  <ScrollView style={styles.scrollView} >
                      {cart.map((d, i)=><View style={styles.rows} key={i}>
                      <Image source={d[1].img} style={styles.img} />
                  <View style={{width: '100%'}}>
                      <Text style={styles.headerText}>{d[1].name}</Text>
                      <Text style={{marginBottom: 3}}>Php{d[1].price}</Text>
                      <Text style={{marginBottom: 3, overflow: 'hidden'}}>{d[1].desc}</Text>
                      <View style={{width: 'auto', backgroundColor: 'white', borderColor: 'black', borderWidth: 1, borderRadius: 5, margin: 3, padding: 2, marginRight: '70%' }}><Text style={{textAlign: 'center'}}>{d[1].amt}</Text></View>
                      <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={styles.buybutton2} onPress={()=>{update(i, "add")}}><Text style={{color: 'white', textAlign: 'center'}}>+</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.buybutton2} onPress={()=>{d[1].amt>1?update(i, "minus"):null}}><Text style={{color: 'white', textAlign: 'center'}}>-</Text></TouchableOpacity>
                      
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{update(i, "Delete")}}><Image source={require('./assets/delete.png')}/></TouchableOpacity>
                      <Text>Delete</Text>
                      </View>
                  </View>
              </View>)}
          </ScrollView>
          </SafeAreaView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
    img:{
        width:'50%', height: '100%', marginRight: 7, alignSelf: 'center'
    },
    buybutton:{
        borderRadius: 3,
        backgroundColor: '#583d72',
        padding: 5,
        width: '50%'
    },
    buybutton2:{
      borderRadius: 3,
      backgroundColor: '#583d72',
      padding: 5,
      width: '35%',
      margin: 4
  },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
      scrollView: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginBottom: 20,
      },
      header:{
        width: '90%',
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        marginBottom: 20,
      },
      headerText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'purple',
        marginRight: 10,
      },
      headerShopText:{
        fontSize: 40,
        fontWeight: 'bold',
        color:'black'
      },
      rows:{
        backgroundColor: 'white',
        height: 'auto',
        margin: normalize(4, 'width'),
        borderRadius: 5,
        flexDirection: 'row',
        width:'99%',
        borderRadius: 7, 
        borderWidth: 2,
        borderColor: '#583d72',
        padding:12,
        paddingRight: 100, 
        flexDirection: 'row'
      },
      itemPrice:{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          width: '98%',
          height: normalize(30, 'height'),
          borderWidth: 2,
          alignSelf: 'center',
          borderRadius: 3
      }
})

export {Shop, Cart};