import {
    FlatList,
    Image,
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
import StayComponent from '../../../components/Stay';
import { TextInput } from 'react-native-gesture-handler';
import stayFeed from '../../../data/stayFeed';
import styles from './styles';

const StayListScreen = ({navigation, props}) => {
    
  

    const renderItem = ({ item }) => (
        // <Item title={item.title} />
        <StayComponent stay={item}/>
      );


    return (

        <View>
            
            <FlatList
        data={stayFeed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      
          </View>
        
       
    );
  };
  
 
  
  export default StayListScreen;