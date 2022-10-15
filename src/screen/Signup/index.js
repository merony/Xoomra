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
import styles from './styles';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
   * LTI update could not be added via codemod */

   // <Entype name={"home"} size= {24}/>
   //  <GoogleSocialButton onPress={() => {}}  />
  
  
  
  const SignUpScreen = ({navigation}) => {
  
    return (
      <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
        <StatusBar/>
        <View >
            <Image style={{ justifyContent: 'flex-start', width: 395, height: 200, marginTop: 0, paddingTop: 0}} source={require('../../Image/login-image.png')}/>
        </View>
          <View style={{ justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}} > 

            <Text style={styles.headerTitle}>Sign Up</Text>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='person-outline' size={18} color='#283239' />
            <TextInput placeholder='Full Name' style = {styles.formInput} keyboardType="email-address"/>
            </View>
          
            <View style = {styles.formField}>
            <MaterialIcons style={{ paddingVertical: 4}} name='alternate-email' size={18} color='#283239' />
            <TextInput placeholder='Email ID' style = {styles.formInput} keyboardType="email-address"/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Password' style = {styles.formInput} secureTextEntry={true}/>
          
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='lock-closed-outline' size={18} color='#283239' />
            <TextInput placeholder='Re-Password' style = {styles.formInput} secureTextEntry={true}/>
          
            </View>

        

            <TouchableOpacity onPress={() => {}} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Register</Text>
            </TouchableOpacity>

            <View style={{justifyContent: 'center', flexDirection: 'row'}}>

            <Text style={{color:'#283239', fontWeight: '300'}}>Already Have an account ? </Text>

            <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
                
                <Text style={{color:'#0999f4', fontWeight: '500'}}> Sign In</Text>
            </TouchableOpacity>

            </View>


          </View>
        
       
      </SafeAreaView>
    );
  };
  
 
  
  export default SignUpScreen;
  