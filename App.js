import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './LoadingScreen'
import HomeScreen from './HomeScreen';
import Page2 from './Page2';
import BirthYear from './BirthYear';
import Glasses from './Glasses';

const Stack = createStackNavigator();


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when loading is complete
    }, 2000); // Simulate a 2-second loading time (adjust as needed)
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Hello World</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="BirthYear" component={BirthYear} />
        <Stack.Screen name="Glasses" component={Glasses} />
        
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
