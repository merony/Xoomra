import {
    Button,
    Pressable,
    Text,
    TouchableOpacity
} from 'react-native';

import EditPersonalInformationScreen from '../screen/Main/User/EditPersonalInformation';
import EditProfileScreen from '../screen/Main/User/EditProfile';
import HelpScreen from '../screen/Main/User/Help';
import MyListingScreen from '../screen/Main/User/MyListings';
import { NavigationContainer } from '@react-navigation/native';
import { StackActions } from "@react-navigation/native";
import SupportScreen from '../screen/Main/User/Support';
import TermsScreen from  '../screen/Main/User/Terms';
import UserHomeScreen from '../screen/Main/User/UserHome';
import ViewPersonalInformationScreen from '../screen/Main/User/ViewPersonalInformation';
import ViewProfileScreen from '../screen/Main/User/ViewProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpDetailScreen from '../screen/Main/User/HelpDetailScreen';

const UserStack = createNativeStackNavigator();


const UserNav = ({navigation, props}) => {
    return (
        

            
            <UserStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FFF'},
             headerTintColor: '#030f14',
             headerTitleStyle: {fontWeight: '500', fontSize: 24,} 
            
             }}>
                <UserStack.Screen name="User" component={UserHomeScreen} 
                options={{
                headerShown: true, 
                headerBackVisible:false, 
                headerTitle: "Profile",
                
                headerRight: () => (
                    <TouchableOpacity title="X"  onPress = { () => navigation.replace("TabNavigator")} >
                        <Text style = {{fontWeight: '500', fontSize: 18, color: "#030f14"}}>x</Text>
                    </TouchableOpacity>
                  )

                        }}/>
                <UserStack.Screen name="View personal Information" component={ViewPersonalInformationScreen}
                 options={{
                    headerShown: true, 
                  
                    headerTitle: " ",
                  
                    
                    // headerRight: () => (
                    //     <TouchableOpacity title="X"  onPress = { () => navigation.navigate("Edit Personal Information")} >
                    //         <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Edit</Text>
                    //     </TouchableOpacity>
                    //   )
                    
                            }} 
                />

                <UserStack.Screen name="Edit Personal Information" component={EditPersonalInformationScreen} 
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }}
                
                />

                <UserStack.Screen name="View Profile" component={ViewProfileScreen} 
                options={{
                    headerShown: true, 
                  
                    headerTitle: " ",
                  
                    
                    headerRight: () => (
                        <TouchableOpacity title="X"  onPress = { () => navigation.navigate("Edit Profile")} >
                            <Text style = {{fontWeight: '500', fontSize: 14, color: "#030f14", textDecorationLine: 'underline'}}>Edit</Text>
                        </TouchableOpacity>
                      )
                    
                            }}
                />
                <UserStack.Screen name="Edit Profile" component={EditProfileScreen} 
                
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }}
                />
                <UserStack.Screen name="My Listing" component={MyListingScreen} />
                <UserStack.Screen name="Support" component={SupportScreen}
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }} />
                <UserStack.Screen name="Help" component={HelpScreen}
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }} />
                <UserStack.Screen name="HelpDetail" component={HelpDetailScreen}
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }} />
                <UserStack.Screen name="Terms" component={TermsScreen}
                options={{
                    headerShown: true, 
                    headerTitle: " ",
                            }}
                />
                
            </UserStack.Navigator>
        
    )
}
export default UserNav;