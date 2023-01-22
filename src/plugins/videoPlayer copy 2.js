import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
const VideoPlayer = ({ wholeResult }) => {
  const focuspoint = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({ wholeResult: "" });
  const [isLoaded, setLoaded] = React.useState(true);
  const [progress, setProgress] = React.useState(false);
  React.useEffect(() => {
    if (wholeResult !== undefined) {
      setProgress(true);
    }
  }, []);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (status?.didJustFinish) {
  //       setIndex((idx) => (idx == wholeResult.length - 1 ? 0 : idx + 1));
  //     }
  //   }, 1000);
  //   // {console.log("wholeResult ", focuspoint.current.replayAsync())}
  // }, [status?.didJustFinish]);

  // useCallback(() => {
  //   if (status?.didJustFinish) {
  //     setIndex((idx) =>
  //     idx == wholeResult.length - 1 ? 0 : idx + 1
  //     );
  //   }
  // }, [status]);
  // console.log("wholeResult rtrt ", wholeResult);

  const cachedValue = useMemo(
    () => (
      <Video
        ref={focuspoint}
        style={styles.video}
        source={{
          uri: wholeResult.length == 1 ? wholeResult[0] : wholeResult[index],
          downloadAsync: true,
          overrideFileExtensionAndroid: "mp4",
        }}
        useNativeControls={false}
        shouldPlay
        resizeMode="stretch"
        isLooping={wholeResult.length == 1 ? true : false}
        onError={(error) => 
          Alert(error)
        }
        // onPlaybackStatusUpdate={(status) => wholeResult.length==1?null: setStatus(() => status?.didJustFinish==true?focuspoint.current.props.source:null)}

        // onPlaybackStatusUpdate={(status) => wholeResult.length==1?null: setStatus(() => status?.didJustFinish==true?focuspoint.current.replayAsync():null)}

        onPlaybackStatusUpdate={(status) =>
          status?.didJustFinish == true
            ? setIndex((idx) => (idx == wholeResult.length - 1 ? 0 : idx + 1))
            : null
        }
        // onPlaybackStatusUpdate={(status) => wholeResult.length==1?null: setStatus(() => status)}
      />
    ),
    [index]
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={3000}
      >
        {/* {console.log("wholeResult ", "focuspoint.current.props.source.uri")} */}
        {progress &&
        wholeResult[index] !== "" &&
        wholeResult[index] !== undefined
          ? cachedValue
          : null}
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
