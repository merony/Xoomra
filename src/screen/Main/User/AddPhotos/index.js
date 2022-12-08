import * as Progress from 'react-native-progress';

import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {MyAccommodationsDB, usersDB} from '../../../../data/firRef';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import styles from './styles';

// import ImagePicker from 'react-native-image-picker';



const AddPhotosScreen = ({navigation, props, route}) => {

const {listingID} = route.params;

const {listingUID} = route.params;

const getListingID = listingID;

const getListingUID = listingUID;

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

  
  }, []);


const getPhoto = () =>{

  ImagePicker.openCamera({
    width: 1280,
    height: 800,
    cropping: true,
  }).then(image => {
    console.log(image);
    setImage(image);


    uploadImage (image.path);

  })
  
  // .then(() =>{

  //   uploadImage();
  // });


}

const handleRemoveItem = (e) => {
  // setImageList(imageList.slice(imageList.indexOf(e.target, 1)))

  const list=[...imageList]
  list.splice(e,1)
  console.log('new array',list);
  setImageList(list)

  setImage(null);

}



console.log(
  'all images',imageList
);

  const uploadImage = async (image) => {

  const imageUri = image;

 console.log ('Local', image)


  let filename = imageUri.substring(imageUri.lastIndexOf('/')+ 1);

  try {

    const imgUploadRef = storage().ref(filename)

    await imgUploadRef.putFile(imageUri);

    const imURL= await imgUploadRef.getDownloadURL();
    console.log('First Image ', imURL);
    if(imURL){
    console.log(imURL);
      setImageList([...imageList, imURL]);
    }




       
    
  } catch (e) {
    console.log(e);
    
  }


  
  }


  const addListingPressed = () => {

    if (imageList.length <= 3 ){

      Alert.alert("","Please Add Minimum 4 Photos")
    }
    else{
      MyAccommodationsDB.doc(getListingID).update({
        docID: getListingID,
        images : imageList,

      })
      .then (() =>{

        navigation.navigate('Preview Listing', {listingID: getListingID, listingUID: getListingUID})

      })
    }

  }


    return (


      <View style={{flexDirection: "column", flex: 1, margin:20}}>

        <ScrollView>   


      <View style={{flexDirection:"column",margin:10,borderBottomColor:'gray',borderBottomWidth:1}}>

   <View style={{flexDirection:'row'}}>
    <View style={{flex:1,justifyContent:'flex-start'}}>
    {/* <Text style={{color:'#283239', fontWeight: '500', fontSize: 18,}}>Photos</Text> */}
    <Text style={styles.headerTitle}>Add Photos</Text>
      </View>
        <TouchableOpacity  onPress={getPhoto}>
          <Text style={{color:'#0999f4', fontWeight: '500'}}> Choose></Text>
        </TouchableOpacity>
   </View>



   <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'flex-start',marginVertical:20,marginHorizontal:10}}>
          {imageList.map((item,index) =>(
            <View style={{padding:2}}>
              <Image  source={{uri:item}} style={{ width: 100,height: 100,borderColor: 'gray',borderWidth: 1,marginHorizontal: 3,resizeMode:'contain'}} />
              <Text onPress={()=>{handleRemoveItem(index)}} style={{color:'#0999f4', fontWeight: '500'}}> remove</Text>
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