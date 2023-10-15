import React from "react";
import { Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Page2Screen({}) {
  const navigation = useRouter();
  return (
    <SafeAreaView>
      <Text>This is the Second Page</Text>
      <Button
        title="Go to Next Page"
        onPress={() => navigation.push("BirthYear")}
      />
    </SafeAreaView>
  );
}

export default Page2Screen;
