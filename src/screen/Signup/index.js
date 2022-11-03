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
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo'
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const SignUpScreen = ({navigation}) => {
  
    const [emailFromUI,setEmailFromUI] = useState("")
    const [reEmailFromUI,setReEmailFromUI] = useState("")
    const [passwordFromUI,setPasswordFromUI] = useState("")
    const [rePasswordFromUI,setRePasswordFromUI] = useState("")

    const signUpPressed = async() =>{

      if (emailFromUI.length === 0  || reEmailFromUI.length === 0 ||  passwordFromUI.length === 0 || rePasswordFromUI.length === 0){
        alert("Please fill all Information")
      }

      else if (emailFromUI !== reEmailFromUI)  {
        
        Alert.alert("","Email doesnt match")
      }

      else if (passwordFromUI !== rePasswordFromUI)  {
        
          console.log("not the same")
          Alert.alert("","Password doesnt match")
      }

    
      else if (passwordFromUI === rePasswordFromUI && emailFromUI === reEmailFromUI ){
        

      auth()
      .createUserWithEmailAndPassword(emailFromUI,passwordFromUI )
      .then(() => {
        console.log('User account created & signed in!');
        Alert.alert("","Account Created")
        navigation.navigate('Personal Information')
        firestore().collection('users').add({
                  uid: auth().currentUser.uid,
                  email: emailFromUI,
                  password: passwordFromUI
  })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("","That email address is already in use!")
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          Alert.alert("","That email address is invalid!")
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert("","The given password is invalid.Password should be at least 6 characters")
          setPasswordFromUI("")
          setRePasswordFromUI("")
        }

    
        console.error(error);
      });
      }
        
    }

    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
        <StatusBar/>
        <View >
            <Image style={{ justifyContent: 'flex-start', width: 395, height: 200, marginTop: 0, paddingTop: 0}} source={require('../../Image/login-image.png')}/>
        </View>
        <ScrollView>
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

            <Text style={styles.headerTitle}>Sign Up</Text>

            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email ID' style = {styles.formInput} keyboardType="email-address" 
              value={emailFromUI} onChangeText={setEmailFromUI}/>
            </View>
          
            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Re-Email ID' style = {styles.formInput} keyboardType="email-address" 
              value={reEmailFromUI} onChangeText={setReEmailFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Password' style = {styles.formInput} secureTextEntry={true} 
              value={passwordFromUI} onChangeText={setPasswordFromUI}/>
          
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Re-Password' style = {styles.formInput} secureTextEntry={true} 
              value={rePasswordFromUI} onChangeText={setRePasswordFromUI}/>
          
            </View>

        
            
            <TouchableOpacity onPress={signUpPressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Sign Up</Text>
            </TouchableOpacity>

            <View style={{justifyContent: 'center', flexDirection: 'row'}}>

            <Text style={{color:'#283239', fontWeight: '300'}}>Already Have an account ? </Text>

            <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
                <Text style={{color:'#0999f4', fontWeight: '500'}}> Sign In</Text>
            </TouchableOpacity>

            </View>

          </View>
        
          </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SignUpScreen;
  