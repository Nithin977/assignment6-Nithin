// Course: F2025 MAD201-01 Cross Platform Mobile Apps
// Assignment: 6 – News Reader App
// Student Name: Nithin Amin
// Student ID: A00194332
// File: FavoritesScreen.js
// Description: Displays saved favorite articles from AsyncStorage.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../components/ArticleCard";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("@favorites");
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  const removeFavorite = async (url) => {
    const updated = favorites.filter((item) => item.url !== url);
    setFavorites(updated);
    await AsyncStorage.setItem("@favorites", JSON.stringify(updated));
  };

  if (!favorites.length) {
    return (
      <View style={styles.center}>
        <Text>No favorites saved yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item, index) => item.url || index.toString()}
      renderItem={({ item }) => (
        <View>
          <ArticleCard
            article={item}
            onPress={() => navigation.navigate("Detail", { article: item })}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.url)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  removeButton: {
    backgroundColor: "#FF4C4C",
    padding: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 6,
  },
  removeText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
