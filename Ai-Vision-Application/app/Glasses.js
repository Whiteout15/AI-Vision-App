import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Glasses({}) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>This is the Glasses Page</Text>
      <Button title="Go to Next" onPress={() => navigation.navigate("")} />
    </View>
  );
}

export default Glasses;
