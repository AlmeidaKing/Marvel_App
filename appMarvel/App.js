import  React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Hero 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Hero 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Hero 3',
  },
];

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
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
    backgroundColor: '#f9c2ff', 
    padding: 20, 
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});


export default App;