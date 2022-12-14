import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

// form some reasons cUser not working. it shuld be get user id when a login but not

      
const usersDB = firestore()
.collection('users')
.doc("PersonalInformations")
.collection('user')


const profilesDB = firestore()
.collection('users')
.doc('Profiles')
.collection('profile')


const verificationsDB = firestore()
.collection('users')
.doc('Verifications')
.collection('verification')



const AccommodationsDB = firestore()
.collection('Accommodations')
.where( "Status", "==", "published")


const MyAccommodationsDB = firestore()
.collection('Accommodations')


const AccommodationsDetailsDB = firestore()
.collection('Accommodations')


const ExchangeDB = firestore()
.collection('Exchanges')

const MessagesDB = firestore()
.collection('Messages')

const UserMessages = firestore()
.collection('users')
.doc('Messages')
.collection('Message')

  export  {usersDB, profilesDB, verificationsDB, AccommodationsDB, ExchangeDB, MessagesDB, AccommodationsDetailsDB, UserMessages, MyAccommodationsDB } ;