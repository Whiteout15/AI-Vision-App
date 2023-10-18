import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButtonContainer}>
        <View style={styles.backButton}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
  },
  backButtonContainer: {
    position: "absolute",
    left: 10,
  },
  backButton: {
    // No need to add padding here
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center", // Center the title vertically
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default Header;