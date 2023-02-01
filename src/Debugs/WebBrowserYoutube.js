import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import YoutubeIframe from "react-native-youtube-iframe";
import * as Linking from "expo-linking";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import * as IntentLauncher from "expo-intent-launcher";
import * as ScreenOrientation from "expo-screen-orientation";

import yt from "../plugins/YoutubeRegex";
import * as WebBrowser from "expo-web-browser";
const WebBrowserYoutube = ({ wholeResult,FetchedUrl }) => {
  console.log(FetchedUrl);
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async () => {
    var youtube_url = wholeResult[0];

    if (youtube_url.match("/?list=") !== null) {
      youtube_url = youtube_url.replace("?list=", "&list=");
    }
    const Result_yt = yt(youtube_url);

    WebBrowser.WebBrowserPresentationStyle.OVER_FULL_SCREEN;

    if (Result_yt[0] == "video") {
      let result = await WebBrowser.openBrowserAsync(
        `https://youtube.com/embed/${Result_yt[1]}?rel=0&autoplay=1&controls=0&showinfo=0&playlist=${Result_yt[1]}&loop=1`
      );
    } else if (Result_yt[0] == "playlist") {
      let result = await WebBrowser.openBrowserAsync(
        `https://youtube.com/embed/videoseries?list=${Result_yt[2]}&loop=1&playsinline=1&autoplay=1&controls=0`
      );
    }
    setResult(result);
  };
  React.useEffect(() => {
    _handlePressButtonAsync();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          justifyContent: "center",
        }}
        source={require("../../assets/YoutubeLogo.png")}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
};

export default WebBrowserYoutube;

const styles = StyleSheet.create({
  TouchableOpacity: {
    alignItems: "center",
    width: 900,
    height: 900,
    position: "absolute",
    borderWidth: 3,
    borderColor: "red",
    zIndex: 1,
  },
  container: {
    flex: 1,
    border: "1px solid red",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    width: Dimensions.get("window").width,
    borderWidth: 3,
    position: "relative",
  },
});
