import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/glasses.style";
import Header from "./Header";

function Test() {
  const navigation = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Test under Development"
        onBackPress={() => navigation.back()}
      />
    </SafeAreaView>
  );
}

export default Test;
