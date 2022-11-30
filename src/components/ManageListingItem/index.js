import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,Alert
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
import styles from './styles';
import SelectList from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

const ManageListingItem = (props) => {
    
  const listing = props.listing
  const navi = useNavigation()

  const ReturnPublished = (propR) =>{
    let temp 
    if(propR.isPublished){
      temp =
      <Text
        style={styles.published}>
        Published
    </Text>
    }else{
      temp = 
      <Text
        style={styles.unPublished}>
        Unpublished
      </Text>
    }
    return temp
  }
  const pickerData = [
    {key:'Delete',value:'Delete'},
    {key:'Publish',value:'Publish'},
    {key:'Unpublish',value:'Unpublish'},
  ]
  const [selected,setSelected] = useState('')
  const [isPublished1,setIsPublished1] = useState(listing.isPublished)

  
  //still need to operate the data base and refresh page.
  //especially the delete operation
  const deleteListing = () =>{
    //operation code here
    Alert.alert('Listing Deleted')
  }

  const publishListing = () =>{
    if(listing.isPublished){
      Alert.alert('Listing already published. No change will be made.')
    }else{
      listing.isPublished=true
      setIsPublished1(true)
      setSelected('Publish')
      Alert.alert('Listing Published')
    }
  }

  const unPublishListing = () =>{
    if(listing.isPublished){
      listing.isPublished=false
      setIsPublished1(false)
      setSelected('Unpublish')
      Alert.alert('Listing Unpublished')
    }else{
      Alert.alert('Listing already unpublished. No change will be made.')
    }
  }

  
  const showConfirm = (option) =>{
    switch (option) {
      case 'Delete':
        Alert.alert('Warning','Do you want to delete this listing?',[
          {text:'Confirm',onPress:() => deleteListing()},
          {text:'cancel',style:'cancel'}
        ])
        break;
      case 'Publish':
        Alert.alert('Warning','Do you want to publish this listing?',[
          {text:'Confirm',onPress:() => publishListing()},
          {text:'cancel',style:'cancel'}
        ])
        break;
      case 'Unpublish':
        Alert.alert('Warning','Do you want to unpublish this listing?',[
          {text:'Confirm',onPress:() => unPublishListing()},
          {text:'cancel',style:'cancel'}
        ])
        break;
    
      default:
        break;
    }
  }
  
  const pickerSelected = (val) =>{
    showConfirm(val)
  }


  const editPressed = () =>{
    navi.navigate('Edit Listing', {listingID: listing.stay.id})

  }
  
    return (

      <View style={{flexDirection: "column",marginVertical:12}}>

        {/* cell container */}
        <View style={styles.cellContainer}>
          <Image 
            source={{uri:listing.stay.image}}
            style={styles.image}
          />

            {/* infoContainer */}
          <View style={styles.infoContainer}>
            <Text 
              style={styles.title}
              numberOfLines={2}>
              {listing.stay.title}
            </Text>

            {/* rowContainer */}
            <View style={styles.rowContainer}>

              <ReturnPublished isPublished={listing.isPublished}/>

              <TouchableOpacity 
                onPress={editPressed}
                style={styles.edit}>
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>

              <View style={styles.subContainer}>
                <View style={styles.pickerContainer}>
                  {/* picker here */}
                  <SelectList 
                    placeholder={'Operations'}
                    data={pickerData} 
                    setSelected={(val) => {pickerSelected(val)}
                  }
                    boxStyles={styles.boxStyles}
                    inputStyles={styles.inputStyles}
                    dropdownStyles={styles.dropdownStyles}
                    search={false}/>
                </View>
              </View>
            </View>
          </View>
        </View>

    </View>
        
       
    );
  };
  
 
  
  export default ManageListingItem;
