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

      <View style={{flexDirection: "column"}}>

        <View>

        <Pressable
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search Screen')}>
      
        
        <View>
          <Text style={styles.searchButtonText}>Location Name </Text>
          <Text style={{color: '#8d8d8d', fontSize: 14, paddingLeft: 10,}}>3days | 2 Guest | Oct22 - Dec25</Text>
        </View>

        <Fontisto style={{justifyContent: 'flex-end', paddingLeft: 80, }}  name="player-settings" size={16} color={'#030f14'} />
        </Pressable>
  
          </View>

          <View style={{marginTop: 60}} >

          <FlatList style={{marginTop: 25}}
        data={stayFeed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

          </View>

    </View>
        
       
    );
  };
  
 
  
  export default StayListScreen;
