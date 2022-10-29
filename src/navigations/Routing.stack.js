import { NavigationContainer } from '@react-navigation/native';
import OnBoard from "./OnBoard.stack";
import SearchScreen from "../screen/Main/Search";
import StayListScreen from "../screen/Main/StayList";
import TabNavigator from "./TabNavigator.stack";
import UserNav from './User.stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StayDetailsScreen from '../screen/Main/StayDetails/index';


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
                <RootStack.Screen name="Stay List" component={StayListScreen} options={{headerShown: false}}/>
                <RootStack.Screen name="Search Screen" component={SearchScreen}
                options={{headerShown: false}}
                />

                <RootStack.Screen name="StayDetailsScreen" component={StayDetailsScreen}/>
                
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default Routing;