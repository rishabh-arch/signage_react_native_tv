import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

let currentIndex = 0;

const ImagePlayer = ({ wholeResult, FetchedUrl }) => {
  const [index, setIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(false);
  const [Rotation, setRotation] = React.useState("0deg");
  React.useEffect(() => {
    if (wholeResult !== undefined) {
      console.log("wholeResult", wholeResult.length);
      setProgress(true);

      if (FetchedUrl.Orientation == "Landscape") {
        setRotation("0deg");
      } else {
        setRotation("270deg");
      }
    }
  }, []);

  const delay = FetchedUrl.delay <= 5000 ? 5000 : FetchedUrl.delay;
  const navigation = useNavigation();
  const play_images_on_loop = () => {
    while (currentIndex < wholeResult.length && wholeResult.length > 1) {
      currentIndex = (currentIndex + 1) % wholeResult.length;
      const { mediaSchedule } = wholeResult[currentIndex];
      const { disableSchedule } = mediaSchedule;
      if (disableSchedule == "false") {
        const now = new Date();
        const fromDate = new Date(mediaSchedule.fromDate);
        const toDate = new Date(mediaSchedule.toDate);
        if (fromDate <= now && toDate >= now) {
          setIndex(currentIndex);
          break;
        } else if (fromDate > now) {
          continue;
        } else if (toDate < now) {
          wholeResult.splice(currentIndex, 1);
          continue;
        } else {
          setIndex(0);
          break;
        }
      } else {
        setIndex(currentIndex);
        break;
      }
    }
    return;
  };
  useEffect(() => {
    if (wholeResult.length == 1) {
      return;
    }
    const t = setInterval(() => {
      play_images_on_loop();
    }, delay);
    return () => clearInterval(t);
  }, [index]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={7000}
      >
        {progress &&
        wholeResult[index] !== "" &&
        wholeResult[index] !== undefined ? (
          <ImageBackground
            fadeDuration={0}
            progressiveRenderingEnabled={true}
            source={{
              uri: wholeResult[index].uri,
            }}
            resizeMode="contain"
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,
              transform: [{ rotate: Rotation }],
              justifyContent: "center",
            }}
            onLoadEnd={() => {}}
          />
        ) : (
          <Progress.Circle
            size={200}
            endAngle={0.7}
            borderWidth={10}
            indeterminate={true}
            color={"white"}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  scrollingBackground: {
    backgroundColor: "#0B7483",
  },
});
