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
import ChatListItem from '../../../components/ChatListItem';
import chats from'../../../data/chats'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const MessageScreen = ({navigation, props}) => {

  // console.log(chat)

    return (


      <View>
        <View style={{paddingLeft:20}}>
         <Text style={styles.title}>Inbox</Text>
        </View>
        
        <FlatList
        data={chats}
        renderItem={({item}) => <ChatListItem chat={item} />}

      />
      </View>
 
     
       
    );
  };
  
 
  
  export default MessageScreen;
