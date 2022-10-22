import AddListingScreen from '../screen/Main/User/AddListing';
import EditListingScreen from '../screen/Main/User/EditListing';
import EditProfileScreen from '../screen/Main/User/EditProfile';
import HelpScreen from '../screen/Main/User/Help';
import MyListingScreen from '../screen/Main/User/MyListings';
import { NavigationContainer } from '@react-navigation/native';
import SupportScreen from '../screen/Main/User/Support';
import TermsScreen from  '../screen/Main/User/Terms';
import UserHomeScreen from '../screen/Main/User/UserHome';
import ViewProfileScreen from '../screen/Main/User/ViewProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator();


const UserNav = () => {
    return (
        

            
            <UserStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FF4500',  textTransform: 'uppercase'},
             headerTintColor: '#fff',
             headerTitleStyle: {fontWeight: 'bold'},
            
             }}>
                <UserStack.Screen name="User" component={UserHomeScreen} />
                <UserStack.Screen name="View Profile" component={ViewProfileScreen} />
                <UserStack.Screen name="Edit Profile" component={EditProfileScreen} options={{headerShown: false}}/>
                <UserStack.Screen name="My Listing" component={MyListingScreen} />
                <UserStack.Screen name="Add Listing" component={AddListingScreen} />
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