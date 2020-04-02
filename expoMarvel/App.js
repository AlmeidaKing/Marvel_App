import  React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Crypto from 'expo-crypto'
import { CryptoDigestAlgorithm } from 'expo-crypto';

export default function App() {

  const [chars, setChars] = useState([]);

  useEffect( async () =>{ 
  
    const ts = Date.now()
    const privateKey = '661a6a65c4039a3a2b42efdebb369f159fa689d7'
    const publicKey = '2718213ca607928b87751744cd377323'
    
    const hash = await Crypto.digestStringAsync(
      CryptoDigestAlgorithm.MD5,
      `${ts}${privateKey}${publicKey}`
    )

    const response = await fetch(`http://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  .then( (response) => response.json()) 

  setChars(response)

  
}, [])

  return(
    <Text>Hello World</Text>
  )
  
}