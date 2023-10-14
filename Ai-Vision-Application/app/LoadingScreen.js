import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vision AI App</Text>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: "https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    maxHeight: 200,
    maxHeight: 200,
  },
});

export default LoadingScreen;
