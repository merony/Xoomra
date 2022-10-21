import BookingScreen from '../screen/Main/Booking';
import Entype from 'react-native-vector-icons/Entypo';
import FavoritesScreen from '../screen/Main/Favorites';
import HomeScreen from "../screen/Main/Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessageScreen from '../screen/Message';
import React from "react";
import SearchScreen from "../screen/Main/Search";
import UserScreen from '../screen/Main/User';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#0999f4"
        inactiveColor="#283239"
        barStyle={{ backgroundColor: '#f0f5f5' }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Stay',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="card-search-outline" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="favorite-border" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Trips"
          component={BookingScreen}
          options={{
            tabBarLabel: 'Trips',
            tabBarIcon: ({ color }) => (
              <Entype name="network" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message-outline" color={color} size={26} />
            ),
          }}
        />


<Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({ color }) => (
              <Entype name="user" color={color} size={26} />
            ),
          }}
        />

      
      </Tab.Navigator>
  
    )
  }
  export default TabNavigator;