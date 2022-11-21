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

const ReviewListItem = (props) => {
  console.log(props.review)

    return (
   
      <View style={styles.singleReviewContainer}>
      {/* info container */}
      <View style={styles.infoContainer}>
        <Image source={{uri:props.review.user.image}} style={styles.image2}/>

        <View style={styles.personalInfoContainer}>
          <Text>{props.review.user.name}d</Text>
          <Text>{props.review.lastMessage.createdAt}</Text>
        </View>

      </View>

      {/* review text container */}
      <View>
      <Text style={styles.reviewText}>{props.review.lastMessage.text}</Text>
      </View>

    </View>
    );
  };
  
 
  
  export default ReviewListItem;
