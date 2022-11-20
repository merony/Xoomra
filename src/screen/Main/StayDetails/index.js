import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ScrollView
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
import StayDetailsComponent from '../../../components/StayDetails';
import places from '../../../data/stayFeed'
import { useRoute } from '@react-navigation/native';

const StayDetailsScreen = ({props}) => {
  //get place id from stay screen, find the stay from places and sent it to component
  const route = useRoute()
  const stays = places.find(place => place.id === route.params.id)
  return (
    <View >
     <StayDetailsComponent stays={stays}/>
    </View>
  );
};



export default StayDetailsScreen;