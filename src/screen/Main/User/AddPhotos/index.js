import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  Alert,
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
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const AddPhotosScreen = ({navigation, props}) => {
  
const [coverPhoto,setCoverPhoto] = useState('')
const [listingImages,setListingImages] = useState([])


const submit = () =>{
  // in this part data should be saved on firestore
}

const chooseCoverPhotoPressed = () =>{
  Alert.alert(
    "Cover Photo",
    "Please Select How You Want To Upload",
    [
      {
        text: "Camera",
        onPress: coverPhotoCamera,
      },
      {text: ""},
      {
        text: "Gallary",
        onPress: coverPhotoGallary,
      },
    ],
    {cancelable: true}
  );

}

const chooseListingPhotosPressed = () =>{
  Alert.alert(
    "Listing Photos",
    "Please Select How You Want To Upload",
    [
      {
        text: "Camera",
        onPress: listingPhotosCamera,
      },
      {text: ""},
      {
        text: "Gallary",
        onPress: listingPhotosGallary,
      },
    ],
    {cancelable: true}
  );

}



  const coverPhotoCamera = () =>{

  ImagePicker.openCamera({
    cropping: true,
  }).then(image => {
    setCoverPhoto(image.path)
  });
  }

  const coverPhotoGallary = () =>{
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      setCoverPhoto(image.path)
    });
    }


    const listingPhotosCamera = () =>{
      ImagePicker.openCamera({
        cropping: true,
      }).then(image => {
        
    setListingImages([...listingImages,{
      key:listingImages.length,
      value:image.path
    }])
  
      });
      }  
  

  const listingPhotosGallary = () =>{
  ImagePicker.openPicker({
    cropping: true
  }).then(image => {
    setListingImages([...listingImages,{
      key:listingImages.length,
      value:image.path
    }])
  });
  }




return (

  <View style={{flexDirection: "column"}}>
     
    <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1,marginVertical:20}}>
          <View style={{flexDirection:'row'}}>

              <View style={{flex:1,justifyContent:'flex-start'}}>
                <Text style={{color:'#283239', fontWeight: '300'}}>Cover Photo </Text>
              </View>
                <TouchableOpacity onPress={chooseCoverPhotoPressed}>
                  <Text style={{color:'#0999f4', fontWeight: '500'}}>Choose  </Text>
                </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginVertical:20}}>
             {coverPhoto !== '' && <Image source={{uri:coverPhoto}} style={{  width: 250,height: 150,borderColor: 'gray',borderWidth:0.5,resizeMode:'contain'}} />}  
          </View>
    </View>


      <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

        <View style={{flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'flex-start'}}>
            <Text style={{color:'#283239', fontWeight: '300'}}>Listing Photos</Text>
              </View>
                <TouchableOpacity  onPress={chooseListingPhotosPressed}>
                  <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose </Text>
                </TouchableOpacity>
        </View>

      <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'flex-start',marginVertical:20,marginHorizontal:10}}>
          {listingImages.map(item =>(
            <View style={{padding:2}}>
              <Image key={item.key} source={{uri:item.value}} style={{ width: 100,height: 100,borderColor: 'gray',borderWidth: 1,marginHorizontal: 3,resizeMode:'contain'}} />
            </View>
          ) )}
        </View>
      </View>
  </View>
      
     
  );
};


export default AddPhotosScreen;
