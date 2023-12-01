import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { styles } from "../assets/screenstyles/test.style";
import Header from "./Header";
import EndTest from "./Results";
// Function to generate a random 4-letter string
function generateRandomString() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"; // Define the character set
  let randomString = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet[randomIndex];
  }

  return randomString;
}

function Test() {
  const navigation = useNavigation(); // Use useNavigation hook to access navigation
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const [fontSize, setFontSize] = useState(70); // Initial font size
  
  const increaseFontSize = () => {
    setFontSize(fontSize + 2); // Increase font size by 2
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2); // Decrease font size by 2
  };

  // Function to update the random string and increment the button press count
  const updateRandomString = () => {
    const newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);
    setRandomString(generateRandomString());
  };

  // Use useEffect to navigate when buttonPressCount reaches 6
  useEffect(() => {
    if (buttonPressCount === 6) {
      navigation.push("Results", { randomString, buttonPressCount }); // Replace 'EndTest' with your actual destination route
    }
  }, [buttonPressCount, navigation]);

  return (
    <View style={styles.container}>
      <Header title="Vision Test" onBackPress={() => navigation.goBack()} />
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Do you wear glasses?</Text>
      </View> */}
      <View style={styles.centerText}>
        <Text style={{
          fontSize: fontSize, 
          marginTop: 50,
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          letterSpacing: 30,
          marginRight: -30,
          }}>{randomString}</Text>
        <TouchableOpacity title="Increase Font Size" style={[styles.button]} onPress={increaseFontSize}><Text style={styles.text}>Increase</Text></TouchableOpacity>
        <TouchableOpacity title="Decrease Font Size" style={[styles.button]} onPress={decreaseFontSize}><Text style={styles.text}>Decrease</Text></TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={[styles.button]}
            title="Generate"
            onPress={updateRandomString}
          >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>Vision Test: {buttonPressCount}/5</Text>
      {/* <EndTest
        randomString={randomString}
        buttonPressCount={buttonPressCount}
      /> */}
    </View>
  );
}

export default Test;
