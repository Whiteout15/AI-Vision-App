import React, { useState } from "react";
import { StyleSheet, View } from "react-native"; // Import StyleSheet and View
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function BirthYear({}) {
  const navigation = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "2002", value: "2002" },
    { label: "2001", value: "2001" },
    { label: "2000", value: "2000" },
    { label: "1999", value: "1999" },
  ]);

  const placeholderText = "Select a Year";

  return (
    <SafeAreaView style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholderText} // Set the custom placeholder text
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BirthYear;
