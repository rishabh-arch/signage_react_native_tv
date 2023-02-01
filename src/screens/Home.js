import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { cleanMemory } from "../plugins/CacheMedia_copy";
import * as Progress from "react-native-progress";
import * as IntentLauncher from "expo-intent-launcher";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

const Home = () => {
  return (
    <View
    style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#000",
    }}
    >

    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.header}>M E N U</Text>
      </View>
      <ScrollView horizontal="true">
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("StoredURI");
            cleanMemory((cb) => showToast(cb));
          }}
        >
          <View>
            <Text style={styles.item}>
              <Ionicons
                name="md-rocket"
                size={25}
                style={styles.Icons}
                color="white"
              />
              {"  "}
              Clean Memory
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => startActivityAsync(ActivityAction.WIFI_SETTINGS)}
        >
          <View>
            <Text style={styles.item}>
              <Ionicons
                name="md-wifi"
                size={25}
                style={styles.Icons}
                color="white"
              />
              {"  "}
              Connect Wifi
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            IntentLauncher.startActivityAsync(ActivityAction.SETTINGS)
          }
        >
          <View>
            <Text style={styles.item}>
              <Ionicons
                name="md-settings"
                size={25}
                style={styles.Icons}
                color="white"
              />
              {"  "}
              Open Device Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("isAuth");
          }}
        >
          <View>
            <Text style={styles.item}>
              <Ionicons
                name="md-log-out"
                size={25}
                style={styles.Icons}
                color="white"
              />
              {"  "}
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Icons: {
    marginRight: 10,
    margin: 10,
    padding: 10,
  },
  header: {
    color: "white",
    fontSize: 20,
    // borderLeftColor: "#ef9b1c",
    // borderLeftWidth: 5,
    // paddingLeft: 10,
    // borderRightColor: "#ef9b1c",
    // borderRightWidth: 5,
    // paddingRight: 10,
    textAlign: "center",
  },
  item: {
    padding: 20,
    fontSize: 20,
    marginTop: 5,
    backgroundColor: "#1e1e1c",
    width: Dimensions.get("window").width,
    color: "white",
    marginVertical: 8,
    // marginHorizontal: 16,
    borderBottomColor: "#ef9b1c",
    borderBottomWidth: 3,
    // borderColor: "white",
    // borderWidth: 1,
    // borderRadius: 25,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    position: "relative",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    padding: 10,
    width: "90%",
    // margin: 10,
    alignSelf: "center",
    backgroundColor: "#1e1e1c",
    transform: [{ scale: 0.9 }, { perspective: 1}],
  },
  containerBox: {
    flex: 1,
    // backgroundColor: "#a06909",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
    // flexWrap: "wrap",
    borderWidth: 1,
    height: "10%",
    borderWidth: 1,
    borderColor: "#1e1e1c",
    borderBottomColor: "#ef9b1c",
    // borderBottomWidth: 1,
  },
  PressableBtn: {
    margin: 10,
    backgroundColor: "white",
    color: "#000",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    fontSize: 27,
    alignItems: "center",
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
    color: "#000",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    padding: "2%",
    fontSize: 27,
    alignItems: "center",
    // textAlign:"center",
    //   marginTop: '70%'
  },
  logout: {
    backgroundColor: "red",
    color: "white",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    padding: "2%",
    fontSize: 27,
    alignItems: "center",
    // textAlign:"center",
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
