import  React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Crypto from 'expo-crypto'
import { CryptoDigestAlgorithm } from 'expo-crypto';
import { TouchableOpacity } from 'react-native-gesture-handler';


function HomeScreen({navigation}){
  const [chars, setChars] = useState([]);
  const [offset, setOffset] = useState(0);
  
  const fetchCharacters = async() =>{

    const ts = Date.now()
    const privateKey = '661a6a65c4039a3a2b42efdebb369f159fa689d7'
    const publicKey = '2718213ca607928b87751744cd377323'
    
    const hash = await Crypto.digestStringAsync(
      CryptoDigestAlgorithm.MD5,
      `${ts}${privateKey}${publicKey}`
    )

    let response = await fetch(`http://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&offset=${offset}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())

    setChars([...chars, ...response.data.results])
  }

  useEffect( () =>{ 
    fetchCharacters();
}, [])

  useEffect( () =>{ 
    fetchCharacters();
}, [offset])


 const _onItemPress= (character)=>{
  navigation.navigate("Description", {item: character})
 }
  

 const offsetCharss = () =>{
   setOffset(offset + 20)
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
                  onPress={() => _onItemPress(item)}
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
            onEndReached={offsetCharss}
            onEndReachedThreshold={0.1}
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

function heroDescription({route}){

  const {item} = route.params;
  
  return(
        <SafeAreaView style={styles.container}>
          <Image source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}} style={{height:SCREEN_WIDTH, width: SCREEN_WIDTH}}/>
          <Text style={[styles.itemText, {fontSize: 26, fontWeight: 'bold'}]}>{item.name}</Text>
          <Text style={styles.itemText}>{item.description ? item.description : 'No description' }</Text>
        </SafeAreaView>
    )
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#3d3d3d',
    flex: 1
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
  },

  imageDescription: {

  }
});


