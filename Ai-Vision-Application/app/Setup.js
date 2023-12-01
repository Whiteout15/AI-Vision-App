import { Text, View, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "../assets/screenstyles/setup.style.";
import Header from "./Header";

function Setup() {
  const navigation = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1923 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });

  const placeholderText = "Select a Year";

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Test Setup" onBackPress={() => navigation.back()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Do you wear glasses?</Text>
      </View>
      <View style={styles.titleContainer}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
      
      <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch}>
      <View style={[styles.switchTrack, { backgroundColor: isEnabled ? '#81b0ff' : '#767577' }]} />
      <View style={[styles.switchThumb, { backgroundColor: isEnabled ? '#f5dd4b' : '#f4f3f4' }]} />
      <Text style={styles.switchTitle}>{isEnabled ? 'YES' : 'NO'}</Text>
    </TouchableOpacity>
      {/* <View style={styles.buttonContainer}>
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
      </View> */}
      <View>
      <DropDownPicker
          open={open}
          value={value}
          items={years}
          setOpen={setOpen}
          setValue={setValue}
          placeholder={placeholderText}
        />
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            title="Continue to Test"
            onPress={() => {
              if (value === null) {
                alert("Please select a birth year");
                return;
              } else {
                navigation.push("Test");
              }
            }}
          >
            <Text style={styles.text}>Continue</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

export default Setup;
