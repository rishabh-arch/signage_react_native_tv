import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { useEffect, useState } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import yt from "../YoutubeRegex";
const YoutubeIframePlayer = ({ wholeResult, FetchedUrl }) => {
  // const [result, setResult] = useState(null);

  // const _handlePressButtonAsync = async () => {
    // var youtube_url = wholeResult[0];

    // if (youtube_url.match("/?list=") !== null) {
    //   youtube_url = youtube_url.replace("?list=", "&list=");
    // }
    // const Result_yt = yt(youtube_url);
    // console.log(Result_yt);
    // // if (Result_yt[0] == "video") {
    // //   let result = await WebBrowser.openBrowserAsync(
    // //     `https://youtube.com/embed/${Result_yt[1]}?rel=0&autoplay=1&controls=0&showinfo=0&playlist=${Result_yt[1]}&loop=1`
    // //   );
    // //   setResult(Result_yt[1]);
    // // } else if (Result_yt[0] == "playlist") {
    // //   let result = await WebBrowser.openBrowserAsync(
    // //     `https://youtube.com/embed/videoseries?list=${Result_yt[2]}&loop=1&playsinline=1&autoplay=1&controls=0`
    // //   );
    // //   setResult(Result_yt[2]);
    // // }

    // setResult(wholeResult[0]);
  // };

  // useEffect(() => {
  //   setResult(wholeResult[0]);
  // }, []);

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
          YoutubePlaylist(wholeResult[0]):
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
