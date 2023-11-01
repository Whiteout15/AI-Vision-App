import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/screenstyles/header.style";
import { useRouter } from "expo-router";

const navigation = useRouter();
const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.canGoBack() && navigation.back()}
      >
        <View style={styles.backButton}>
          <Ionicons name="ios-arrow-back" size={50} color="black" />
        </View>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
