import {
    Image,
    Text,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import { usersDB } from '../../data/firRef';

;






const WelcomeScreen = ({navigation}) => {

    const [isCompleted, setCompleted] = useState(false);


    const user =auth().currentUser

    const navTransfer = async() =>{

        if(user) {

            
       const login =  await usersDB.doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {

          console.log('User data: ', documentSnapshot.data().isCompleted);
    
          const isCompleted = documentSnapshot.data().isCompleted;
           setCompleted(isCompleted);
    
          if (isCompleted === false) {
    
            navigation.navigate('Personal Information')
        
            } else {
        
              navigation.navigate('TabNavigator')
        
            }
        
      });

        }else{

            console.log('No User data:');
            navigation.replace('Login')

        }
    
    }
    
    useEffect(() => {
 
        if (user) {
          // User is signed in.
  
          navTransfer();
        } else {

            navigation.replace('Login')
            console.log('That email address is invalid!');
  
        }
       
  
        
      });
    
      useEffect(() => {
        //Runs only on the first render
  
        if (user) {
            // User is signed in.
    
            navTransfer();
          } else {
  
              navigation.navigate('Login')
              console.log('That email address is invalid!');
    
          }
         
       
      }, []);



    return (

      <View style={{flexDirection: "column", justifyContent: 'center',}}>

       <Text>Welcoem Screen</Text>

    </View>
        
       
    );
  };
  
 
  
  export default WelcomeScreen;
