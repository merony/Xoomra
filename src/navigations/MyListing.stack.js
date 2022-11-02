import {
    Button,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';

import AddListingScreen from '../screen/Main/User/AddListing';
import AddPhotosScreen from '../screen/Main/User/AddPhotos';
import EditListingScreen from '../screen/Main/User/EditListing';
import ListingReviewScreen from '../screen/Main/User/ListingReview';
import ManageListingScreen from '../screen/Main/User/ManageListings';
import { NavigationContainer } from '@react-navigation/native';
import PreviewListingScreen from '../screen/Main/User/PreviewListing';
import { StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MyListingStack = createNativeStackNavigator();


const MyListingNav = ({navigation, props}) => {
    return (
        

            
            <MyListingStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FFF'},
             headerTintColor: '#030f14',
             headerTitleStyle: {fontWeight: '500', fontSize: 24,} 
            
             }}>
                <MyListingStack.Screen name="Manage Listing" component={ManageListingScreen} 
                options={{
                headerShown: true, 
                headerBackVisible:false, 
                headerTitle: "Manage Listings",
                
                headerRight: () => (
                    <TouchableOpacity title="X"  onPress = { () => navigation.replace("UserNav")} >
                        <Text style = {{fontWeight: '500', fontSize: 18, color: "#030f14"}}>x</Text>
                    </TouchableOpacity>
                  )

                  }}
                />

                <MyListingStack.Screen name="Add Listing" component={AddListingScreen} />
                <MyListingStack.Screen name="Add Photos" component={AddPhotosScreen} />
                <MyListingStack.Screen name="Listing Review" component={ListingReviewScreen} />
                <MyListingStack.Screen name="Preview Listing" component={PreviewListingScreen} />
                <MyListingStack.Screen name="Edit Listing" component={EditListingScreen} />
          


                
            </MyListingStack.Navigator>
        
    )
}
export default MyListingNav;