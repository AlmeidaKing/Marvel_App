import  React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Crypto from 'expo-crypto'
import { CryptoDigestAlgorithm } from 'expo-crypto';

const DATA = [
  {
    id: 1,
    title: '1'
  },
  {
    id: 2,
    title: '2'
  },

]
async function auth(){

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
  
  return(

    response.data.results.map( (item) => <TouchableOpacity
    onPress={() => onSelect(id)}
    style={styles.item}
  >
    <Text style={styles.title}>{item.name}</Text>
  </TouchableOpacity>)
  );

}

function Item({ id, title, selected, onSelect, image }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#c53838' : '#c1cede' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <FlatList 
          data={ DATA }
          renderItem={({ item }) => <Item  title={item.title}></Item>}
          keyExtractor={ item => item.id }
        /> 
      </SafeAreaView>
    </View>
  );
}

const Stack = createStackNavigator();

function item ({ title }) {
  return(
    <View>
      <Text>{ title }</Text>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App Marvel" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#c1cede', 
    padding: 20, 
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


export default App;
