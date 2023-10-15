import { Text, View, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/homescreen.style";

export default function HomeScreen() {
  // Keep the splash screen visible while we the app is finishes getting all the assets and fonts it needs
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  const navigation = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to the VisionAI App</Text>
        <Text style={styles.subText}>
          An Artificial Intelligence Based Near Vision Tester. Providing
          accurate and reliable at home vision testing
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        title="Go to Second Page"
        onPress={() => {
          navigation.push("Page2");
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
