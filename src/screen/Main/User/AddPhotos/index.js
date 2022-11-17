import * as Progress from 'react-native-progress';

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



const AddPhotosScreen = ({navigation, props}) => {

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
   
    Alert.alert(auth().currentUser.uid)
  
})




const uploadPhotoIDPressed = () =>{

  ImagePicker.openCamera({
    width: 1280,
    height: 800,
    cropping: true,
  }).then(image => {
    console.log(image);
    setImage(image);
   
    // setImageList(imageList => [...imageList, {
    //   key:imageList.length,
    //   value:image.path
    // }])

    // setImageList([...imageList,{
    //   key:imageList.length,
    //   value:image.path
    // }])


    setImageList(imageList => [...imageList, image.path])

 


    
  });
}


const renderItem = ({ item }) => (
  

  <View style={{padding:2, flexDirection:'row' }}>
  <Image  source={{uri:item}} style={{ width: 100,height: 100,borderColor: 'gray',borderWidth: 1,marginHorizontal: 3, resizeMode:'contain'}} />
</View>
);



  const uploadImage = async () => {

  const imageUri = image.path;

  let filename = imageUri.substring(imageUri.lastIndexOf('/')+ 1);

  try {

    await storage().ref(filename).putFile(imageUri);
    
  } catch (e) {
    console.log(e);
    
  }


     Alert.alert(filename)
  
  }
  

    return (



      <View style={{flexDirection: "column", flex: 1, margin:20}}>

        <ScrollView>   

        <View style={{flexDirection:'row'}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
    <Text style={styles.headerTitle}>Add Photos</Text>
      </View>
        <TouchableOpacity  onPress={uploadPhotoIDPressed}>
          <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose></Text>
        </TouchableOpacity>
   </View>


      <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1,marginVertical:20, alignItems: 'center',}}>
    

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
            {/* <Text style={styles.buttonText}>ADD+ </Text> */}
          </TouchableOpacity>
        )}
      </View>
    </View>



      <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

   <View style={{flexDirection:'row'}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
    <Text style={{color:'#283239', fontWeight: '500', fontSize: 18,}}>Photos</Text>
      </View>
        {/* <TouchableOpacity  onPress={uploadPhotoIDPressed}>
          <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose></Text>
        </TouchableOpacity> */}
   </View>



   <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'flex-start',marginVertical:20,marginHorizontal:10}}>
          {imageList.map(item =>(
            <View style={{padding:2}}>
              <Image  source={{uri:item}} style={{ width: 100,height: 100,borderColor: 'gray',borderWidth: 1,marginHorizontal: 3,resizeMode:'contain'}} />
            </View>
          ) )}
    </View>



   </View>

{/*     
      <Text>{imageList} </Text> */}

       {/* <Image source={imageList} style={styles.imageBox} />  */}

        </ScrollView>

   
      

    </View>
        
       
    );
  };
  
 
  
  export default AddPhotosScreen;