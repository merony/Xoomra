import * as Progress from 'react-native-progress';

import {
    Alert,
    FlatList,
    Image,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import styles from './styles';

const AddPhotosScreen = ({navigation, props}) => {

// IMAGE IT WILL HELp store Image URI
  const [image, setImage] = useState(null);
  // Uploadin will keep track on upload
  const [uploading, setUploading] = useState(false);
  // transferred will keep track on uploading progress
  const [transferred, setTransferred] = useState(0);
  const [imageList, setImageList] = useState9([]),

    
  

    return (

      <View style={{flexDirection: "column"}}>

       <Text>Add Photos Screen</Text>

    </View>
        
       
    );
  };
  
 
  
  export default AddPhotosScreen;