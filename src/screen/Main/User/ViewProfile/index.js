import {
    FlatList,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    Linking,
    View
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { profilesDB,usersDB,verificationsDB,AccommodationsDB } from '../../../../data/firRef';
import auth from '@react-native-firebase/auth'
import React from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import places from '../../../../data/stayFeed';
import chats from '../../../../data/chats';
import ReviewListItem from '../../../../components/ReviewListItem';
import ScrollTopView from 'react-native-scrolltotop';

const ViewProfileScreen = ({navigation, props}) => {

const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [address,setAddress] = useState('')
const [mobileNumber,setMobileNumber] = useState('')
const [emergencyContactEmail,setEmergencyContactEmail] = useState('')
const [emergencyContactNumber,setEmergencyContactNumber] = useState('')
const [profilePicURL,setProfilePicURL] = useState('')
const [facebookLink,setFacebookLink] = useState("")
const [linkedinLink,setlinkedinLink] = useState("")
const [emailAddress,setEmailAddress] = useState("")
const [overallRating,setOverallRating] = useState('')
const [interest,setInterest] = useState("")
const [aboutYourSelf,setAboutYourSelf] = useState("")
const [Languages,setLanguages] = useState([])
const [isVerified,setIsVerified] = useState(null)
const [userAccommodationsData,setUserAccommodationsData] = useState(null)
const [isLoading,setIsLoading] = useState(true)

  const getUserInfo = async () =>{

    // Getting Profile Info from Database 
    const userProfileInformation =  (await profilesDB.doc(auth().currentUser.uid).get()).data()
    setProfilePicURL(userProfileInformation.ProfilePic)
    setFacebookLink(userProfileInformation.FacebookURL)
    setlinkedinLink(userProfileInformation.LinkedinURL)
    setInterest(userProfileInformation.Interest)
    setAboutYourSelf(userProfileInformation.aboutYourSelf)
    setLanguages(userProfileInformation.Languages)
    setOverallRating(userProfileInformation.overallRating)
    setEmailAddress(userProfileInformation.email)
    console.log(profilePicURL)
 
    // Getting Personal Info From Database
    const userPersonalInformation =  (await usersDB.doc(auth().currentUser.uid).get()).data()
    setFirstName(userPersonalInformation.firstName)
    setLastName(userPersonalInformation.lastName)
    setAddress(userPersonalInformation.Address)
    setMobileNumber(userPersonalInformation.mobile)
    setEmergencyContactEmail(userPersonalInformation.emergencyEmail)
    setEmergencyContactNumber(userPersonalInformation.emergencyMobile)

    const userVerificationInformation = (await verificationsDB.doc(auth().currentUser.uid).get()).data()
    setIsVerified(userVerificationInformation.isVerified)

    const userAccommodations = await AccommodationsDB.where(`uid`,`==`,auth().currentUser.uid).get()
    // console.log('userAccompdations',userAccommodations.docs[0].data())
    if (userAccommodations.docs.length === 0){
      console.log("NO LISTING")
    }
    else{
    setUserAccommodationsData(userAccommodations.docs[0])
    // console.log(userAccommodationsData.data())
    }
    setIsLoading(false)

  }

  useEffect(() => {
    //Runs only on the first render
    //get user profile info
    getUserInfo()
  }, []);

  const openFB = () =>{
    let url = facebookLink
    Linking.openURL(url)
  }
  const openLK = () =>{
    let url = linkedinLink
    Linking.openURL(url)
  }

  const dummyDataUserProfile = 
    {
      name:'John Lukas',
      image:'https://dw9to29mmj727.cloudfront.net/properties/2016/2830-SeriesThumb_NARSHP_400x320.jpg',
      overAllRating:4.92,
      reviews:['2','312','231'],
      phoneNumber:'12345',
      FacebookU:'www.facebook.com',
      Intrests:'If you decide to go this route, you’ll need to submit a letter of interest to the desired company (along with your fine-tuned resume). Read on for a concise definition and find out how to write a letter of interest for a job. We’ve also included some successful letter of interest samples.',
      Languages:['Albanian','Shanghaiese','Southern Quechua'],
      LinkedinURL:'www.linkin.com',
      aboutYourSelf:'Many companies don’t advertise all of their positions externally. It can be worthwhile to submit an application to a company that isn’t in the midst of hiring. There’s a chance they may need your expertise, and you may even be the perfect fit.',
      email:'rafikk@gmail.com',
      isProfileCompleted:true,
      uid:"DVH5oztnIZZIwHOsBg4iulEd3q82"
    }
  const dummyDataReviews = chats
  const dummyDataUserListing = places[0]

  const returnLanguage = (arrOfLanguages) =>{
    let temp

    if(arrOfLanguages.length === 0 || !arrOfLanguages){
      temp=''
    }else if(arrOfLanguages.length===1){
      temp = `Speaks ${arrOfLanguages[0]}`
    }else{
      temp = `Speaks ${arrOfLanguages[0]}`
      for(let i = 1;i<arrOfLanguages.length;i++){
        if(i === (arrOfLanguages.length-1)){
          temp = temp.slice(0,temp.length) + ` and ${arrOfLanguages[i]}.`
        }else{
          temp +=  `, ` 
          temp+= `${arrOfLanguages[i]}`
        }
      }
    }

    return temp
  }
  const ReturnVerifiedUser = (propsV) =>{
    let temp
    if(propsV.isVerified){
      temp = 
        <View style={styles.subContainer1}>
          <MaterialIcons name='verified-user' size={18} color={'#283239'} style={{paddingTop:6}}/>
          <Text style={styles.stayDetailsSubTitle}>Verified user </Text>
        </View>
    }else{
      temp = 
      <View style={styles.subContainer1}>
      <Entypo name="cross" size={22} color={'#283239'} style={{paddingTop:6}} />
      <Text style={styles.stayDetailsSubTitle}>Unverified user </Text>
    </View>
    }

    return temp
  }
  const ReturnIdentity = (propsI) =>{
    let temp
    if(propsI.isVerified){
      temp = 
          <View style={styles.subContainer1}>
        <Fontisto name="check" size={12} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
        <Text style={styles.stayDetailsSubTitle}>Identity Verified</Text>
      </View>
    }else{
      temp = 
       <View style={styles.subContainer1}>
      <Entypo name="cross" size={22} color={'#283239'} style={{paddingTop:6}} />
      <Text style={styles.stayDetailsSubTitle}>Identity Unverified</Text>
    </View>
    }
    
    return temp
  }
  const ReturnEmail = (propsE) =>{
    let temp
    if(propsE.email!==''){
      temp =
        <View style={styles.subContainer1}>
          <Fontisto name="check" size={12} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
          <Text style={styles.stayDetailsSubTitle}>Email address </Text>
        </View>
    }else{
      temp = 
      <View style={styles.subContainer1}>
      <Entypo name="cross" size={22} color={'#283239'} style={{paddingTop:6}} />
      <Text style={styles.stayDetailsSubTitle}>Email address </Text>
    </View>
    }

    return temp
  }

  const ReturnPhone = (propsP) =>{
    let temp
    if(propsP.phone!==""){
      temp =
      <View style={styles.subContainer1}>
        <Fontisto name="check" size={12} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
        <Text style={styles.stayDetailsSubTitle}>Phone number </Text>
      </View>
    }else{
      temp = null
    }

    return temp
  }

  const ReturnFacebook = (propsP) =>{
    let temp
    if(propsP.FacebookU!==""){
      temp =
      <TouchableOpacity 
        style={styles.subContainer1}
        onPress={openFB}>
        <MaterialIcons name='facebook' size={20} color={'#283239'} style={{paddingTop:6}}/>
        <Text style={styles.stayDetailsSubTitleLink}>Facebook </Text>
      </TouchableOpacity>
    }else{
      temp = null
    }

    return temp
  }
  const ReturnLinkedin = (propsP) =>{
    let temp
    if(propsP.LinkedinURL!==""){
      temp =
      <TouchableOpacity 
        style={styles.subContainer1}
        onPress={openLK}>
        <Fontisto name="linkedin" size={16} color={'#283239'} style={{paddingTop:6,paddingLeft:3}} />
        <Text style={styles.stayDetailsSubTitleLink}>Linkedin </Text>
      </TouchableOpacity>
    }else{
      temp = null
    }

    return temp
  }

  const MainViewWithData = () =>{
    let view = 
    <View style={{flexDirection: "column"}}>
    <ScrollView style={{paddingHorizontal:20}}>
      {/* personal info container */}
      <View style={styles.subContainer2}>

        <Image 
          source={{uri:profilePicURL}}
          style={styles.image}/>

        <Text style={styles.name}>Hi, I'm {firstName} {lastName}</Text>

        <Text>{returnLanguage(Languages)}</Text>

        {overallRating >= 4.5 && <View style={styles.subContainer1}>
          <Fontisto name="check" size={12} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
          <Text style={styles.stayDetailsSubTitle}>Superhost </Text>
        </View>}


        <View style={styles.subContainer1}>
          <Fontisto name="star" size={15} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
          <Text style={styles.stayDetailsSubTitle}>{overallRating} Rating </Text>
        </View>

        <ReturnVerifiedUser isVerified={isVerified} />

      </View>

      {/* verification container */}
      <View style={styles.subContainer2}>

        <Text style={styles.name1}>{firstName} {lastName} confimed</Text>

        <ReturnIdentity isVerified={isVerified}/>

        <ReturnEmail email={emailAddress}/>

        <ReturnFacebook FacebookU={facebookLink}/>

        <ReturnLinkedin LinkedinURL={linkedinLink}/>

      </View>

      {/* listing container */}
      <View style={styles.subContainer2}>

        <Text style={styles.name1}>{firstName} {lastName}'s' listing</Text>

        {/* image */}
        {userAccommodationsData !== null && <Image style={styles.image1}source={{uri: userAccommodationsData.data().images[0]}}/>}

        {/* title */}
        {userAccommodationsData !== null && <Text style={styles.stayDetailsSubTitle1}>{userAccommodationsData.data().StayTitle}</Text>}

        {/* location */}
        {userAccommodationsData !== null && <Text style={styles.stayDetailsSubTitle1}>{userAccommodationsData.data().City} , {userAccommodationsData.data().Country}</Text>}
      </View>

      {/* reviews container */}
      {/* <View style={styles.subContainer2}>
        <Text style={styles.name1}>{dummyDataReviews.length} reviews</Text> */}
        {/* review container */}
        {/* <View style={styles.listContainer1}>

          <FlatList
            data={dummyDataReviews}
            renderItem={({item}) => <ReviewListItem review={item} />}
          />
        </View> */}

      {/* </View> */}


    </ScrollView>

  </View>
  return view
  }

  return (
    // <View style={{flexDirection: "column"}}>
    //   <ScrollView style={{paddingHorizontal:20}}>
    //     {/* personal info container */}
    //     <View style={styles.subContainer2}>

    //       <Image 
    //         source={{uri:profilePicURL}}
    //         style={styles.image}/>

    //       <Text style={styles.name}>Hi, I'm {firstName} {lastName}</Text>

    //       <Text>{returnLanguage(Languages)}</Text>

    //       {overallRating >= 4.5 && <View style={styles.subContainer1}>
    //         <Fontisto name="check" size={12} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
    //         <Text style={styles.stayDetailsSubTitle}>Superhost </Text>
    //       </View>}


    //       <View style={styles.subContainer1}>
    //         <Fontisto name="star" size={15} color={'#283239'} style={{paddingTop:6,paddingLeft:2}} />
    //         <Text style={styles.stayDetailsSubTitle}>{overallRating} Rating </Text>
    //       </View>

    //       <ReturnVerifiedUser isVerified={isVerified} />

    //     </View>

    //     {/* verification container */}
    //     <View style={styles.subContainer2}>

    //       <Text style={styles.name1}>{firstName} {lastName} confimed</Text>

    //       <ReturnIdentity isVerified={isVerified}/>

    //       <ReturnEmail email={emailAddress}/>

    //       <ReturnFacebook FacebookU={facebookLink}/>

    //       <ReturnLinkedin LinkedinURL={linkedinLink}/>

    //     </View>

    //     {/* listing container */}
    //     <View style={styles.subContainer2}>

    //       <Text style={styles.name1}>{firstName} {lastName}'s' listing</Text>

    //       {/* image */}
    //       <Image style={styles.image1}source={{uri: userAccommodationsData.data().images[0]}}/>

    //       {/* title */}
    //       <Text style={styles.stayDetailsSubTitle1}>{userAccommodationsData.data().StayTitle}</Text>

    //       {/* location */}
    //       <Text style={styles.stayDetailsSubTitle1}>{userAccommodationsData.data().City} , {userAccommodationsData.data().Country}</Text>
    //     </View>

    //     {/* reviews container */}
    //     <View style={styles.subContainer2}>
    //       <Text style={styles.name1}>{dummyDataReviews.length} reviews</Text>
    //       {/* review container */}
    //       <View style={styles.listContainer1}>

    //         <FlatList
    //           data={dummyDataReviews}
    //           renderItem={({item}) => <ReviewListItem review={item} />}
    //         />
    //       </View>

    //     </View>


    //   </ScrollView>

    // </View>
    <View>
    {isLoading && <Text> LOADING</Text>}
    {!isLoading && <MainViewWithData/>}
      
    </View>
  );
  };
  
 
  
  export default ViewProfileScreen;