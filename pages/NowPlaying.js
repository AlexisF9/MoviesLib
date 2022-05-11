import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import env from "../config/env";

export default function NowPlaying({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoModal, setInfoModal] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `${env.URL_API}/movie/now_playing?api_key=${env.API_KEY}&language=fr-FR`
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
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: 30,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        En ce moment au cinéma
      </Text>

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

      <ScrollView style={styles.contentList}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => {
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
                      uri:
                        "https://image.tmdb.org/t/p/original" +
                        item.poster_path,
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
                {/* <Text
                    style={{
                      color: "white",
                    }}
                    numberOfLines={3}
                  >
                    {item.overview}
                  </Text> */}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 70,
    backgroundColor: "black",
  },
  contentList: {
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
