import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../assets/screenstyles/test.style";
import Header from "./Header";
import Test from "./Test";

function Results({ navigation, randomString}) {
  return (
    <View style={styles.container}>
      <Header title="Vision Test" onBackPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Results</Text>
      </View>
      <View style={styles.centerText}>
        <Text style={styles.testText}> {randomString} </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.titleContainer}></View>
      </View>
    </View>
  );
}

export default Results;
