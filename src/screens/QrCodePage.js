import { StyleSheet, Text, View, Animated } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Svg } from "react-native-svg";
import React from "react";
import * as Application from "expo-application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { androidId } from "expo-application";
import * as Device from "expo-device";
import * as Updates from "expo-updates";

import Ionicons from "@expo/vector-icons/Ionicons";

const QrCodePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, SetMessage] = React.useState("");

  const checkAuth = async () => {
    const response = await axios
      .post(
        "http://192.168.0.200:5000/api/Signage/NativeTV/DeviceRegistration",
        { UID: androidId, android: Device }
      )
      .then(async (res) => {
        setIsLoaded(true);
        if (!res.data.msgError) {
          SetMessage(res.data.msg);
        } else {
        SetMessage(res.data.msg);}
      })
      .catch((error) => {
        SetMessage("Server Not Found");
      });
  };
  React.useEffect(() => {
    checkAuth();
  }, []);

  const animatedValue = new Animated.Value(0);
  // create a sample animation
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start();

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
        <Animated.View
          style={{
            opacity: animatedValue,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }}
        >
          <QRCode
            size={300}
            // style={styles.container}
            value={Application.androidId}
          />
        </Animated.View>
        <View style={styles.TextStyle}>
         
          <Text style={styles.androidText}>
          <Text style={styles.head}>
            Scan the QR from your Application or enter this code{" "}
          </Text>
            {"\n"}
            {Application.androidId}
          </Text>
          {isLoaded ? (
            <Text style={styles.success}>
              <Ionicons
                name="cloud-done-outline"
                size={55}
                style={styles.Icons}
                color="#167403"
              />{" "}
              {" \n"}
              {/* Your Device is Registered! You can Continue after Restart */}
              {message}
            </Text>
          ) : <Text style={[styles.success,styles.red]}>
          <Ionicons
            name="warning-outline"
            size={55}
            style={styles.Icons}
            color="red"
          />{" "}
          {" \n"}
          {/* Your Device is Registered! You can Continue after Restart */}
          Wait for the Server to Register Your Device
        </Text>}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  QRcode: {
    transform: [{ rotate: "0deg" }],
    alignItems: "center",
    // flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5C000",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 40,
    flexDirection: "row",
    // flexWrap: "wrap",
    transform: [{ scale: 0.9 }, { perspective: 1 }],
    alignContent: "center",
    alignSelf: "center",
  },
  TextStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    // backgroundColor: "rgba(150, 139, 4, 0.58)",
    margin: 10,
    // padding: 20,
    flexDirection: "column",
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
    gap: 10,
  },
  head: {
    fontSize: 20,
  },
  androidText: {
    color: "#000",
    // backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    height: 100,
    fontSize: 30,

    // margin: 20,

    // padding: 3,
    // gap: 10,
  },
  success: {
    color: "#167403",
    textAlign: "center",
    fontSize: 20,
    // backgroundColor: "#167403",
    margin: 30,
    padding: 20,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    // borderRadius: 20,
  },
  red:{
    color: "red",
  }
});

export default QrCodePage;
