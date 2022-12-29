import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import CustomComponent from "./src/screens/CustomComponent";
import VideoPlayer from "./src/plugins/videoPlayer";
import QrCodePage from "./src/screens/QrCodePage";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import Home from "./src/screens/Home";

export default function App() {
  const Stack = createNativeStackNavigator();
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          transitionSpec: { open: config } }}
        initialRouteName="VideoPlayer"
      >
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //   <View style={styles.container}>

    //   {/* <QrCodePage /> */}
    // {/*  */}
    //   {/* <Text style={{color: '#fff', fontSize: 30}}>Hello World</Text> */}
    //   <VideoPlayer />
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0BD30",

    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
