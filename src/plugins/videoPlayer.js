import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const VideoPlayer = ({ wholeResult,FetchedUrl }) => {
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);

  React.useEffect(() => {
    if (wholeResult !== undefined) {
      setProgress(true);
    }
  }, []);
  React.useEffect(() => {
    if (status?.didJustFinish) {
      setIndex((idx) => (idx == wholeResult.length - 1 ? 0 : idx + 1));
    }
  }, [status]);

  var incr = (function () {
    var i = 0;

    return function () {
      if (i > 2) {
        i = 0;
      }
      return i++;
    };
  })();
  const checkRef = () => {
    // if (videoRef.current) {
    setIndex((idx) => (idx == wholeResult.length - 1 ? 0 : idx + 1));
    videoRef.current.replayAsync();
    // }
  };
  const videofn = () => (
    <Video
      ref={videoRef}
      style={styles.video}
      source={{
        uri: wholeResult[incr()],
      }}
      useNativeControls={false}
      shouldPlay
      resizeMode="stretch"
      isLooping={true}
    />
  );
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {progress &&
      wholeResult[index] !== "" &&
      wholeResult[index] !== undefined ? (
          <Video
           key={index}
           ref={videoRef}
           style={styles.video}
           source={{
             uri: wholeResult[0],
           }}
           onError={(error) => {
              alert(error);
            }}
           useNativeControls={false}
           shouldPlay
           resizeMode="contain"
           isLooping={true}
           isMuted={FetchedUrl.Audio=="Mute"?true:false}
           rotation={
            FetchedUrl.Orientation == "Landscape"?0:270
           }
         />
      ) : null}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

  },
  video: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get('window').width,
    flex: 1,
    alignSelf: "stretch",
  },
});
