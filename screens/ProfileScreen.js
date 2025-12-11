// Course: F2025 MAD201-01 Cross Platform Mobile Apps
// Assignment: 6 – News Reader App
// Student Name: Nithin Amin
// Student ID: A00194332
// File: ProfileScreen.js
// Description: Simple About/Profile screen for developer and app info.
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.label}>Student Name:</Text>
      <Text style={styles.text}>Nithin Amin</Text>

      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.text}>A00194332</Text>

      <Text style={styles.label}>Course:</Text>
      <Text style={styles.text}>MAD201 – Cross Platform Mobile Apps</Text>

      <Text style={styles.label}>Assignment:</Text>
      <Text style={styles.text}>Assignment 6 – News Reader App</Text>

      <Text style={styles.desc}>
        This app fetches real-time technology news from an API, displays articles,
        and allows users to save favorites using AsyncStorage.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 16 },
  desc: {
    marginTop: 20,
    fontSize: 15,
    color: "#444",
    textAlign: "center",
  },
});
