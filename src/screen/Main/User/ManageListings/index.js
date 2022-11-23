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
import ManageListingItem from '../../../../components/ManageListingItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import places from '../../../../data/stayFeed';
import styles from './styles';

const ManageListingScreen = ({navigation, props}) => {
    
const stays = places
const addPressed = (id) =>{
  Alert.alert(`navi to add listing screen`)
}

const dummyDatalistings = [
  {
    stay:stays[0],
    isPublished:false,
  },
  {
    stay:stays[1],
    isPublished:false,
  },
  {
    stay:stays[2],
    isPublished:false,
  },
  {
    stay:stays[3],
    isPublished:true,
  }
]
const dummyDatalisting = dummyDatalistings[0]




    return (
      <View style={{flexDirection: "column",paddingHorizontal:20,paddingVertical:20}}>
        <TouchableOpacity onPress={addPressed}>
          <Text 
            style={styles.addListing}>
            Add New Listing
          </Text>
        </TouchableOpacity>
        {/* flatlistContainer */}
        <View style={styles.flatlistContainer}>

          <FlatList
            data={dummyDatalistings}
            renderItem={({item}) => <ManageListingItem listing={item} />}
           />

        </View>


      </View>
        
       
    
  );
   };
  
 
  
  export default ManageListingScreen;