import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/HomeScreen";
import NowPlaying from "./pages/NowPlaying";
import Search from "./pages/Search";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

export default function App() {
  const Stack = createNativeStackNavigator();

  const Tab = createMaterialBottomTabNavigator();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         title: "Movie Database",
    //         headerStyle: {
    //           backgroundColor: "#f4511e",
    //         },
    //         headerTintColor: "#fff",
    //         headerTitleStyle: {
    //           fontWeight: "bold",
    //         },
    //       }}
    //     />
    //     <Stack.Screen name="En ce moment" component={NowPlaying} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Tab.Navigator barStyle={{ backgroundColor: "#1c2129" }}>
        <Tab.Screen name="Films" component={HomeScreen} />
        <Tab.Screen name="Cinéma" component={NowPlaying} />
        <Tab.Screen name="Rechercher" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
