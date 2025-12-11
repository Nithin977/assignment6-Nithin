import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ArticleCard({ article, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.image ? (
        <Image source={{ uri: article.image }} style={styles.thumbnail} />
      ) : null}

      <View style={styles.info}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {article.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
});
