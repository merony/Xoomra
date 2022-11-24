import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profilesDB } from '../../../../data/firRef';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import React from 'react';
import auth from '@react-native-firebase/auth'
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';

const EditProfileScreen = ({navigation, props}) => {

const [facebookLink,setFacebookLink] = useState("")
const [linkedinLink,setlinkedinLink] = useState("")
const [interest,setInterest] = useState("")
const [aboutYourSelf,setAboutYourSelf] = useState("")
const [Languages,setLanguages] = useState(null)
const [profilePic,setProfilePic] = useState(null)
const [profilePicURL,setProfilePicURL] = useState('')
const [newProfilePic,setNewProfilePic] = useState(null)
const [newProfilePicURL,setNewProfilePicURL] = useState('')
const [open, setOpen] = useState(false);
const [value, setValue] = useState([]);
const [items, setItems] = useState([
  {label: 'Afrikaans', value: 'Afrikaans'},{label: 'Albanian', value: 'Albanian'},
  {label: 'Arabic', value: 'Arabic'},{label: 'Armenian', value: 'Armenian'},
  {label: 'Basque', value: 'Basque'},{label: 'Bengali', value: 'Bengali'},
  {label: 'Bulgarian', value: 'Bulgarian'},{label: 'Catalan', value: 'Catalan'},
  {label: 'Cambodian', value: 'Cambodian'},{label: 'Chinese (Mandarin)', value: 'Chinese (Mandarin)'},
  {label: 'Croatian', value: 'Croatian'},{label: 'Czech', value: 'Czech'},
  {label: 'Danish', value: 'Danish'},{label: 'Dutch', value: 'Dutch'},
  {label: 'English', value: 'English'},{label: 'Estonian', value: 'Estonian'},
  {label: 'Fiji', value: 'Fiji'},{label: 'Finnish', value: 'Finnish'},
  {label: 'French', value: 'French'},{label: 'Georgian', value: 'Georgian'},
  {label: 'German', value: 'German'},{label: 'Greek', value: 'Greek'},
  {label: 'Gujarati', value: 'Gujarati'},{label: 'Hebrew', value: 'Hebrew'},
  {label: 'Hindi', value: 'Hindi'},{label: 'Hungarian', value: 'Hungarian'},
  {label: 'Icelandic', value: 'Icelandic'},{label: 'Indonesian', value: 'Indonesian'},
  {label: 'Irish', value: 'Irish'},{label: 'Italian', value: 'Italian'},
  {label: 'Japanese', value: 'Japanese'},{label: 'Javanese', value: 'Javanese'},
  {label: 'Korean', value: 'Korean'},{label: 'Latin', value: 'Latin'},
  {label: 'Latvian', value: 'Latvian'},{label: 'Lithuanian', value: 'Lithuanian'},
  {label: 'Macedonian', value: 'Macedonian'},{label: 'Malay', value: 'Malay'},
  {label: 'Malayalam', value: 'Malayalam'},{label: 'Maltese', value: 'Maltese'},
  {label: 'Maori', value: 'Maori'},{label: 'Marathi', value: 'Marathi'},
  {label: 'Mongolian', value: 'Mongolian'},{label: 'Nepali', value: 'Nepali'},
  {label: 'Norwegian', value: 'Norwegian'},{label: 'Persian', value: 'Persian'},
  {label: 'Polish', value: 'Polish'},{label: 'Portuguese', value: 'Portuguese'},
  {label: 'Punjabi', value: 'Punjabi'},{label: 'Quechua', value: 'Quechua'},
  {label: 'Romanian', value: 'Romanian'},{label: 'Russian', value: 'Russian'},
  {label: 'Samoan', value: 'Samoan'},{label: 'Serbian', value: 'Serbian'},
  {label: 'Slovak', value: 'Slovak'},{label: 'Slovenian', value: 'Slovenian'},
  {label: 'Spanish', value: 'Spanish'},{label: 'Swahili', value: 'Swahili'},
  {label: 'Swedish', value: 'Swedish'},{label: 'Tamil', value: 'Tamil'},
  {label: 'Tatar', value: 'Tatar'},{label: 'Telugu', value: 'Telugu'},
  {label: 'Thai', value: 'Thai'},{label: 'Tibetan', value: 'Tibetan'},
  {label: 'Tonga', value: 'Tonga'},{label: 'Turkish', value: 'Turkish'},
  {label: 'Ukrainian', value: 'Ukrainian'},{label: 'Urdu', value: 'Urdu'},
  {label: 'Uzbek', value: 'Uzbek'},{label: 'Vietnamese', value: 'Vietnamese'},
  {label: 'Welsh', value: 'Welsh'},{label: 'Xhosa', value: 'Xhosa'}
]);

useEffect(() => {
  //Runs only on the first render
  //get user profile info
  getUserInfo()
}, []);

const getUserInfo = async () =>{

  const userProfileInformation =  (await profilesDB.doc(auth().currentUser.uid).get()).data()
  setProfilePicURL(userProfileInformation.ProfilePic)
  setFacebookLink(userProfileInformation.FacebookURL)
  setlinkedinLink(userProfileInformation.LinkedinURL)
  setInterest(userProfileInformation.Interest)
  setAboutYourSelf(userProfileInformation.aboutYourSelf)
  setLanguages(userProfileInformation.Languages)

}

const uploadImage = async (image) => {

  const imageUri = image;

 console.log ('Local', image)

  let filename = imageUri.substring(imageUri.lastIndexOf('/')+ 1);

  try {

    const imgUploadRef = storage().ref(filename)

    await imgUploadRef.putFile(imageUri);

    const imURL= await imgUploadRef.getDownloadURL();
    console.log(imURL);
    if(imURL){
      console.log('new URL',imURL)
      setNewProfilePicURL(imURL)

    }

  } catch (e) {
    console.log(e);
    
  }
      
  }

const chooseProfilePic = () =>{
  Alert.alert(
    "Profile Picture",
    "Please Select How You Want To Upload",
    [
      {
        text: "Camera",
        onPress: profilePicCam,
      },
      {text: ""},
      {
        text: "Gallary",
        onPress: profilePicGallary,
      },
    ],
    {cancelable: true}
  );

}

const profilePicGallary = () =>{
  ImagePicker.openPicker({
    cropping: true
  }).then(image => {
    setNewProfilePic(image)
    uploadImage(image.path)
  });
}

const profilePicCam = () =>{
  ImagePicker.openCamera({
    cropping: true,
  }).then(image => {
    setNewProfilePic(image)
    uploadImage(image.path)
  });
}


const updatePressed = () =>{

  console.log("PRESSED")

  profilesDB.doc(auth().currentUser.uid).update({
    ProfilePic : newProfilePicURL,
    FacebookURL : facebookLink,
    LinkedinURL : linkedinLink,
    Interest : interest,
    aboutYourSelf : aboutYourSelf,
    Languages : value,
    isProfileCompleted: true

    })

    navigation.navigate(`View Profile`)}

  return (

    <View style={{flexDirection: "column", justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}}>

    <ScrollView>
      <Text style={styles.headerTitle}>Profile</Text>
          <View style={{flexDirection:"column",margin:10,marginVertical:2}}>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'flex-start'}}>
          <Text style = {{ paddingBottom: 8,marginBottom : 5,marginHorizontal:5}}>Profile Picture</Text>    
              </View>
          <TouchableOpacity onPress={chooseProfilePic}>
            <Text style={{color:'#0999f4', fontWeight: '500'}}> Change </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical:10}}>
          {/* {photoID !== null && <Image source={{uri:photoID.path}} style={{  width: 150,height: 150,borderColor: 'gray',borderWidth:0.5,resizeMode:'contain'}} />}   */}
         {newProfilePic === null && <Image source={{uri:profilePicURL}} 
                  style={{width: 70, height: 70, borderRadius: 400/ 2,resizeMode:'contain'}} />}

          {newProfilePic !== null &&  <Image source={{uri:newProfilePic.path}} 
                  style={{width: 70, height: 70, borderRadius: 400/ 2,resizeMode:'contain'}} /> }
         


        </View>

      </View>
      <Text style = {{ paddingBottom: 8,marginBottom : 5,marginHorizontal:15}}>Facbook Link</Text>
        <View style = {styles.formField}>
        <Ionicons style={{ paddingVertical: 4}} name='logo-facebook' size={18} color='#283239' />
        <TextInput placeholder={facebookLink} style = {styles.formInput}
          value={facebookLink} onChangeText={setFacebookLink}/>
        </View>

        <Text style = {{ paddingBottom: 8,marginBottom : 5,marginHorizontal:15}}>Linkedin ID</Text>
        <View style = {styles.formField}>
        <Ionicons style={{ paddingVertical: 4}} name='logo-linkedin' size={18} color='#283239' />
        <TextInput placeholder={linkedinLink} style = {styles.formInput}
          value={linkedinLink} onChangeText={setlinkedinLink} />
        </View>
        
        {/* <View style={styles.dropField}>
        <Fontisto style={{ paddingVertical: 17}} name='genderless' size={16} color='#283239' />
          <DropDownPicker style = {styles.dropInput}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                multiple={true}
                min={1}
                placeholder={"Select Language"}

                dropDownDirection="BOTTOM"
                showBadgeDot={true}
                textStyle={{
                  fontSize: 14,
                  opacity: 0.5
                }}

                dropDownContainerStyle={{
                  backgroundColor: "#fff",
                  width: 340,
                  borderWidth:0,
                  opacity: 1,
                  minHeight: 100,
                  zIndex: -999
                 
      
                }}

                scrollViewProps={{
                  decelerationRate: "fast"
                }}

                searchTextInputProps={{
                  maxLength: 25
                }}

                
              />
        </View> */}

        <Text style = {{ paddingBottom: 8,marginBottom : 5,marginHorizontal:15}}>Interests</Text>
        <View style = {styles.formField}>
        <Ionicons style={{ paddingVertical: 4}} name='heart-outline' size={18} color='#283239' />
        <TextInput placeholder={interest} style = {styles.formInput}
          value={interest} onChangeText={setInterest}/>
        </View>

        <Text style = {{ paddingBottom: 8,marginBottom : 5,marginHorizontal:15}}>About Yourself</Text>
        <View style = {styles.formField}>
        <Ionicons style={{ paddingVertical: 4}} name='list' size={18} color='#283239' />
        <TextInput placeholder={aboutYourSelf} style = {{ backgroundColor: '#e3f3fd',flex: 1,paddingVertical:0,height:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}}
          value={aboutYourSelf} onChangeText={setAboutYourSelf} multiline={true}/>
        </View>
        

        <TouchableOpacity onPress={updatePressed} style = {styles.customBTN}>
            <Text style={styles.textBTN}>Update</Text>
        </TouchableOpacity>

        </ScrollView>

</View>
      
     
  );
};



export default EditProfileScreen;

