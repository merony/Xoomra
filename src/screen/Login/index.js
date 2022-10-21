/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
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
import { StackActions } from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const LoginScreen = ({navigation}) => {
    
    const [emailFromUI,setEmailFromUI] = useState("")
    const [passwordFromUI,setPasswordFromUI] = useState("")

    const signinPressed = async() =>{
      navigation.navigate("Add Listing")
      if (emailFromUI.length === 0 || passwordFromUI.length === 0) {
        alert("Please enter email and password")
      }
      else{
      auth()
      .signInWithEmailAndPassword(emailFromUI,passwordFromUI )
      .then(() => {
        console.log('User signed in!');
        console.log(auth().currentUser.email)
        navigation.navigate('TabNavigator')
        // StackActions.replace("TabNavigator")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
    }

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
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email ID' style = {styles.formInput} keyboardType="email-address" 
              value={emailFromUI} onChangeText={setEmailFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Password' style = {styles.formInput} secureTextEntry={true}
              value={passwordFromUI} onChangeText={setPasswordFromUI}/>
          
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
  