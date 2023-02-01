import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import YoutubeIframe from "react-native-youtube-iframe";

const WebMedia = ({ wholeResult }) => {
  return (
    <View style={styles.container2}>
      <YoutubeIframe
        // height={vw}
        // width={vw}
        useLocalHTML={true}
        playListStartIndex={0}
        height={Dimensions.get("window").height}
        width={Dimensions.get("window").width}
        videoId={"iee2TATGMyI"}
        play={true}
        style={styles.container}
        playList={"PLyqrdaUWxZsWJHIabx4leyYVAlchb_g4V"}
        initialPlayerParams={{
          controls: false,
          modestBranding: false,
          rel: false,
          showinfo: false,
          fs: false,
          playsinline: true,
          enablejsapi: true,
          loop: true,
          start: 0,
          origin: "https://youtube.com/",
          autoplay: 1,
          
        }}
        forceAndroidAutoplay={true}
      />
    </View>
  );
};

export default WebMedia;

const styles = StyleSheet.create({
  TouchableOpacity: {
    alignItems: "center",
    width: 900,
    height: 900,
    position: "absolute",
    zIndex: 1,
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "relative",
  },
  container2: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  GridButton: {
    alignItems: "center",
    width: 60,
    backgroundColor: "#DDDDDD",
    margin: 10,
    borderWidth: 3,
    borderColor: "red",
  },
});
