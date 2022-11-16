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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import styles from './styles';

// import ImagePicker from 'react-native-image-picker';








const AddPhotosScreen = ({navigation, props}) => {

// IMAGE IT WILL HELp store Image URI
  const [image, setImage] = useState(null);
  // Uploadin will keep track on upload
  const [uploading, setUploading] = useState(false);
  // transferred will keep track on uploading progres
  const [transferred, setTransferred] = useState(0);

  const [imageList, setImageList] = useState([]);


const uploadPhotoIDPressed = () =>{

  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
    setImage(image);
   
    setImageList(imageList => [...imageList, image.path])
    
  });
}




  const uploadImage = async () => {
  
  
  }
  

    return (

      <View style={[styles.container, {flexDirection: "column"}]}>

<TouchableOpacity style={styles.selectButton} onPress={uploadPhotoIDPressed}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.path }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>

    
      <Text>{imageList} </Text>

       {/* <Image source={imageList} style={styles.imageBox} />  */}
      

    </View>
        
       
    );
  };
  
 
  
  export default AddPhotosScreen;