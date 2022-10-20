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
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const ForgetPasswordScreen = ({navigation}) => {
    
   const [emailFromUI,setEmailFromUI] = useState("")

   const resetPasswordPressed = async() =>{

    if (emailFromUI.length === 0){
      alert("Please Enter Email Address")
    }
    else{
    
      auth().sendPasswordResetEmail(emailFromUI)
      .then(() => {
        console.log('email Sent');
      })
      .catch(error => {

        if (error.code === 'auth/user-not-found') {
          alert("This User Doesnt Exist")
        }
        if (error.code === 'auth/invalid-email') {
          alert("Wrong Email Format")
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

            <Text style={styles.headerTitle}>Reset Password</Text>
          
            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email ID' style = {styles.formInput} keyboardType="email-address" 
              value={emailFromUI} onChangeText={setEmailFromUI}/>
            </View>

          
            <TouchableOpacity onPress={resetPasswordPressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Reset Password</Text>
            </TouchableOpacity>

           

          </View>
        
       
      </SafeAreaView>
    );
  };
  
 
  
  export default ForgetPasswordScreen;
  