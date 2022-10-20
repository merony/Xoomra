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
import { TextInput } from 'react-native-gesture-handler';
import searchSugg from '../../../data/search';
import styles from './styles';

const SearchScreen = ({navigation, props}) => {

    const [inpuText, setInputText] = useState('');

    
    const renderItem = ({ item }) => (
        // <Item title={item.title} />
        <Text>{item.description}</Text>
      );
    

    return (

        <View style ={styles.container}>
            
            <TextInput style={styles.formInput} 
            placeholder="Type Destination"
            value={inpuText}
            onChangeText={setInputText}
            />

            <FlatList
            data={searchSugg}
            renderItem={({item}) => (
            
            <View style={styles.row}>
                <View style ={styles.iconContainer}>
                    <Entype name={"location-pin"} size={30} color='#283239' />
                    
                    </View>

                    <Text style ={styles.locationText}>{item.description}</Text>

                    
            </View>
           
            
            
       
            
            
            )}
           
            />
      
      
          </View>
        
       
    );
  };
  
 
  
  export default SearchScreen;
