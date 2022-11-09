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
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import styles from './styles';


const VerificationScreen = ({navigation, props}) => {
    

    const [photoID,setPhotoID] = useState(Image)
    const [proofOfAddress,setProofOfAddress] = useState(Image)
    const [userWithID,setUserWithID] = useState(Image)


  const uploadPhotoIDPressed = () =>{

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPhotoID(image)
    });
  }

  const uploadProofOfAddressPressed = () =>{

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProofOfAddress(image)      
    });
  }

  const uploadUserWithIDPressed = () =>{

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setUserWithID(image)
      
    });
  }

    const savePressed = () => {

      firestore().collection('Verification').add({
        uid: auth().currentUser.uid,
        email: auth().currentUser.email,
        Identification : photoID,
        ProofOfAddress : proofOfAddress,
        UserWithID : userWithID
        })
        navigation.replace("TabNavigator")
    }

    return (

      <View style={{flexDirection: "column"}}>


          <Text style={{fontWeight:'600',fontSize:18,color:'#0999f4',margin:10}}>Please Upload the Following Documents</Text>
          <View style={{flexDirection:"column",margin:10}}>
            <Text style={{fontWeight:'450',color:'black',fontSize:17}}>Photo Identification</Text>
            <TouchableOpacity onPress={uploadPhotoIDPressed} style = {styles.customBTN}>
                      <Text style={styles.textBTN}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:"column",margin:10,}}>
            <Text style={{fontWeight:'450',color:'black',fontSize:17}}>Proof Of Address</Text>
            <TouchableOpacity onPress={uploadProofOfAddressPressed} style = {styles.customBTN}>
                      <Text style={styles.textBTN}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:"column",margin:17}}>
            <Text style={{fontWeight:'450',color:'black',fontSize:17}}>User With PhotoID</Text>
            <TouchableOpacity onPress={uploadUserWithIDPressed} style = {styles.customBTN}>
                      <Text style={styles.textBTN}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:"column",margin:10}}>
            <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                      <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>
          </View>


    </View>
        
       
    );
  };
  
 
  
  export default VerificationScreen;