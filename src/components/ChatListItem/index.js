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
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ChatListItem = (props) => {

  const navi = useNavigation()
  const onItemPressed = () =>{
    navi.navigate('MessageResponseScreen',{id:1})
  }
    
  console.log(props)

    return (

        <Pressable style={styles.container} onPress={onItemPressed}>
          {/* main container of chat list item */}
          {/* <Image source={{uri:'https.notjustdev-dummy.s3.us-east-2.amazonaws.com/avators/lukas.jepg'} /> */}
          <Image source={{uri:props.chat.user.image}} style={styles.image}/>
          <View style={styles.content}>
            <View style={styles.row1}>
              <Text style={styles.name} numberOfLines={1}>{props.chat.user.name}</Text>
              <Text style={styles.subTitle}>{props.chat.user.location ?? 'exampleLocation'}</Text>
            </View>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{props.chat.lastMessage.text}</Text>
            <View style={styles.row2}>
              <Text style={styles.interest}>Interested</Text>
              <Text style={styles.interestDot}>·</Text>
              <Text style={styles.subTitle}>{props.chat.lastMessage.createdAt.slice(0,10)}</Text>
            </View>
          </View>
        </Pressable>     
    );
  };
  
 
  
  export default ChatListItem;
