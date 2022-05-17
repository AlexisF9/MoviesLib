import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import env from "../config/env";

export default function Search({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [movie, setMovie] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoModal, setInfoModal] = useState([]);

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
          <View key={index} style={styles.card}>
            <Pressable
              style={styles.btnImage}
              onPress={() => {
                setModalVisible(true), setInfoModal(item);
              }}
            >
              <Image
                source={{
                  uri: env.URL_PICTURE + item.poster_path,
                }}
                style={styles.image}
              />
            </Pressable>

            <View style={styles.cardInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={{
                  color: "white",
                }}
              >
                Note : {item.vote_average}/10
              </Text>
              <Text
                style={{
                  color: "white",
                }}
              >
                Sortie : {item.release_date}
              </Text>
            </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{infoModal.title}</Text>
            <Text style={styles.modalOverview}>{infoModal.overview}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible), setInfoModal([]);
              }}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.films}>{returnRender()}</ScrollView>
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
    width: "100%",
  },

  card: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 40,
  },
  cardInfo: {
    width: "60%",
  },
  title: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  btnImage: {
    width: "40%",
    height: 200,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },

  ////////////////// MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#fecc00",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalOverview: { marginBottom: 15 },
});
