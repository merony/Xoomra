import { useEffect, useState } from "react";

import { Alert } from "react-native";
import Entype from 'react-native-vector-icons/Entypo';
import HomeScreen from "../screen/Main/Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MessageScreen from '../screen/Main/Message';
import React from "react";
import TripsScreen from '../screen/Main/Trips';
import UserNav from './User.stack';
import UserScreen from '../screen/Main/User';
import WishesScreen from '../screen/Main/Wishes';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ChatListItem from '../components/ChatListItem';
import MessageResponseScreen from '../screen/Main/MessageResponse';

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = ({navigation}) => {

 

  
    useEffect(() => {
      //Runs on every render
  
      
      
    });
  
  
    useEffect(() => {
      //Runs only on the first render
     
    }, []);




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
          name="Wishes"
          component={WishesScreen}
          options={{
            tabBarLabel: 'Wishes',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="favorite-border" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Trips"
          component={TripsScreen}
          options={{
            tabBarLabel: 'Trips',
            tabBarIcon: ({ color }) => (
              <Entype name="network" color={color} size={26} />
            ),
          }}
        />

<Tab.Screen
          name="Message"
          component={MessageResponseScreen}
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