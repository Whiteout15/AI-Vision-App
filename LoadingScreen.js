import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vision AI App</Text>
      <Image style={styles.logo} resizeMode="contain" source={require('./img/visionAI.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
    
    title: {
        marginTop: 50,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        maxHeight: 200,
        maxHeight: 200,
    },
});

export default LoadingScreen;