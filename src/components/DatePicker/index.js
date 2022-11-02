import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    Button
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
import DatePicker from 'react-native-date-picker'

const DatePickerComponent = (props) => {

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  return (
    <>

    <Pressable onPress={() => setOpen(true)} style={styles.datepicker}>
    <Text style={styles.stayTtile}>{date.toDateString()} - </Text>
    <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          props.setCDate(date)
          props.setCNights(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Pressable>
     
    </>
  )}
  
 
  
  export default DatePickerComponent;
