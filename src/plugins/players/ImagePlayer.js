import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import * as Progress from "react-native-progress";
// import Home from "../../screens/Home";
// import ScrollingBackground from "react-native-scrolling-images";
import { useNavigation } from "@react-navigation/native";

// const { height, width } = useWindowDimensions();
const ImagePlayer = ({ wholeResult, FetchedUrl }) => {
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({ wholeResult: "" });
  const [isLoaded, setLoaded] = React.useState(true);
  const [progress, setProgress] = React.useState(false);
  const [Rotation, setRotation] = React.useState("0deg");
  React.useEffect(() => {
    if (wholeResult !== undefined) {
      setProgress(true);
      if (FetchedUrl.Orientation == "Landscape") {
        setRotation("0deg");
      } else {
        setRotation("270deg");
      }
    }
  }, []);

  const delay = 15000;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={3000}
      >
        {progress &&
        wholeResult[index] !== "" &&
        wholeResult[index] !== undefined ? (
          <ImageBackground
            fadeDuration={0}
            source={{
              uri:
                wholeResult.length == 1 ? wholeResult[0] : wholeResult[index],
            }}
            onLoadEnd={() => {
              setTimeout(
                () =>
                  setIndex((prevIndex) =>
                    prevIndex === wholeResult.length - 1 ? 0 : prevIndex + 1
                  ),
                delay
              );
            }}
            resizeMode="contain"
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,
              transform: [{ rotate: Rotation }],
              justifyContent: "center",
            }}
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
