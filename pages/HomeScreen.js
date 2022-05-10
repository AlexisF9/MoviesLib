import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import env from "../config/env";

export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (searchMovie != "") {
      searchFilm();
    }
  }, [searchMovie]);

  const searchFilm = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&query=${searchMovie}&language=fr-FR&page=1&include_adult=false`
      );
      const json = await response.json();
      setMovie(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const returnRender = () => {
    if (searchMovie === "") {
      return <Text>Recherchez un titre pour trouver un film</Text>;
    } else if (isLoading) {
      return <ActivityIndicator />;
    } else {
      return movie.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item.original_title}</Text>
          </View>
        );
      });
    }
  };

  return (
    <View>
      <Button
        title="En ce moment"
        onPress={() => navigation.navigate("En ce moment")}
      />
      <TextInput
        style={styles.input}
        onChangeText={setSearchMovie}
        value={searchMovie}
      />

      <View style={styles.films}>{returnRender()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  films: {
    marginLeft: 12,
    marginRight: 12,
  },
});
