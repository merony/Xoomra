import {
    Button,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import styles from './styles';

const UserHomeScreen = ({navigation, props}) => {
    


    return (

      <SafeAreaView>

        <ScrollView>

        <View style={{flexDirection: "column"}}>

        <Text> User Home Screen </Text>
        <TouchableOpacity style={{justifyContent: 'flex-start',flexDirection: 'row'}} onPress={() => {auth().signOut() && navigation.replace(`OnBoard`)}}>
        <Text style={{color:'#0999f4', fontWeight: '500'}}>Log Out</Text>
        </TouchableOpacity>

        </View>


        </ScrollView>

    
        
      </SafeAreaView>

    
        
       
    );
  };
  
 
  
  export default UserHomeScreen;