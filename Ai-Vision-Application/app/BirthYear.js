import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/birthyear.style";
import Header from "./Header";

function BirthYear() {
  const navigation = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1923 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });

  const placeholderText = "Select a Year";

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Birth Year" onBackPress={() => navigation.back()} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: "center",
          paddingVertical: 50,
          paddingHorizontal: 50,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={years}
          setOpen={setOpen}
          setValue={setValue}
          placeholder={placeholderText}
        />
        <TouchableOpacity
          style={styles.button}
          title="Continue to Test"
          onPress={() => {
            navigation.push("Test");
          }}
        >
          <Text style={styles.text}>I Agree</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BirthYear;
