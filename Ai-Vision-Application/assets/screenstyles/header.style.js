import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  });