import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
const YoutubeIframePlayer = ({ wholeResult, FetchedUrl }) => {

  const YoutubePlaylist = (PlayListID) => (
    <YoutubeIframe
      useLocalHTML={true}
      playListStartIndex={0}
      height={Dimensions.get("window").height}
      width={Dimensions.get("window").width}
      webViewProps={{
        allowsFullscreenVideo: true,
        allowsInlineMediaPlayback: true,
        allowsPictureInPictureMediaPlayback: true,
        cacheEnabled: true,
      }}
      play={true}
      style={styles.container}
      playList={PlayListID}
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
      mute={FetchedUrl.Audio=="Mute"?true:false}
      // mute={true}
    />
  );
  return (
    <>

      {wholeResult ? (
        <View style={styles.container2}>{wholeResult[0]!==null?
          YoutubePlaylist(wholeResult[0].uri.youtube):
          <ImageBackground
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            justifyContent: "center",
          }}
          source={require("../../../assets/YoutubeLogo.png")}
          resizeMode="cover"
        ></ImageBackground>
          }</View>
      ) : null}
    </>

    
  );
};

export default YoutubeIframePlayer;

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
    backgroundColor: "#000",
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
});
