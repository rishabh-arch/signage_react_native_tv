import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const VideoPlayer = ({ wholeResult, FetchedUrl }) => {
  const videoRef = React.useRef(null);
  const [progress, setProgress] = React.useState(false);

  React.useEffect(() => {
    if (wholeResult !== undefined) {
      setProgress(true);
    }
  }, []);

  const navigation = useNavigation();
  return (
    // <View style={styles.container}>
       <TouchableOpacity
        onLongPress={() =>
          setTimeout(() => {
            navigation.navigate("Home");
          }, 7000)
        }
        style={styles.container}
      > 
        {progress && wholeResult[0] !== "" && wholeResult[0] !== undefined ? (
          <Video
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
            isMuted={FetchedUrl.Audio == "Mute" ? true : false}
            rotation={FetchedUrl.Orientation == "Landscape" ? 0 : 270}
          />
        ) : null}
      </TouchableOpacity>
  
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
    height: Dimensions.get("window").width,
    flex: 1,
    alignSelf: "stretch",
  },
});
