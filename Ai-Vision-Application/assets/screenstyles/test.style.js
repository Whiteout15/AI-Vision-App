import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    marginTop: 50,
    fontSize: 50, // Reduce the font size for better appearance
    fontWeight: "bold",
    textAlign: "center",
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  centerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },

  testText: {
    marginTop: 50,
    fontSize: 90, // Reduce the font size for better appearance
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    letterSpacing: 40,
    marginRight: -40,
  },

  buttonContainer: {
    flexDirection: 'column', // Place buttons horizontally
    justifyContent: 'space-around', // Adjust as needed
    marginTop: 20, // Add spacing between the title and buttons
  },

  button: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 100, // Set a fixed width for the buttons
  },

  text: {
    fontWeight: "bold",
    color: "#FFF",
  },
});