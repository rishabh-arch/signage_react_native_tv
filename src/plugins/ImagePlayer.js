import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import * as Progress from "react-native-progress";
import Home from "../screens/Home";
// const { height, width } = useWindowDimensions();
const ImagePlayer = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const secondVideo = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({ wholeResult: "" });
  const [isLoaded, setLoaded] = React.useState(true);

  var url =
    "https://rishabh-arch.github.io/signage_react_native_tv/assets/imageList.json";

  React.useEffect(() => {
    const APP = async () =>
      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          setState({ wholeResult: result });
          setLoaded(false);
        })
        .catch(function (error) {
          console.log("-------- error ------- " + error);
          alert("result:" + error);
        });
    APP();
  }, [0]);
  const delay = 10000;
  React.useEffect(() => {
    setTimeout(
      () => setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {};
  }, [index]);

  // add random images url

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
          // console.log("Long Press");
        }}
        delayLongPress={3000}
      >
        {!isLoaded ? (
          <ImageBackground
            source={{ uri: state.wholeResult.imageList[index].imageUrl }}
            resizeMode="stretch"
            style={styles.image}
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
  image: {
    // flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    // transform: [{ rotate: "90deg" }],
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0BD30",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
