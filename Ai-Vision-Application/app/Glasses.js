import React from "react";
import { Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Glasses({}) {
  const navigation = useRouter();
  return (
    <SafeAreaView>
      <Text>This is the Glasses Page</Text>
      <Button title="Go to Next" onPress={() => navigation.push("")} />
    </SafeAreaView>
  );
}

export default Glasses;
