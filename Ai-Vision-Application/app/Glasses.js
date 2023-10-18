import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/homescreen.style";
import Header from "./Header";

function Glasses() {

  const navigation = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detail Screen" onBackPress={() => navigation.goBack("index")} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Glasses</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        title="Continue to Test"
        onPress={() => {
          navigation.push("BirthYear");
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Glasses;