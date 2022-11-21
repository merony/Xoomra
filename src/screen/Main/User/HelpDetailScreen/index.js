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
import { useRoute } from '@react-navigation/native';
import helpData from '../../../../data/help';
import { useNavigation } from '@react-navigation/native';


const HelpDetailScreen = ({props}) => {
  const navi = useNavigation()
  const route = useRoute()
  const help = helpData.find(i => i.id === route.params.id)
  const contactUsPressed = () =>{
    navi.navigate('Support')
  }

    return (
      <View>

      <View style={styles.scrollViewContainer}>
      <ScrollView style={styles.scrollView}>

       <Text style={styles.title}> {help.title}</Text>
       <Image source={{uri:help.image}} style={styles.image}/>

       <Text style={styles.text}> {help.description}</Text>

       <Text style={styles.subTitle}>{help.details[0].title}</Text>
       <Text style={styles.text}>{help.details[0].text}</Text>

       <Text style={styles.subTitle}>{help.details[1].title}</Text>
       <Text style={styles.text}>{help.details[1].text}</Text>

      </ScrollView>

      </View>

      <TouchableOpacity 
      style={styles.customBTN}
      onPress={contactUsPressed}>
      <Text style={styles.textBTN}>Contact us</Text>
      </TouchableOpacity>
      </View>
        

        
       
    );
  };
  
 
  
  export default HelpDetailScreen;
