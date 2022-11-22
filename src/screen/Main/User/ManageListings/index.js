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
import styles from './styles';
import places from '../../../../data/stayFeed';
import {Picker} from '@react-native-picker/picker';

const ManageListingScreen = ({navigation, props}) => {
    
const stays = places
const dummyDatalistings = [
  {
    stay:stays[0],
    isPublished:true,
  },
  {
    stay:stays[1],
    isPublished:false,
  },
  {
    stay:stays[2],
    isPublished:false,
  },
  {
    stay:stays[3],
    isPublished:true,
  }
]

const [selectedSubject, setSelectedSubject] = useState('');


    return (

      <View style={{flexDirection: "column"}}>
        
        {/* cell container */}
        <View>
          <Image/>

          {/* infoContainer */}
          <View>
            <Text>Title</Text>

            {/* rowContainer */}
            <View>
              <Text>Published</Text>

              <TouchableOpacity>
                <Text>EDIT</Text>
              </TouchableOpacity>

              <View style={styles.subContainer}>
                <Text style={styles.title}>Choose the Subject</Text>
                <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedSubject}
                  style={styles.picker}   
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedSubject(itemValue)
                  }>
                  <Picker.Item label="Hosting" value="host" />
                  <Picker.Item label="Traveling" value="guest" />
                  <Picker.Item label="General Experience" value="general experience" />
                </Picker>
              </View>
            </View>

          </View>

        </View>


      </View>
      </View>
        
       
    );
  };
  
 
  
  export default ManageListingScreen;