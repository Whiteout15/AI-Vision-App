import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/glasses.style";
import Header from "./Header";

function Glasses() {
  const navigation = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detail Screen" onBackPress={() => navigation.back()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Do you wear glasses?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          title="Continue to Test"
          onPress={() => {
            navigation.push("BirthYear");
          }}
        >
          <Text style={styles.text}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          title="Continue to Test"
          onPress={() => {
            navigation.push("BirthYear");
          }}
        >
          <Text style={styles.text}>No</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Glasses;
