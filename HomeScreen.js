import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to the VisionAI App</Text>
            <Text style={styles.subText}>An Artificial Intelligence Based Near Vision Tester.
Providing accurate and reliable at home vision testing</Text>
        </View>
        <TouchableOpacity style={styles.button}
            title="Go to Second Page"
            onPress={() => navigation.navigate('Page2')}
        >
            <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    title: {
        marginTop: 50,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subText: {
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
    },

    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#FFF',

    },

    button: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 100,
    },
});




export default HomeScreen;