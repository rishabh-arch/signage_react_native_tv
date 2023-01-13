import { StyleSheet, Text, View, Animated } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Svg } from "react-native-svg";
import React from "react";
import * as Application from "expo-application";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { androidId } from "expo-application";

const QrCodePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const checkAuth = async () => {
    const t = setInterval(async () => {
      const response = await axios
        .post(
          "http://192.168.0.103:5000/api/Signage/NativeTV/checkAuthorization",
          { UID: androidId }
        )
        .then(async (res) => {
          if (!res.msgError) {
           await AsyncStorage.setItem("isAuth", "wolfkey");
            setIsLoaded(true);
            stop();
          } else console.log("user is not ok");
          return res;
        })
        .catch((error) => console.log("error no server ", error)).done();
      // console.log("response ", response.data.userIsOK);
    }, 3000);
    function stop() {
      clearInterval(t);
    }
  };

  checkAuth();

  const animatedValue = new Animated.Value(0);
  // create a sample animation
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start();

  return (
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
          style={styles.container}
          value={Application.androidId}
        />
      </Animated.View>
      <Text style={styles.TextStyle}>
        Scan the QR from your Registered Device or enter this code{" "}
        {Application.androidId}
      </Text>
      {/* <Text style={{color:'#fff',textAlign:'center',fontSize:20}}>Scan the QR from your Registered Device</Text> */}

      {isLoaded ? (
        <Text style={styles.success}>
          Your Device is Registered! Restart your device Now
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  QRcode: {
    transform: [{ rotate: "0deg" }],
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F0BE30",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 40,
  },
  TextStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    // backgroundColor: "rgba(150, 139, 4, 0.58)",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  success: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#167403",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
});

export default QrCodePage;
