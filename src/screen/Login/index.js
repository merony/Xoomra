/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo'
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { StackActions } from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { usersDB } from '../../data/firRef';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const LoginScreen = ({navigation}) => {
    
    const [emailFromUI,setEmailFromUI] = useState("")
    const [passwordFromUI,setPasswordFromUI] = useState("")
    const [isCompleted, setCompleted] = useState(false);
    const [missingEmail,setMissingEmail] = useState(false)
    const [missingPassword,setMissingPassword] = useState(false)

    
  const navTransfer = async() =>{


    await usersDB.doc(auth().currentUser.uid)
    .get()
    .then(documentSnapshot => {
      console.log('User data: ', documentSnapshot.data().isCompleted);

      const isCompleted = documentSnapshot.data().isCompleted;
       setCompleted(isCompleted);

      // Alert.alert('User exists: ', documentSnapshot.exists);
  
      // if (documentSnapshot.exists) {
      //   Alert.alert('User data: ', documentSnapshot.data().uid);
      // };


      if (isCompleted === false) {

        navigation.navigate('Personal Information')
    
        } else {
    
          navigation.navigate('TabNavigator')
    
        }
    
  });



}

  

    useEffect(() => {
      //Runs on every render

        // auth().signOut()
        // .then( () => {
        //    setCompleted(false);
        // });

        // setCompleted(false);
      // 

      if (auth.currentUser !== null) {
        // User is signed in.

        navTransfer();
      } else {
        // No user is signed in.
      }
     

      
    });
  
    useEffect(() => {
      //Runs only on the first render

      // navTransfer();
     
    }, []);

    const signinPressed = async() =>{
      // navigation.navigate("TabNavigator")
      setMissingEmail(false)
      setMissingPassword(false)
      if (emailFromUI.length === 0 && passwordFromUI.length === 0 ) {
        setMissingEmail(true)
        setMissingPassword(true)

      }

      else if (emailFromUI.length === 0 && passwordFromUI.length !== 0){
        setMissingEmail(true)

      }

      else if (emailFromUI.length !== 0 && passwordFromUI.length === 0){
        setMissingPassword(true)
      }

     
      else{
      auth()
      .signInWithEmailAndPassword(emailFromUI,passwordFromUI )
      .then(() => {
        console.log('User signed in!');
        console.log(auth().currentUser.email);
        navTransfer();
      
       
        // StackActions.replace("TabNavigator")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('invalid email')

        }

        if (error.code === 'auth/wrong-password'){
          Alert.alert('Wrong Password')
        }

        if (error.code === 'auth/user-not-found') {
          Alert.alert('User Not Found')

        }
    
        console.error(error);
      });
    }

  }
  const changingEmail = ()=>{
    setMissingEmail(false)
  }
  const changingPassord = ()=>{
    setMissingPassword(false)
  }

  


    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
        <StatusBar/>
        <View >
            <Image style={{ justifyContent: 'flex-start', width: 395, height: 250, marginTop: 0, paddingTop: 0}} source={require('../../Image/login-image.png')}/>
        </View>
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

            <Text style={styles.headerTitle}>Sign In</Text>

            
            <View style = {styles.formField}>
              <View style={{flexDirection:'row'}}>
                <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
                <TextInput placeholder='Email ID' style = {styles.formInput} keyboardType="email-address" 
                  value={emailFromUI} onChange={changingEmail} onChangeText={setEmailFromUI} />
              </View>
              {missingEmail &&
              <View style={{flexDirection:'row',marginTop:5}}>
              <MaterialIcons style={{ }} name='error' size={14} color='red' />
               <Text style={{color:'red',fontSize:10}}>Email is required</Text>
              </View>}
            </View>

            

            <View style = {styles.formField}>
              <View style={{flexDirection:'row'}}>
                <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
                <TextInput placeholder='Password' style = {styles.formInput} secureTextEntry={true}
                  value={passwordFromUI} onChange={changingPassord} onChangeText={setPasswordFromUI}/>
              </View>
              {missingPassword &&
              <View style={{flexDirection:'row',marginTop:5}}>
              <MaterialIcons style={{ }} name='error' size={14} color='red' />
               <Text style={{color:'red',fontSize:10}}>Password is required</Text>
              </View>}
            </View>

            <TouchableOpacity style={{justifyContent: 'flex-end',flexDirection: 'row'}} onPress={() => {navigation.navigate(`Forget Password`)}}>
                <Text style={{color:'#0999f4', fontWeight: '500'}}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={signinPressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Sign In</Text>
            </TouchableOpacity>

            <View style={{justifyContent: 'center', flexDirection: 'row'}}>

            <Text style={{color:'#283239', fontWeight: '300'}}>Don't have an account ? </Text>

            <TouchableOpacity  onPress={() => navigation.navigate('Sign Up')}>
                
                <Text style={{color:'#0999f4', fontWeight: '500'}}> Sign Up</Text>
            </TouchableOpacity>

            </View>


          </View>
        
       
      </SafeAreaView>
    );
  };
  
 
  
  export default LoginScreen;
  