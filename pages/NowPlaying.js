import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

export default function NowPlaying({ navigation, route }) {
  const API_KEY = "afe1e6229a323ab6b79aa116e601ff56";

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr-FR`
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://image.tmdb.org/t/p/original" + item.poster_path,
                  }}
                  style={{ width: "50%", height: 200, borderRadius: 5 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {item.original_title}
                  </Text>
                  <Text>Note : {item.vote_average}/10</Text>
                  <Text>Sortie : {item.release_date}</Text>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text numberOfLines={3}>{item.overview}</Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  card: {
    marginBottom: 20,
  },
});
