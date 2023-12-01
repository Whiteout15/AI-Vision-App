import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    marginTop: 50,
    fontSize: 30, // Reduce the font size for better appearance
    fontWeight: "bold",
    textAlign: "center",
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: 'row', // Place buttons horizontally
    justifyContent: 'space-around', // Adjust as needed
    marginTop: 20, // Add spacing between the title and buttons
  },

  button: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
    width: 100, // Set a fixed width for the buttons
  },

  text: {
    fontWeight: "bold",
    color: "#FFF",
  },

  switch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  switchTitle: {
    fontSize: 30, // Reduce the font size for better appearance
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },


});
