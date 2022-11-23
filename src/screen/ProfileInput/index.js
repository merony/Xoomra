import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {cUserDB, profilesDB, usersDB} from '../../data/firRef';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import SelectList from 'react-native-dropdown-select-list'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import styles from './styles'

const ProfileInputScreen = ({navigation, props}) => {
    
    const [facebookLinkFromUI,setFacebookLinkFromUI] = useState("")
    const [linkedinLinkFromUI,setlinkedinLinkFromUI] = useState("")
    const [interestFromUI,setInterestFromUI] = useState("")
    const [aboutYourSelfFromUI,setAboutYourSelfFromUI] = useState("")
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
      profilesDB.doc(auth().currentUser.uid).set({
        uid : auth().currentUser.uid,
        email : auth().currentUser.email,
        overallRating:5,
        isProfileCompleted: false,
        
       
})
     
    }, []);


    const savePressed = () =>{

      console.log("PRESSED")

      profilesDB.doc(auth().currentUser.uid).update({
        FacebookURL : facebookLinkFromUI,
        LinkedinURL : linkedinLinkFromUI,
        Interest : interestFromUI,
        aboutYourSelf : aboutYourSelfFromUI,
        Languages : value,
        isProfileCompleted: true

        })

        navigation.navigate('Verification Screen')
    }

    return (

      <View style={{flexDirection: "column", justifyContent: 'center', marginTop: 15, paddingTop: 0, marginLeft: 15, marginRight: 15}}>


          <Text style={styles.headerTitle}>Profile</Text>

          <ScrollView>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='logo-facebook' size={18} color='#283239' />
            <TextInput placeholder='Facebook URL' style = {styles.formInput}
              value={facebookLinkFromUI} onChangeText={setFacebookLinkFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='logo-linkedin' size={18} color='#283239' />
            <TextInput placeholder='Linkedin ID' style = {styles.formInput}
              value={linkedinLinkFromUI} onChangeText={setlinkedinLinkFromUI} />
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='heart-outline' size={18} color='#283239' />
            <TextInput placeholder='Interest' style = {styles.formInput}
              value={interestFromUI} onChangeText={setInterestFromUI}/>
            </View>

            <View style = {styles.formField}>
            <Ionicons style={{ paddingVertical: 4}} name='list' size={18} color='#283239' />
            <TextInput placeholder='Tell us more about yourself' style = {{ backgroundColor: '#e3f3fd',flex: 1,paddingVertical:0,height:100,textAlign:'left',textAlignVertical:'top',paddingVertical:4}}
              value={aboutYourSelfFromUI} onChangeText={setAboutYourSelfFromUI} multiline={true}/>
            </View>
            

            <View style={styles.dropField}>

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
            </View>


            <TouchableOpacity onPress={savePressed} style = {styles.customBTN}>
                <Text style={styles.textBTN}>Save</Text>
            </TouchableOpacity>

            </ScrollView>

            <View style={{marginTop:100}}>
          

            </View>
           

    </View>
        
       
    );
  };
  
 
  
  export default ProfileInputScreen;