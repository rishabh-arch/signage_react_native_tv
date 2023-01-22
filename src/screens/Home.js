import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const Home = () => {
  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => {
          Updates.reloadAsync();
        }}
      >
        <Text style={styles.signup}>LOG-OUT!</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0BD30",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: "15%",
    marginTop: "10%",
  },
  text: {
    color: "white",
    marginTop: "-25%",
    marginLeft: "20%",
  },
  signup: {
    backgroundColor: "white",
    color: "#F0BD30",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    padding: "2%",
    fontSize: 27,
    //   marginTop: '70%'
  },
  login: {
    backgroundColor: "#3A59FF",
    color: "white",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginTop: "10%",
  },
});
