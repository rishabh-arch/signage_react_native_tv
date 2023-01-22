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
import { androidId } from "expo-application";
import { useNavigation } from "@react-navigation/native";
const VideoPlayer = ({ wholeResult }) => {
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({ wholeResult: "" });

  // React.useEffect(() => {
  //   const APP = async () =>

  //     await fetch("http://192.168.0.103:5000/isAuth?UID="+ androidId, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },

  //     })
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (result) {
  //         // console.log("-------- response ------- " + JSON.stringify(result.json));
  //         setState({ wholeResult: result.json });
  //         setLoaded(false);
  //       })
  //       .catch(function (error) {
  //         navigation.navigate("Home");
  //       });
  //   APP();
  // }, [0]);

  // React.useEffect(() => {
  //   if (status?.didJustFinish) {
  //     setIndex((idx) =>
  //       idx == wholeResult.videoList.length - 1 ? 0 : idx + 1
  //     );
  //   }
  // }, [status?.didJustFinish]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={3000}
      >
        {/* {!isLoaded ? ( */}
        <Video
          ref={video}
          style={styles.video}
          source={{
            // uri: wholeResult.videoList[index].videoUrl,
            uri: wholeResult,
          }}
          useNativeControls={false}
          shouldPlay
          resizeMode="stretch"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        {/* ) : (
          <Progress.Circle
            size={200}
            endAngle={0.7}
            borderWidth={10}
            indeterminate={true}
            color={"white"}
          />
        )} */}
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;

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
  video: {
    position: "relative",

    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    // width: Dimensions.get('window').height,
    // height: Dimensions.get('window').width,

    flex: 1,
    backgroundColor: "#000",
    // alignItems: 'center',
    // justifyContent: 'center',
    transform: [{ rotate: "0deg" }],
    alignSelf: "stretch",
  },
});
