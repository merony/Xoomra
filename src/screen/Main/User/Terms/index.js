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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import TermsItem from '../../../../components/TermsItem';
import Terms from '../../../../data/terms';
import { useRef } from 'react';

const TermsScreen = ({navigation, props}) => {

  const list = useRef()
  // const toToppressed = () =>{
  //   list.current.scrollToEnd({ animated: true })
  // }

  const toToppressed = () =>{
    list.current.scrollToOffset({offset:0,animated:true})
  }

    return (

      <View 
        style={{flexDirection: "column",marginHorizontal:15,flex:1}}>

        <Text style={styles.title}>Terms</Text>

        <View style={styles.listContainer}>
          <FlatList
            data={Terms}
            renderItem={({item}) => <TermsItem term={item} />}
            ref={list}
          />       
        </View>

        <TouchableOpacity
          style={styles.topButton}
          onPress={toToppressed}>
          <Text style={styles.btnText}>Top</Text>
        </TouchableOpacity>

    </View>
        
       
    );
  };
  
 
  
  export default TermsScreen;