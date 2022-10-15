/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React, { Component }  from 'react';
import {
StatusBar,
StyleSheet,
View,
} from 'react-native';

import Entype from 'react-native-vector-icons/Entypo'
import { GoogleSocialButton } from "react-native-social-buttons";
import Routing from './src/navigations/Routing.stack';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */



const App = () => {


  return (
    <>
    <StatusBar barStyle="dark-content" />
      
         <Routing />
      </>  
     
  );
};

const styles = StyleSheet.create({

});

export default App;
