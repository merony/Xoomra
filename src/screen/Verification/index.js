import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {cUserDB, profilesDB, usersDB, verificationsDB} from '../../data/firRef';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
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

      verificationsDB.doc(auth().currentUser.uid).set({
        uid: auth().currentUser.uid,
        email: auth().currentUser.email,
        Identification : photoID,
        ProofOfAddress : proofOfAddress,
        UserWithID : userWithID,
        isVerificationCompleted: false,
        verificationStatus: 'pending'
        })
        navigation.replace("TabNavigator")
    }

    return (

      <View style={{flexDirection: "column", justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}}>
          <Text style={styles.headerTitle}>Verification</Text>
            <ScrollView>

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

          </ScrollView>

          <View style={{flexDirection:"column",margin:10, backgroundColor: '#fff',}}>
            
            <TouchableOpacity onPress={savePressed} style = {styles.customSaveBTN}>
                      <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>
          </View>


    </View>
        
       
    );
  };
  
 
  
  export default VerificationScreen;