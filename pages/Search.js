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

export default function Search({ navigation }) {
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
        `${env.URL_API}/search/movie?api_key=${env.API_KEY}&query=${searchMovie}&language=fr-FR&page=1&include_adult=false`
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
      return (
        <Text style={{ color: "white" }}>
          Recherchez un titre pour trouver un film
        </Text>
      );
    } else if (isLoading) {
      return <ActivityIndicator />;
    } else {
      return movie.map((item, index) => {
        return (
          <View key={index}>
            <Text style={{ color: "white" }}>{item.original_title}</Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchMovie}
        value={searchMovie}
        placeholder="Titre de film"
      />

      <View style={styles.films}>{returnRender()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    paddingTop: 70,
    padding: 10,
  },
  title: {
    color: "white",
  },
  input: {
    borderRadius: 30,
    color: "white",
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
  },
  films: {
    color: "white",
    marginLeft: 12,
    marginRight: 12,
  },
});
