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
           
            let currentIndex = 0;
            document.getElementById("myVideo").setAttribute("src", videoSource[currentIndex].uri);
            const video = document.getElementById("myVideo");
            
            document
            .getElementById("myVideo")
            .addEventListener("ended", playCurrentVideo, false);
            
            function playVideo(videoUrl, loop) {
              video.src = videoUrl;
              video.loop = loop;
              video.play();
            }
            function playCurrentVideo() {
              if (videoSource.length > 1) {
                while (currentIndex < videoSource.length) {
                  currentIndex = (currentIndex + 1) % videoSource.length;
                  const { mediaSchedule } = videoSource[currentIndex]
                  const disableSchedule = mediaSchedule.disableSchedule;
                  if (disableSchedule === "false" && videoSource.length > 1) {
                    const now = new Date();
                    const fromDate = new Date(mediaSchedule.fromDate);
                    const toDate = new Date(mediaSchedule.toDate);
                    if (now >= fromDate && now <= toDate) {
                      video.src = videoSource[currentIndex].uri;
                      video.play();
                      break;
                    }
                    else if (now < fromDate) {
                      video.pause();
                      continue;
                    }
                    else if (now > toDate) {
                      videoSource.splice(currentIndex, 1);
                      video.pause();
                      continue;
                    }
                  }
                  else {
                    video.src = videoSource[currentIndex].uri;
                    video.play();
                    break;
                  }
                }
              }
              else {
                if (videoSource.length <= 1) {
                  document
                    .getElementById("myVideo").removeEventListener("ended", playCurrentVideo, false);
                  playVideo(videoSource[0].uri, true);
                  return;
                }
              }
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
