import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import ArticleCard from "../components/ArticleCard";

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?category=technology&language=en&country=us&apiKey=1c71bd4721bf4901a7fbc60b412bce71"
        );

        // NewsAPI returns { status, totalResults, articles: [...] }
        setArticles(response.data.articles || []);
      } catch (error) {
        console.log("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (!articles.length) {
    return (
      <View style={styles.center}>
        <Text>No articles found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => item.url || index.toString()}
      renderItem={({ item }) => (
        <ArticleCard
          article={item}
          onPress={() => navigation.navigate("Detail", { article: item })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
