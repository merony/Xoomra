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
import styles from './styles';
import Calendar from "react-native-calendar-range-picker";

const DateRangePicker = ({navigation, props}) => {
    
  



    return (

      <View style={{flexDirection: "column"}}>

       <Text>DateRangePicker</Text>
       <View style={{ flex: 1 }}>
        <Calendar
          startDate="2020-05-05"
          endDate="2020-05-12"
          onChange={({ startDate, endDate }) => console.log({ startDate, endDate })}
        />
      </View>;

    </View>
        
       
    );
  };
  
 
  
  export default DateRangePicker;
