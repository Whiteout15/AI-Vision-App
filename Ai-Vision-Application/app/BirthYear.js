import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

function BirthYear({}) {
  const navigation = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // Generate a list of years dynamically (e.g., from 1950 to the current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });

  const placeholderText = "Select a Year";

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detail Screen" onBackPress={() => navigation.goBack("index")} />
      <DropDownPicker
        open={open}
        value={value}
        items={years}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholderText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Set flex to 1 to fill the available space
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default BirthYear;
