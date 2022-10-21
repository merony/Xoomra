import {
    FlatList,
    Image,
    Pressable,
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
import stayFeed from '../../../data/stayFeed';
import styles from './styles';

const FavoritesScreen = ({navigation, props}) => {
    
  




    return (

      <View style={{flexDirection: "column"}}>

       <Text>Favorites Screen</Text>

    </View>
        
       
    );
  };
  
 
  
  export default FavoritesScreen;
