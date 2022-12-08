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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';

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
        Alert.alert(
          'Reset password email sent to' , emailFromUI ,
          [
            { text: "OK", onPress: () => navigation.navigate('Login') }
          ]
        );
      })
      .catch(error => {

        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'This User Doesnt Exist' , emailFromUI);
        }
        if (error.code === 'auth/invalid-email') {
          
          Alert.alert(
            'Wrong Email Format' , emailFromUI);
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
  