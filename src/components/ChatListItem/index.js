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
import { Divider } from 'react-native-paper';

const ChatListItem = ({navigation, props}) => {
    
  



    return (

        <Pressable style={styles.container}>
          {/* main container of chat list item */}
          {/* <Image source={{uri:'https.notjustdev-dummy.s3.us-east-2.amazonaws.com/avators/lukas.jepg'} /> */}
          <Image source={{uri:'https://gartic.com.br/imgs/mural/na/naruto_uzumakinrt/avatar.png?v=0'}} style={styles.image}/>
          <View style={styles.content}>
            <View style={styles.row1}>
              <Text style={styles.name} numberOfLines={1}>Uzumaki Naruto</Text>
              <Text style={styles.subTitle}>Konoha</Text>
            </View>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>Hello, this is the last msg.Hello, this is the last msg.Hello, this is the last msg.Hello, this is the last msg.Hello, this is the last msg.Hello, this is the last msg.</Text>
            <View style={styles.row2}>
              <Text style={styles.interest}>Interested</Text>
              <Text style={styles.subTitle}>time</Text>
            </View>
          </View>
        </Pressable>     
    );
  };
  
 
  
  export default ChatListItem;
