import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DetailScreen({ route }) {
  const { article } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    const stored = await AsyncStorage.getItem("@favorites");
    const favs = stored ? JSON.parse(stored) : [];
    const exists = favs.some((item) => item.url === article.url);
    setIsSaved(exists);
  };

  const saveToFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("@favorites");
      const favs = stored ? JSON.parse(stored) : [];

      // avoid duplicates
      if (favs.some((item) => item.url === article.url)) {
        Alert.alert("Already Saved", "This article is already in favorites.");
        return;
      }

      const updated = [...favs, article];
      await AsyncStorage.setItem("@favorites", JSON.stringify(updated));
      setIsSaved(true);

      Alert.alert("Saved!", "Article added to favorites.");
    } catch (error) {
      console.log("Save error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>

      {article.content ? (
        <Text style={styles.content}>{article.content}</Text>
      ) : null}

      {/* SAVE BUTTON */}
      {!isSaved ? (
        <TouchableOpacity style={styles.saveButton} onPress={saveToFavorites}>
          <Text style={styles.saveText}>Save to Favorites</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.savedButton}>
          <Text style={styles.savedText}>✓ Saved</Text>
        </TouchableOpacity>
      )}

      {/* READ FULL ARTICLE */}
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => Linking.openURL(article.url)}
      >
        <Text style={styles.readText}>Read Full Article</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: { fontSize: 16, color: "#333" },
  content: { marginTop: 10, fontSize: 15, color: "#444" },

  saveButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  savedButton: {
    marginTop: 20,
    backgroundColor: "#cccccc",
    padding: 12,
    borderRadius: 8,
  },
  savedText: {
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },

  readButton: {
    marginTop: 12,
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
  },
  readText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
