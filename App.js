import  React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Crypto from 'expo-crypto'
import { CryptoDigestAlgorithm } from 'expo-crypto';
import { TouchableOpacity } from 'react-native-gesture-handler';


function HomeScreen({navigation}){
  const [chars, setChars] = useState([]);

  const fetchCharacters = async() =>{

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
    }).then(response => response.json())
    
    setChars(response.data.results)
  }



  useEffect( () =>{ 
    fetchCharacters();
}, [])

 const _onItemPress= (item)=>{
  navigation.navigate('Description', item)
 }
  
  const numColumns = 2

  return(
        <SafeAreaView style={styles.container}>
          <FlatList
            data={chars}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemLink}
                  onPress={(item) => _onItemPress(item)}
                >
                  <Image 
                    source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}}
                    style={styles.itemImage}
                    />
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={numColumns}
          />
        </SafeAreaView>
    )
}

export default function App() {
  
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#252525' },
        }}
      >
        <Stack.Screen 
          name='Marvel Heroes' 
          component={HomeScreen}
        />
        <Stack.Screen
          name='Description'
          component={heroDescription}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

function heroDescription({item}){

  console.log(item)
  
  return(
        <SafeAreaView style={styles.container}>
          <Text>{item}</Text>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({

  container: {
    backgroundColor: '#3d3d3d',
  },
  
  itemContainer: {
    backgroundColor: '#585858',
    flexGrow: 1,
    margin: 4,
    flexBasis: 0,
    flexDirection: 'column',
  },
  
  itemLink: {
    alignItems: 'center',
    padding: 20,
  },

  itemImage: {
    padding: 20,
    height: 70, 
    width: 70,
    borderRadius: 50
  },

  itemText: {
    color: 'white',
    marginTop: 15,
    textAlign: 'center'
  }
});


