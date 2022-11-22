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







  export  {cUserDB, cprofileDB , cVerificationDB  } ;