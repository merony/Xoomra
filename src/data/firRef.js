import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

// form some reasons cUser not working. it shuld be get user id when a login but not
const cUserDB = firestore()
.collection('users')
.doc('PersonalInformations')
.collection('user')
.doc(auth().currentUser.uid)

      
const usersDB = firestore()
.collection('users')
.doc("PersonalInformations")
.collection('user')

const cprofileDB = firestore()
.collection('users')
.doc('Profiles')
.collection('profile')
.doc(auth().currentUser.uid)

const profilesDB = firestore()
.collection('users')
.doc('Profiles')
.collection('profile')

const cVerificationDB = firestore()
.collection('users')
.doc('Verifications')
.collection('verification')
.doc(auth().currentUser.uid)


const verificationsDB = firestore()
.collection('users')
.doc('Verifications')
.collection('verification')


const AccommodationsDB = firestore()
.collection('Accommodations')



  export  {cUserDB, usersDB, profilesDB, verificationsDB, AccommodationsDB } ;