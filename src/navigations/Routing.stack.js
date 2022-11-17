import MessageResponseScreen from '../screen/Main/MessageResponse';
import MessageScreen from '../screen/Main/Message';
import MyListingNav from './MyListing.stack';
import { NavigationContainer } from '@react-navigation/native';
import OnBoard from "./OnBoard.stack";
import RequestStayScreen from '../screen/Main/RequestStay/index';
import SearchScreen from "../screen/Main/Search";
import StayConfirmationScreen from '../screen/Main/StayConfirmation';
import StayDetailsScreen from '../screen/Main/StayDetails/index';
import StayListScreen from "../screen/Main/StayList";
import TabNavigator from "./TabNavigator.stack";
import UserNav from './User.stack';
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();


const Routing = () => {
    return (
        <NavigationContainer>

            
            <RootStack.Navigator screenOptions={{ headerShown: false,
             headerStyle: {backgroundColor: '#FF4500',  textTransform: 'uppercase'},
             headerTintColor: '#fff',
             headerTitleStyle: {fontWeight: 'bold'},
            
             }}>
                <RootStack.Screen name="OnBoard" component={OnBoard} />
                <RootStack.Screen name="TabNavigator" component={TabNavigator} />
                <RootStack.Screen name="UserNav" component={UserNav} />
                <RootStack.Screen name="MyListingNav" component={MyListingNav} />
                <RootStack.Screen name="Stay List" component={StayListScreen} options={{headerShown: false}}/>
                <RootStack.Screen name="Search Screen" component={SearchScreen}
                options={{headerShown: false}}
                />
                <RootStack.Screen name="Stay Confirmation" component={StayConfirmationScreen} />

                <RootStack.Screen name="StayDetailsScreen" component={StayDetailsScreen} />
                <RootStack.Screen name="RequestStayScreen" component={RequestStayScreen}/>
                <RootStack.Screen name="MessageScreen" component={MessageScreen}/>
                <RootStack.Screen name="MessageResponseScreen" component={MessageResponseScreen}/>
                
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default Routing;