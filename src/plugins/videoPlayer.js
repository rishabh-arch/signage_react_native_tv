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
  const [progress, setProgress] = React.useState(false);
  React.useEffect(() => {
    if(wholeResult !== undefined){
      setProgress(true);
    }
  }, [wholeResult])
  
  console.log("wholeResult ", wholeResult);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate("Home");
        }}
        delayLongPress={3000}
      >
       {progress? <Video
          style={styles.video}
          source={{
            uri: wholeResult,
          }}
          useNativeControls={false}
          shouldPlay
          resizeMode="stretch"
          isLooping
        />:null}
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
