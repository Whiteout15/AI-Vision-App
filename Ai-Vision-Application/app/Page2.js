import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Page2Screen({}) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>This is the Second Page</Text>
      <Button
        title="Go to Next Page"
        onPress={() => navigation.navigate("BirthYear")}
      />
    </View>
  );
}

export default Page2Screen;
