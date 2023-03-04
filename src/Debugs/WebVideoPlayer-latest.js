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
import { useNavigation } from "@react-navigation/native";
const WebVideoPlayer = ({ wholeResult, FetchedUrl }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [styleVideo, setStyleVideo] = React.useState({});
  const navigation = useNavigation();
  React.useEffect(() => {
    if (wholeResult !== undefined && FetchedUrl !== undefined) {
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
        parentTransform:
          FetchedUrl.Orientation == "Landscape"
            ? `transform: rotate(0deg);`
            : `transform: rotate(180deg);`,
      });
      setLoaded(true);
    }
  }, [wholeResult, FetchedUrl]);

  const vid = wholeResult;

  // create a two dynamic array of objects to store the fromDate and toDate from the wholeResult
  // const fromDate = [];
  // const toDate = [];
  // for (let i = 0; i < vid.length; i++) {
  //   fromDate.push(new Date(vid[i].mediaSchedule.fromDate));
  //   toDate.push(new Date(vid[i].mediaSchedule.toDate));
  // }
  // console.log(vid[0].mediaSchedule.fromDate);
  // console.log(vid[0].mediaSchedule.toDate);

  const fromDate = new Date(vid[0].mediaSchedule.fromDate);
  const toDate = new Date(vid[0].mediaSchedule.toDate);
  const disableSchedule = vid[0].mediaSchedule.disableSchedule;
  // // create a new array to store the final result
  // [
  //   {
  //     mediaSchedule: {
  //       disableSchedule: "true",
  //       fromDate: "2023-03-02T17:13:14.424Z",
  //       toDate: "",
  //       videoUrl:
  //         "https://assets.mixkit.co/videos/preview/mixkit-woman-meditating-with-her-dog-in-the-sunset-4800-large.mp4",
  //     },
  //     uri: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540rishabhgarg60%252Fvideoplayer_app2/mixkit-woman-meditating-with-her-dog-in-the-sunset-4800-large.mp4",
  //   },
  //   {
  //     mediaSchedule: {
  //       disableSchedule: "true",
  //       fromDate: "2023-03-02T17:13:14.425Z",
  //       toDate: "",
  //       videoUrl:
  //         "https://assets.mixkit.co/videos/preview/mixkit-woman-cleaning-her-house-dancing-happy-43379-large.mp4",
  //     },
  //     uri: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540rishabhgarg60%252Fvideoplayer_app2/mixkit-woman-cleaning-her-house-dancing-happy-43379-large.mp4",
  //   },
  // ];
  return (
    loaded && (
      <>
        <TouchableOpacity
          onLongPress={() =>
            setTimeout(() => {
              navigation.navigate("Home");
            }, 7000)
          }
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
              ${styleVideo.parentTransform}
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
            document.getElementById("myVideo").setAttribute("src", videoSource[0].uri);
      
            function videoPlay(videoNum) {
              document
                .getElementById("myVideo")
                .setAttribute("src", videoSource[videoNum].uri);
              document.getElementById("myVideo").load();
              document.getElementById("myVideo").play();
            }
            document
              .getElementById("myVideo")
              .addEventListener("ended", myHandler, false);
            var incr = (function () {
              var i = 0;
      
              return function () {
                    const now = new Date();
                    const fromDate = new Date(videoSource[i].mediaSchedule.fromDate);
                    const toDate = new Date(videoSource[i].mediaSchedule.toDate);
                    if (videoSource[i].mediaSchedule.disableSchedule == "true") {
                      if (i < videoCount-1) {
                        i++;
                      } else {
                        i = 0;
                      }
                    } else if (now > fromDate && now < toDate) {
                      if (i < videoCount-1) {
                        i++;
                      } else {
                        i = 0;
                      }
                    } else {
                      if (i < videoCount-1) {
                        i++;
                        const fromDate = new Date(videoSource[i].mediaSchedule.fromDate);
                    const toDate = new Date(videoSource[i].mediaSchedule.toDate);
                        if (now > fromDate && now < toDate) {
                          i = i;
                        } else {
                          i = 0;
                        }
                      } else {
                        i = 0;
                      }
                    }
                return i;
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
