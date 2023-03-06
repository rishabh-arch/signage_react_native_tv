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
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Network from "expo-network";
import { androidId } from "expo-application";

function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const handleLogout = async () => {
  const isConnected = await Network.getNetworkStateAsync()
    .then(async (status) => {
      if (status.isConnected) {
        const response = await axios
          .get(
            `http://192.168.0.200:5000/api/Signage/NativeTV/MediaQuery?UID=${androidId}`
          )
          .then(async (res) => {
            const { msgError, msg } = res.data;
            const { endDate } = msg;
            if (!msgError) {
              if (new Date(endDate) > new Date()) {
                alert(
                  `Can't Logout before ${new Date(endDate).toLocaleString(
                    "en-US",
                    options
                  )} ,Please Contact Admin!`
                );
              }
              else{
                await AsyncStorage.removeItem("isAuth");
                await AsyncStorage.removeItem("StoredURI");
                alert("You are logged out");
              }
            }
            else{
              await AsyncStorage.removeItem("isAuth");
              await AsyncStorage.removeItem("StoredURI");
              alert("You are logged out");
            }
          });
      } else alert("Please Connect to Wifi");
    })
    .catch((err) => {
      alert("Please Connect to Wifi");
    });

  // const response = await axios
  // .get(
  //   `http://192.168.0.200:5000/api/Signage/NativeTV/MediaQuery?UID=${androidId}`
  // )

  await AsyncStorage.removeItem("isAuth");
  await AsyncStorage.removeItem("StoredURI");
};
const Home = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5C000",
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
          <TouchableOpacity onPress={handleLogout}>
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
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "http://play.google.com/store/apps/details?id=com.google.android.apps.maps"
              );
            }}
          >
            <View>
              <Text style={styles.item}>
                <Ionicons
                  name="logo-google-playstore"
                  size={25}
                  style={styles.Icons}
                  color="white"
                />
                {"  "}
                Update App
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QrCodePage");
            }}
          >
            <View>
              <Text style={styles.item}>
                <Ionicons
                  name="qr-code"
                  size={25}
                  style={styles.Icons}
                  color="white"
                />
                {"  "}
                QR CODE
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View>
              <Text style={styles.item}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  style={styles.Icons}
                  color="white"
                />
                {"  "}
                Go Back
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
    backgroundColor: "#23211E",
    width: Dimensions.get("window").width,
    color: "white",
    marginVertical: 8,
    // marginHorizontal: 16,
    borderBottomColor: "#F5C000",
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
    backgroundColor: "#23211E",
    transform: [{ scale: 0.9 }, { perspective: 1 }],
    // borderRadius: 25,
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
    borderColor: "#23211E",
    borderBottomColor: "#F5C000",
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
    backgroundColor: "#fff",
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
