import {
    Button,
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Entype from 'react-native-vector-icons/Entypo';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import searchSugg from '../../../data/search';
import styles from './styles';

const SearchScreen = ({navigation, props}) => {

    const [inpuText, setInputText] = useState('');
    const [maxStay, setMaxStay] = useState(0);
  const [maxGuest, setMaxGuest] = useState(0);

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    

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
            )} />

       


      <View style ={styles.searchRow}>

          <View>
            <Text style={{fontWeight: 'bold'}}>Stay</Text>
            <Text style={{color: '#8d8d8d', fontSize: 14 }}>Max days of stay</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => setMaxStay(Math.max(0, maxStay - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>

            <Text style={{marginHorizontal: 20, fontSize: 16}}>{maxStay}</Text>

            <Pressable
              onPress={() => setMaxStay(maxStay + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>

      </View>


      <View style ={styles.searchRow}>


          <View>
            <Text style={{fontWeight: 'bold'}}>Guest</Text>
            <Text style={{color: '#8d8d8d', fontSize: 14 }}>Number of Guest</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => setMaxGuest(Math.max(0, maxGuest - 1))}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>-</Text>
            </Pressable>

            <Text style={{marginHorizontal: 20, fontSize: 16}}>{maxGuest}</Text>

            <Pressable
              onPress={() => setMaxGuest(maxGuest + 1)}
              style={styles.button}>
              <Text style={{fontSize: 20, color: '#474747'}}>+</Text>
            </Pressable>
          </View>

      </View>


      <View style ={styles.searchRow}>


<View>
  <Text style={{fontWeight: 'bold'}}>Date Range</Text>
  <Text style={{color: '#8d8d8d', fontSize: 14 }}>When do you want to visit?</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center'}}>


  <Text onPress={() => setOpen(true)} style={{marginHorizontal: 20, fontSize: 16}}>Select Date</Text>


          <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
          />

</View>

</View>

<TouchableOpacity onPress={() => navigation.navigate('Stay List')} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Sign In</Text>
            </TouchableOpacity>


            




          
       

  </View>
        
       
    );
  };
  
 
  
  export default SearchScreen;
