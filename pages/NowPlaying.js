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
import env from "../config/env";

export default function NowPlaying({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${env.API_KEY}&language=fr-FR`
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
              <Image
                source={{
                  uri: "https://image.tmdb.org/t/p/original" + item.poster_path,
                }}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {item.original_title}
              </Text>

              {/* <View style={{ flex: 1 }}>
                <Text numberOfLines={3}>{item.overview}</Text>
                <Text>Note : {item.vote_average}/10</Text>
                <Text>Sortie : {item.release_date}</Text>
              </View> */}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  card: {
    marginBottom: 30,
  },
});
