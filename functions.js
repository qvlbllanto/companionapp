import { data, storage } from "./firebase/index.js"

const RegisterAccount = (vals) =>{
    return new Promise((resolve, reject)=>{
        try{
        data.ref("accounts").push(vals).then(()=>{resolve(true)});
        }catch(e){
            reject(Error("NO INTERNET"))
        }
    });
}
const checkAccountIfExist = (val) =>{
    return new Promise((resolve, reject)=>{
        try{
        data.ref("accounts").orderByChild('user').equalTo(val.user).once('value', (snapshot)=>{
            if(snapshot.val()===null){
                resolve([false, "User didn't Exist"]);
            }else{
                snapshot.forEach((snap)=>{
                    if(snap.val().pass===val.pass){
                        resolve([true, snap.key]);
                    }
                });
                resolve([false, "Wrong Password!"]);
            }
        })
        }catch(e){
            reject(Error("Error!"));
        }
    })
}
const checkAccountIfExist2 = (val, pass) =>{
    return new Promise((resolve, reject)=>{
        try{
        data.ref("accounts").orderByKey().equalTo(val).once('value', (snapshot)=>{
            if(snapshot.val()===null){
                resolve([false, null]);
            }else{
                snapshot.forEach((snap)=>{
                    if(snap.val().pass===pass){
                        resolve([true, snap.val()]);
                    }
                });
                resolve([false,null]);
            }
        })
        }catch(e){
            reject(Error("ERROR!"));
        }
    })
}

const getChatOpen = (u1,u2, v) =>{
    return new Promise((resolve, reject)=>{
        try{
            if(v===''){
            data.ref("chat").orderByKey().equalTo(u1+u2).once('value', (snapshot)=>{
                if(snapshot.val()!==null){
                    resolve(u1+u2);
                }else{
                    data.ref("chat").orderByKey().equalTo(u2+u1).once('value', (snapshot)=>{
                        if(snapshot.val()!==null){
                        resolve(u2+u1);
                        }else{
                            data.ref("chat").child(u1+u2).set({to: u1, to2: u2}).then(()=>{
                                resolve(u1+u2);
                            })
                        }
                    });
                }
            });
        
            }else{
                resolve(v);
            }
        }catch(e){
            reject(Error("ERROR"));
        }
    })
}

const getChat = (v, num) =>{
    return new Promise((resolve, reject)=>{
        try{
            data.ref("chat").child(v).child('message').limitToLast(num).once('value', (snapshot)=>{
                if(snapshot.val()===null){
                    resolve([])
                }else{
                    resolve(snapshot.val());
                }
            })
        }catch(e){
            reject(Error("ERROR"))
        }
    })
}
const sendChat = (v,message,from) =>{
    return new Promise((resolve, reject)=>{
        try{
            data.ref("chat").child(v).child('message').push({message: message, date: new Date().toString(), who: from}).then(()=>{
                resolve(true);
            });
        }catch(e){
            reject(Error("ERROR"));
        }
    });
}

const getAccounts  = () =>{
    return new Promise((resolve, reject)=>{
        try{
            data.ref("accounts").once('value', (snapshot)=>{
            resolve(snapshot.val())
            })
        }catch(e){
            reject(Error("ERROR"));
        }
    })
}

const uploadImage = async(uri, imgname, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();  
    return new Promise((resolve, reject)=>{
        storage.ref("profileIMG").child(id).child(imgname).put(blob).on(
            "state_changed",
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
              storage
              .ref(`profileIMG/${id}`)
              .child(imgname)
              .getDownloadURL()
              .then(url => {
                  resolve(url);
              });
            }
        )
    });
  }

  const deletePROFPIC = (id) =>{
    return new Promise(function (resolve, reject) {
            let ref = storage.ref(`profileIMG/${id}`);
            
            ref.listAll().then(dir => {
            dir.items.forEach(fileRef => {
                var dirRef = storage.ref(fileRef.fullPath);
                dirRef.getDownloadURL().then(function(url) {
                var imgRef = storage.refFromURL(url);
                imgRef.delete().then(function() {
                    resolve(true);
                }).catch(function(error) {  
                    console.log(error);
                    resolve(true);  
                });
                });
            });
            }).catch(error => {
                console.log(error);
                resolve(true);
            });
            resolve(true);
    });
}

const updateAccount = (id, val) =>{
    return new Promise((resolve, reject)=>{
        data.ref("accounts").child(id).update(val).then((v)=>{
            resolve(true);
        })
    })
}

const addToCart = (id, set) =>{
    return new Promise((resolve, reject)=>{
        set["amt"] = 1;
        data.ref("cart").child(id).push(set).then((d)=>{
            resolve(true);
        })
    })
}
const getCartData = async (id, setCart) =>{
    await data.ref("cart").child(id).once('value', (snapshot)=>{
        let x = [];
        snapshot.forEach((d)=>{
            x.push([d.key, d.val()]);
        })
        setCart(x);
    })
}

const updateCartData = (id, set, cart, arr) =>{
     data.ref("cart").child(id).set(set).then(()=>{
        cart(arr);
     })
}
export {updateCartData, getCartData, addToCart, updateAccount, deletePROFPIC, uploadImage, getAccounts, getChatOpen, sendChat, getChat, RegisterAccount, checkAccountIfExist, checkAccountIfExist2};