import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

// form some reasons cUser not working. it shuld be get user id when a login but not
const cUserDB = firestore()
.collection('users')
.doc('PersonalInformations')
.collection('user')
.doc(auth().currentUser.uid)



const cprofileDB = firestore()
.collection('users')
.doc('Profiles')
.collection('profile')
.doc(auth().currentUser.uid)


const cVerificationDB = firestore()
.collection('users')
.doc('Verifications')
.collection('verification')
.doc(auth().currentUser.uid)

const cAccommodationsDB = firestore()
.collection('Accommodations')
.where( "uid", "==", auth().currentUser.uid)
.where( "Status", "==", "published")

const cMessagesDB = firestore()
.collection('Messages')
.where( 'users', 'array-contains', auth().currentUser.uid)

const MyAccommodationsDB = firestore()
.collection('Accommodations')
.where( "uid", "==", auth().currentUser.uid)
.where( "status", "==", "published")

const MyExchangeDB = firestore()
.collection('Exchanges')
.where( 'users', 'array-contains', auth().currentUser.uid)
.where( "status", "==", "Exchanged")




  export  {cUserDB, cprofileDB , cVerificationDB, cAccommodationsDB, cMessagesDB, MyExchangeDB  } ;