import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from 'react-native-paper';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {GoogleSocialButton} from 'react-native-social-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const ChatListItem = ({chat}) => {
  const navi = useNavigation();
  const onItemPressed = () => {
    navi.navigate('MessageResponseScreen', {data: chat});
  };

  console.log('Stay Ttile ', chat.StayTitle, ' ', chat.listingId, ' ', chat.messageId, ' ', chat.host.StayTitle);

  return (
    <Pressable style={styles.container} onPress={onItemPressed}>
      {/* main container of chat list item */}
      {/* <Image source={{uri:'https.notjustdev-dummy.s3.us-east-2.amazonaws.com/avators/lukas.jepg'} /> */}
      <Image
        source={{
          uri:
             'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row1}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.username}
          </Text>
          {/* <Text style={styles.subTitle}>
            {chat?.location ?? 'exampleLocation'}
          </Text> */}
        </View>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {chat.StayTitle}
        </Text>
        {/* <View style={styles.row2}> */}
        {/* <Text style={styles.interest}>Interested</Text> */}
        {/* <Text style={styles.interestDot}>·</Text> */}
        {/* <Text style={styles.subTitle}>
            {chat.StayTitle}
          </Text> */}
        {/* </View> */}
      </View>
    </Pressable>
  );
};

export default ChatListItem;
