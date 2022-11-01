import AddListingScreen from '../screen/Main/User/AddListing';
import AddPhotosScreen from '../screen/Main/User/AddPhotos';
import EditListingScreen from '../screen/Main/User/EditListing';
import EditProfileScreen from '../screen/Main/User/EditProfile';
import HelpScreen from '../screen/Main/User/Help';
import ListingReviewScreen from '../screen/Main/User/ListingReview';
import MyListingScreen from '../screen/Main/User/MyListings';
import { NavigationContainer } from '@react-navigation/native';
import PreviewListingScreen from '../screen/Main/User/PreviewListing';
import SupportScreen from '../screen/Main/User/Support';
import TermsScreen from  '../screen/Main/User/Terms';
import UserHomeScreen from '../screen/Main/User/UserHome';
import ViewPersonalInformationScreen from '../screen/Main/User/ViewPersonalInformation';
import ViewProfileScreen from '../screen/Main/User/ViewProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator();


const UserNav = () => {
    return (
        

            
            <UserStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FFF',  textTransform: 'uppercase'},
             headerTintColor: '#030f14',
             headerTitleStyle: {fontWeight: '500', fontSize: 24, textTransform: 'uppercase',} 
            
             }}>
                <UserStack.Screen name="User" component={UserHomeScreen} options={{headerShown: true, headerBackVisible:false, headerTitle: "Profile" }}/>
                <UserStack.Screen name="View personal Information" component={ViewPersonalInformationScreen} />
                <UserStack.Screen name="View Profile" component={ViewProfileScreen} />
                <UserStack.Screen name="Edit Profile" component={EditProfileScreen} options={{headerShown: false}}/>
                <UserStack.Screen name="My Listing" component={MyListingScreen} />
                <UserStack.Screen name="Add Listing" component={AddListingScreen} />
                <UserStack.Screen name="Add Photos" component={AddPhotosScreen} />
                <UserStack.Screen name="Listing Review" component={ListingReviewScreen} />
                <UserStack.Screen name="Preview Listing" component={PreviewListingScreen} />
                <UserStack.Screen name="Edit Listing" component={EditListingScreen} />
                <UserStack.Screen name="Support Screen" component={SupportScreen} />
                <UserStack.Screen name="Help Screen" component={HelpScreen} />
                <UserStack.Screen name="Terms Screen" component={TermsScreen}
                options={{headerShown: false}}
                />
                
            </UserStack.Navigator>
        
    )
}
export default UserNav;