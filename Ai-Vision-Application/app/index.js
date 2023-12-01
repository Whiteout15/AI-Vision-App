import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/homescreen.style";
import React, { useEffect } from "react";
import * as Brightness from "expo-brightness";

export default function HomeScreen() {
  // Keep the splash screen visible while we the app is finishes getting all the assets and fonts it needs
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  const navigation = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        Brightness.setSystemBrightnessAsync(1);
      } else {
        alert("Please allow the app to access your brightness settings");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to the VisionAI App</Text>
        <Text style={styles.subText}>
          An Artificial Intelligence Based Near Vision Tester. Providing
          accurate and reliable at home vision testing.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        title="Continue"
        onPress={() => {
          navigation.push("Terms");
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
