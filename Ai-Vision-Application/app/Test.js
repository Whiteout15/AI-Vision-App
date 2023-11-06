import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { styles } from "../assets/screenstyles/test.style";
import Header from "./Header";
import EndTest from "./EndTest";
// Function to generate a random 4-letter string
function generateRandomString() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Define the character set
  let randomString = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet[randomIndex];
  }

  return randomString;
}

function Test() {
  const navigation = useNavigation(); // Use useNavigation hook to access navigation
  const [randomString, setRandomString] = useState(generateRandomString());
  const [buttonPressCount, setButtonPressCount] = useState(0);

  // Function to update the random string and increment the button press count
  const updateRandomString = () => {
    const newCount = buttonPressCount + 1;
    setButtonPressCount(newCount);
    setRandomString(generateRandomString());
  };

  // Use useEffect to navigate when buttonPressCount reaches 6
  useEffect(() => {
    if (buttonPressCount === 6) {
      navigation.push("EndTest", { randomString, buttonPressCount }); // Replace 'EndTest' with your actual destination route
    }
  }, [buttonPressCount, navigation]);

  return (
    <View style={styles.container}>
      <Header title="Vision Test" onBackPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Do you wear glasses?</Text>
      </View>
      <View style={styles.centerText}>
        <Text style={styles.testText}>{randomString}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={[styles.button]}
            title="Generate"
            onPress={updateRandomString}
          >
            <Text style={styles.text}>Generate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>Button Press Count: {buttonPressCount}</Text>
      <EndTest
        randomString={randomString}
        buttonPressCount={buttonPressCount}
      />
    </View>
  );
}

export default Test;
