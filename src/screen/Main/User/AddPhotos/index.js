import * as Progress from 'react-native-progress';

import {AccommodationsDB, cUserDB, usersDB} from '../../../../data/firRef';
import {
    Alert,
    FlatList,
    Image,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
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
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import styles from './styles';

// import ImagePicker from 'react-native-image-picker';



const AddPhotosScreen = ({navigation, props, route}) => {

const {listingID} = route.params;

const getListingID = listingID;

// IMAGE IT WILL HELp store Image URI
  const [image, setImage] = useState(null);
  // Uploadin will keep track on upload
  const [uploading, setUploading] = useState(false);
  // transferred will keep track on uploading progres
  const [transferred, setTransferred] = useState(0);

  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    //Runs on every render
    // test();
  });


  useEffect(() => {
    //Runs only on the first render
   
    // Alert.alert(auth().currentUser.uid)

    Alert.alert('Doc Id :', getListingID)
  
})


const getPhoto = () =>{

  ImagePicker.openCamera({
    width: 1280,
    height: 800,
    cropping: true,
  }).then(image => {
    console.log(image);
    setImage(image);

  })
  
  // .then(() =>{

  //   uploadImage();
  // });


}

const handleRemoveItem = (e) => {
  setImageList(imageList.slice(imageList.indexOf(e.target + 1, 1)))
}


  const uploadImage = async () => {

  const imageUri = image.path;

  let filename = imageUri.substring(imageUri.lastIndexOf('/')+ 1);

  try {

    const imgUploadRef = storage().ref(filename)

    await imgUploadRef.putFile(imageUri);

    const imURL= await imgUploadRef.getDownloadURL();

    setImageList(imageList => [...imageList, imURL]);

    // setImage(null)

    // Alert.alert(imURL)
       
    
  } catch (e) {
    console.log(e);
    
  }

    //  Alert.alert(filename)
  
  }


  const addListingPressed = () => {

    if (imageList.length === 0 ){

      Alert.alert("","Please Fill All Information")
    }
    else{
      AccommodationsDB.doc(getListingID).update({
        images : imageList,

      })
      .then (() =>{

        navigation.navigate('Preview Listing', {listingID: getListingID})

      })
    }

  }


    return (


      <View style={{flexDirection: "column", flex: 1, margin:20}}>

        <ScrollView>   

        <View style={{flexDirection:'row'}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
    <Text style={styles.headerTitle}>Add Photos</Text>
      </View>
        <TouchableOpacity  onPress={getPhoto}>
          <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose></Text>
        </TouchableOpacity>
   </View>

   <View style={{flexDirection:"column",margin:0,borderBottomColor:'gray',borderBottomWidth:1,marginVertical:20, alignItems: 'center',}}>
    

    {/* <TouchableOpacity style={styles.selectButton} onPress={uploadPhotoIDPressed}>
      <Text style={styles.buttonText}>TAKE PHOTO</Text>
    </TouchableOpacity> */}
    <View style={styles.imageContainer}>
      {image !== null ? (
        <Image source={{ uri: image.path }} style={styles.imageBox} />
      ) : null}


      {uploading ? (
        <View style={styles.progressBarContainer}>
          <Progress.Bar progress={transferred} width={300} />
        </View>
      ) : (
        // <View></View>
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>ADD </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>



      <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

   <View style={{flexDirection:'row'}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
    <Text style={{color:'#283239', fontWeight: '500', fontSize: 18,}}>Photos</Text>
    {/* <Text style={styles.headerTitle}>Add Photos</Text> */}
      </View>
        {/* <TouchableOpacity  onPress={getPhoto}>
          <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose></Text>
        </TouchableOpacity> */}
   </View>



   <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'flex-start',marginVertical:20,marginHorizontal:10}}>
          {imageList.map(item =>(
            <View style={{padding:2}}>
              <Image  source={{uri:item}} style={{ width: 100,height: 100,borderColor: 'gray',borderWidth: 1,marginHorizontal: 3,resizeMode:'contain'}} />
              <Text onPress={handleRemoveItem} style={{color:'#0999f4', fontWeight: '500'}}> remove</Text>
            </View>
          ) )}
    </View>
   </View>

{/*     
      <Text>{imageList} </Text> */}

       {/* <Image source={imageList} style={styles.imageBox} />  */}

        </ScrollView>

   
        <View style= {{ flexDirection: "column", padding: 20, justifyContent: 'flex-end', backgroundColor: '#fff'}} >
        <TouchableOpacity onPress={addListingPressed} style = {styles.customBTN}>
              <Text style={styles.textBTN}>Save & Preview</Text>
          </TouchableOpacity>

      </View>

    </View>
        
       
    );
  };
  
 
  
  export default AddPhotosScreen;