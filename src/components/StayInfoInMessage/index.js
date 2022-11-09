import {
  Alert,
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
import styles from './styles';

const StayInfoInMessageComponent = ({navigation, props}) => {
    
  const image = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg'
  const stayTitle = 'NEW lux. apartment in the center of Santa Cruz'
  const exchangeStatus = 'Interested'
  const exchangePeriod = 'Sep.19 - 20'

  const exchangePressed = () =>{
    Alert.alert('navi to stay detail page')
  }


    return (
      
      <Pressable 
        style={styles.mainContainer}
        onPress={exchangePressed}
      >
      {/* mainContainer */}

      <Image source={{uri:image}} style={styles.image}/>

      <View style={styles.column}>
        <Text style={styles.title} numberOfLines={1}>{stayTitle}</Text>
        <View style={{flexDirection:'row'}}>
            <Text>{exchangeStatus}</Text>
            <Text style={{marginHorizontal:5}}>·</Text>
            <Text>{exchangePeriod}</Text>
        </View>
        <View style={styles.listingContainer}>
            <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/>
            <Text style={{marginLeft:5}}>Listing</Text>
        </View>

      </View>




       

    </Pressable>
        
       
    );
  };
  
 
  
  export default StayInfoInMessageComponent;
