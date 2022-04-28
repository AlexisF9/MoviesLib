import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <StatusBar style="auto" />
      <Button
        title="En ce moment"
        onPress={() => navigation.navigate("En ce moment")}
      />
    </View>
  );
}
