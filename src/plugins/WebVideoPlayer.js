import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { WebView } from "react-native-webview";
import * as Updates from "expo-updates";
const WebVideoPlayer = ({ wholeResult, FetchedUrl }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [styleVideo, setStyleVideo] = React.useState({});

  React.useEffect(() => {
    if (wholeResult !== undefined && FetchedUrl !== undefined) {
      // // console.log("wholeResult", wholeResult);
      // console.log("FetchedUrl", FetchedUrl);
      setStyleVideo({
        transform:
          FetchedUrl.Orientation == "Landscape"
            ? `transform: rotate(0deg);`
            : `transform: rotate(90deg);`,
        size:
          FetchedUrl.Orientation == "Landscape"
            ? `width:100vw;
  height:100vh;`
            : `height:100vw;`,
        mute: FetchedUrl.Audio == "Mute" ? `muted` : ``,
      });
      setLoaded(true);
    }
  }, [wholeResult, FetchedUrl]);

  const vid = wholeResult;
  return (
    loaded && (
      <>
        <TouchableOpacity
          onLongPress={() => Updates.reloadAsync()}
          style={styles.container}
        >
          <WebView
            style={styles.container}
            originWhitelist={["*"]}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            mixedContentMode="always"
            androidLayerType="hardware"
            androidHardwareAccelerationDisabled={false}
            mediaPlaybackRequiresUserAction={false}
            source={{
              html: `<!DOCTYPE html>

      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              box-sizing: border-box;
              background: #000;
              ${styleVideo.transform}
              border: none;

            }
            video {
              margin: 0;
              padding: 0;
              border: none;
              ${styleVideo.size}
              object-fit: contain;
            }
          </style>
        </head>
        
        <body>
          <video id="myVideo" autoplay ${styleVideo.mute}></video>
          <script>
            var videoSource = new Array();
            videoSource = ${JSON.stringify(vid)};
            
            var videoCount = videoSource.length;
            var elem = document.getElementById("myVideo");
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen();
            }
            document.getElementById("myVideo").setAttribute("src", videoSource[0]);
      
            function videoPlay(videoNum) {
              document
                .getElementById("myVideo")
                .setAttribute("src", videoSource[videoNum]);
              document.getElementById("myVideo").load();
              document.getElementById("myVideo").play();
            }
            document
              .getElementById("myVideo")
              .addEventListener("ended", myHandler, false);
            var incr = (function () {
              var i = 0;
      
              return function () {
                if (i > videoCount - 1) {
                  i = 0;
                }
                return i++;
              };
            })();
            function myHandler() {
              videoPlay(incr());
            }
          </script>
        </body>
      </html>
      `,
            }}
          />
        </TouchableOpacity>
      </>
    )
  );
};

export default WebVideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    position: "relative",
  },
});
