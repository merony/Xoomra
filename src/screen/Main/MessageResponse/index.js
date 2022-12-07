import {AccommodationsDetailsDB, ExchangeDB, MessagesDB, UserMessages, usersDB} from '../../../data/firRef';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {cAccommodationsDB, cMessagesDB, cUserDB} from '../../../data/firCuRef';
import { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Entype from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { GoogleSocialButton } from "react-native-social-buttons";
import InputBoxInMessage from '../../../components/InputBoxInMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessageResponseItem from '../../../components/MessageResponseItem';
import MrotherUser from '../../../components/MrotherUser';
import React from 'react';
import StayInfoGuestInMessageComponent from '../../../components/StayInfoInMessage/indexGuest';
import StayInfoInMessageComponent from '../../../components/StayInfoInMessage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messages from '../../../data/message';
import places from '../../../data/stayFeed';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const MessageResponseScreen = ({navigation, props, route}) => {


  const {data} = route.params;

  const [allMessages, GetAllMessages] = useState([]); 

  const [myExchnageListing, GetMyExchnageListing] = useState([]);
  const [myListing, GetMyListing] = useState([]); 

  const [otherExchnageListing, GetOtherExchnageListing] = useState([]); 

  const [otherListing, GetOtherListing ] = useState([]); 


  const currentMessageDB = MessagesDB.doc(data.messageId).collection('Message').orderBy('created_at').limit(30)

  const sendMessageDB = MessagesDB.doc(data.messageId).collection('Message')
  // .where( "seen", "==", false)

  const myExchnageListingDB = ExchangeDB.doc(data.messageId).collection(data.hostingId).doc(data.host.docID)

  const myListingDB = AccommodationsDetailsDB.doc(data.host.docID)

  const otherExchnageListingDB = ExchangeDB.doc(data.messageId).collection(auth().currentUser.uid).doc(data.listingId)

  const otherListingDB = AccommodationsDetailsDB.doc(data.listingId)

  const [inputText,setInputText] = useState('')


  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [openBottom,setOpenBottom]=useState(false)
  const[openTop,setOpenTop]=useState(false)

  const[openMsgWait,setOpenMsgWait]=useState(false)
  const[openMsgConfirm,setOpenMsgConfirm]=useState(false)
  const[openAcceptButton,SetOpenAcceptButton]=useState(true)
  const[openRejectButton,SetOpenRejectButton]=useState(true)
  const[openMyListing,setOpenMyListing]=useState(false)



  const [availabilityFrom,setavailabilityFrom] = useState(new Date())
  const [availabilityTo,setavailabilityTo] = useState(new Date())


  const exStatus =["Interested", "Accepted", "Rejected", "Exchanged"]


  let myReqdata = [];

  let myListingData = [];

  let otherExchangeListinData = [];

  let otherListingData = [];

  let allMessage = []

  // otherExchnageListing.checkInDate
  // checkOutDate


  // console.log("Exchnage data", data)



  const getCheckinDate = () => {
   
    const date = new Date(myExchnageListing?.checkOutDate?.seconds*1000);
    const options = {   year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    // console.log('What day is it', today);

    // console.log ('consol', myExchnageListing?.checkOutDate?.seconds)

    return today;
  }

  const getCheckOutDate = () => {
   
    const date = new Date(myExchnageListing?.checkInDate?.seconds*1000);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    // console.log('What day is it', today);

    return today;
  }

  const confrim=()=>{


  }

  const accept=()=>{



    if ( myExchnageListing.status === exStatus[0] && otherExchnageListing.status === exStatus[1] ){

     

      myExchnageListingDB.update({


        status : exStatus[1]
  
  
      })


      ExchangeDB.doc(data.messageId).update({

        status : exStatus[3]


      }).then(() => {
  
        loadData()
  
        loadDataEx()

        SetOpenAcceptButton(false)
        SetOpenRejectButton(false)
        setOpenMsgWait(false)
        setOpenMsgConfirm(true)

        console.log ('Great. Exchanged has been complete. Please visit the My trip page for details')
  
      })



  }else if (myExchnageListing.status === exStatus[0] && otherExchnageListing.status === exStatus[0]){



    myExchnageListingDB.update({


      status : exStatus[1]


    }).then(() => {

      loadData()

      loadDataEx()

      SetOpenAcceptButton(false)

      setOpenMsgWait(true)

      console.log ('You have accpeted the request. Please wait for other xoomer to accpet your request')


    })

   

  }else if (otherExchnageListing.status === exStatus[2]){

    console.log ('Sorry other Xoomer not willing to exchange')

  }else{

    Alert.alert('Please Set status of your new request at first')
  }


  }

  const reject=()=>{


    myExchnageListingDB.update({


      status : exStatus[2]


    })


    ExchangeDB.doc(data.messageId).update({

      status : exStatus[2]


    }).then(() => {

      loadDataOther();
      loadData()
      loadDataEx()


    })


  }




  const interested=()=>{
  
    if(availabilityFrom&&availabilityTo){
      otherExchnageListingDB.update({

        status: exStatus[0],
        checkInDate:availabilityFrom  ,
        checkOutDate:availabilityTo 
  
      })

      setOpenBottom(false)
      setOpenTop(true)
      setOpenMyListing (true)

      loadDataOther();
      loadData()
      loadDataEx()
    }
    else{
      console.log("Error=====>")
    }
 
  }

  const modify=()=>{
       
    if(availabilityFrom&&availabilityTo){
      otherExchnageListingDB.update({

        checkInDate: availabilityFrom ,
        checkOutDate:availabilityTo
  
      })
      loadDataOther();
      loadData()
      loadDataEx()
alert("dates has been updated")
    }
    else{
      console.log("Error=====>")
    }
  }


  const loadDataEx = async () => {


    try{

      await otherExchnageListingDB.get()
      .then(querySnapshot => {
    
    
        otherExchangeListinData = querySnapshot.data()
    
        GetOtherExchnageListing(otherExchangeListinData)
    
        console.log('otherExchnageListing Data', querySnapshot.data())
    
        
      }) 

    }catch(error){

      console.log("otherExchnageListing not", error);


    }

    try {


      await myExchnageListingDB.get()
      .then(querySnapshot => {
     
    
        // myExchnageListing.push(querySnapshot.data())
    
        myReqdata = querySnapshot.data()
    
        GetMyExchnageListing (myReqdata)
    
        // console.log('My Exchange Data', querySnapshot.data().checkOutDate)
        
      }) ;
    


    }catch(error) {

      console.log('myExchnageListingDB', error)
    }

  }

 const loadData = async () => {

    await currentMessageDB.get()
    .then(querySnapshot => {

      querySnapshot.forEach((doc) => {


        // allMessage = doc.data()

        // allMessages.push(doc.data())

        allMessage.push(doc.data())


        sendMessageDB.doc(doc.id).update({
          seen : true,
        })

        // allMessages.push (doc.data().filter(elem => elem.seen === false))

        // console.log("Message Filter", doc.data().filter(elem => elem.seen === 'false') )

      });

      GetAllMessages(allMessage);

      console.log('Message Seen', allMessages )

      // console.log('All Chat Message', allMessages[0] )

  });




  await myListingDB.get()
  .then(querySnapshot => {
    
    myListingData = querySnapshot.data()

    GetMyListing(myListingData)
    // console.log('myListing Data', myListing.images[0])


  }) ;



};



const loadDataOther = async () => {


  
  try {

    await otherListingDB.get()
    .then(querySnapshot => {
  
      otherListingData = querySnapshot.data()
  
      // otherListing.push(querySnapshot.data())
  
      GetOtherListing(otherListingData)
  
      console.log('otherListing Data', otherListingData)
  
    }) ;


  }catch(error){

    console.log ('Mylisting DB', error)
  }


};

;


  useEffect(() => {
    //Runs on every render

    // test();

    


  });

  useEffect(() => {


    // ExchangeDB.doc(data.messageId).listOfCollections()
    // .then((c) => {

    //   console.log('collections name', c)
    // })


    loadData().then(() => {

    })
    loadDataOther();

    loadDataEx().then(() => {


      if (otherExchangeListinData.status === null){

        console.log ('Its Working', otherExchangeListinData.status)
        
  setOpenBottom(true)
  setOpenTop(false)

  
      }else if (myReqdata.status === exStatus[1] && otherExchangeListinData.status === exStatus[0]){
        
        SetOpenAcceptButton(false)

        setOpenMsgWait(true)
        setOpenTop(true)
        setOpenMyListing(true)

      } else if (myReqdata.status === exStatus[1] && otherExchangeListinData.status === exStatus[1]){
        
        SetOpenAcceptButton(false)
        setOpenMsgWait(false)
        SetOpenRejectButton (false)
        setOpenTop(true)
        setOpenMyListing(true)
        setOpenMsgConfirm(true)

      }
       else{
  
        console.log ('Its Working not', otherExchnageListing.status, otherExchangeListinData.status)

        setOpenTop(true)
        setOpenMyListing(true)
  
      }
    })

 
   
  }, [false]);


  //get data of host and guest (host is the current user),the listing of current  will be displayed on top
  //send data as chatData to component
  //if both users orders' status do not contain unreceived, received or rejected, show input box




  
  // const sendMSG = () =>{


  //   sendMessageDB.add({

  //     created_at: new Date() ,
  //     exchangeID: data.messageId,
  //     fromID: auth().currentUser.uid,
  //     fromName: myExchnageListing.hostName,
  //     toID: myExchnageListing.uid,
  //     text: inputText,
  //     seen: false,


  //   }).then(() => {

  //     loadNewMessage();

  //     setInputText(' ');

  //     console.log('message sent')
  //   });

  // }


  const sendMSG = useCallback(
    function () {
      sendMessageDB.add({

        created_at: new Date() ,
        exchangeID: data.messageId,
        fromID: auth().currentUser.uid,
        fromName: myExchnageListing.hostName,
        toID: myExchnageListing.uid,
        text: inputText,
        seen: false,
  
  
      }).then(function () {
        
          // loadNewMessage();
          setInputText(' ');
          console.log('message sent')
        })
    },
    [inputText]
  )


// const loadNewMessage = async () => {


//   try {

    
//     await sendMessageDB.where( "seen", "==", false).orderBy('created_at').get()
//     .then(querySnapshot => {

  
//       querySnapshot.forEach((doc) => {
  
  
//         // console.log ('doc id' , doc.data())


//         // newMsg.push(doc.data())

//         allMessages.push(doc.data())
  
  
//       });

//       GetAllMessages([...allMessages]);

//       console.log ('newMsg DB', allMessages)


  
//   });


//   }catch(error){

//     console.log ('loadNewMessage DB', error)
//   }

  
// }


    
    
    return (
      
      <View style={styles.container}>
        {/* stay */}
      {openMyListing&&
        <View style={styles.mainContainer}>
        {/* <StayInfoInMessageComponent cData={stayInfoDataHost()}/> */}
                
    {/* mainContainer */}

    <Image source={{uri: myListing?.images?.[0]}} style={styles.image}/>

    <View style={styles.column}>
      <Text 
        style={styles.title} 
        numberOfLines={1}
        onPress={'listPressed'}>
        {myExchnageListing.StayTitle}
        
      </Text>

      <View style={{flexDirection:'row'}}>

      <Text>{myExchnageListing.hostName} </Text>
      <Text style={{marginHorizontal:5}}>-</Text>
        <Text>{myExchnageListing.status}</Text>
        <Text style={{marginHorizontal:5}}>·</Text>
      

      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between', width:300}}>

       


        <View style={{flexDirection:'column', marginTop: 5}}>

            <View>
            <Text>From {getCheckinDate()}</Text>

            <Text>To {getCheckOutDate()}</Text>
            </View>
            {openMsgWait&&
            <View style={{marginTop: 5, marginBottom: 5}}>
              <Text>Great.Please wait for other{"\n"}xoomer to accpet your request</Text>
            </View>
            
            }

              {openMsgConfirm&&
            <View style={{marginTop: 5, marginBottom: 5}}>
              <Text>Great. Exchanged has been complete. Please visit the My trip page for details</Text>
            </View>
            
            }
            

          
        </View>

        <View style={{flexDirection:'column', justifyContent:'flex-end',}}>

          {openAcceptButton&&
          
          <Pressable 
          style={[styles.listingContainer,{backgroundColor:"#1ea3f7",justifyContent:'space-evenly' }]}
          onPress={accept}>
            {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
            <Text style={{color:"white", textAlign:"center"}}>Accept</Text>
        </Pressable>}


        {/* <Pressable 
          style={[styles.listingContainer,{backgroundColor:"green",justifyContent:'space-evenly' }]}
          onPress={''}>
            <Text style={{color:"white", textAlign:"center"}}>Confirmed</Text>
        </Pressable> */}
        {openRejectButton&&

      <Pressable 
       style={[styles.listingContainer,{backgroundColor:"#f71e89", justifyContent:'space-evenly' }]}
        onPress={reject}>
      {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
      <Text style={{color:"white", textAlign:"center", justifyContent:"center"}}>Reject</Text>
      </Pressable>}


        {/* if user is a guest, has received a request from the host, 
        there will be an option on the top right corner */}
        </View>
       
      </View>

    </View>

      </View>}


{openTop&&<View>
<MrotherUser
 otherListing={otherListing}
 otherExchnageListing={otherExchnageListing}
 setOpen={setOpen}
 open={open}
 availabilityTo={availabilityTo}
 availabilityFrom={availabilityFrom}
 setavailabilityFrom={setavailabilityFrom}
 setOpenTo={setOpenTo}
 openTo={openTo}
 modify={modify}
 setavailabilityTo={setavailabilityTo}
 />
</View>}

        

        {/* message list */}
        <View style={styles.listContainer}>
        <Text style={[styles.title , {margin :20, marginTop:20, }]} > Message To Your Xoomer</Text>
          <FlatList 
            data={allMessages} 
            renderItem={({item}) => <MessageResponseItem message={item}/>}
            // inverted
            style={styles.list}
          />
        </View>

{openBottom&&
        <View style= {{ flexDirection: "row", padding: 20, justifyContent: 'space-between', backgroundColor: '#fff', marginLeft: 10,}} >
    
        <View style= {{ flexDirection: "column",  justifyContent: 'flex-start',}} >
           <Text style={styles.title} >New Request</Text>
            
        
            <View style= {{marginTop: 10, marginLeft: 0,}}>
        
          <Text onPress={() => setOpen(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>From</Text>
          <Text  style={{fontSize: 14}}>{availabilityFrom.toDateString()}</Text>
          <Text onPress={() => setOpenTo(true)} style={{marginHorizontal: 0, fontSize: 14, fontWeight: 'bold'}}>To</Text>
          <Text  style={{fontSize: 14}}>{availabilityTo?.toDateString()}</Text>
              <DatePicker
                modal
                open={open}
                date={availabilityFrom}
                onConfirm={(date) => {
                  setOpen(false)
                  setavailabilityFrom(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
                  />
        
              <DatePicker
                modal
                open={openTo}
                date={availabilityTo}
                onConfirm={(date) => {
                  setOpenTo(false)
                  setavailabilityTo(date)
                }}
                onCancel={() => {
                  setOpenTo(false)
                }}
                  />
                  
            </View>
          
        </View>
        
        <View style= {{ flexDirection: "column"}}>
        
        <Text style={styles.title} >{otherListing.StayTitle} </Text>
        <Text>By {otherExchnageListing.hostName}</Text>
        
        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                    
                    <Pressable 
                      style={[styles.listingContainer,{backgroundColor:"green",justifyContent:'space-evenly' }]}
                      onPress={interested}>
                        {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
                        <Text style={{color:"white", textAlign:"center"}}>Interested</Text>
                    </Pressable>
          
                    <Pressable 
                       style={[styles.listingContainer,{backgroundColor:"#f71e89", justifyContent:'space-evenly' }]}
                      onPress={reject}>
                        {/* <MaterialIcons name='sensor-door' size={25} color={'#030f14'} style={{paddingLeft:5}}/> */}
                        <Text style={{color:"white", textAlign:"center", justifyContent:"center"}}>Reject</Text>
                    </Pressable>
          
                    {/* if user is a guest, has received a request from the host, 
                    there will be an option on the top right corner */}
                    </View>
        
        </View>
        
        <View>
        
        
        </View>
              
        </View>}





        {/* input box */}
        
        <View style={styles.inputBox}>
          {/* <InputBoxInMessage  cData={showInput()}/> */}
          <View style={{height:70}}>
          { /* //input  */}
          <View style={styles.inputContainerBeneathOption}>
            <TextInput 
              placeholder='Write a message' 
              value= {inputText}
              onChangeText={(text) => setInputText(text)}
              style={{flex:1}}
              // onFocus={() => setShouldShowIcon(true)}
              // onBlur={() =>setShouldShowIcon(false)}
            />
            <TouchableOpacity 
              onPress={sendMSG}>
              <MaterialIcons name='arrow-circle-up' size={30} color='#283239' />
            </TouchableOpacity>           
          </View>
        </View>
        </View>


    </View>
        
       
    );
  };
  
 
  
  export default MessageResponseScreen;
