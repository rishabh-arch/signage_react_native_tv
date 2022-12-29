import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import * as Progress from "react-native-progress";
import Home from "../screens/Home";

// const { height, width } = useWindowDimensions();
const VideoPlayer = ({navigation}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const secondVideo = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({ wholeResult: "" });
  const [isLoaded, setLoaded] = React.useState(true);
  // three random videos url from internet in array
  // const videos = [
  //   "https://rr1---sn-npoeens7.googlevideo.com/videoplayback?expire=1672268538&ei=mnasY7_ZLMTNkAOgjIiIBQ&ip=209.107.196.46&id=o-AA_XtZiGNd85EWXJQ8nhl115QJaKEwxSWy6aBiR2yXl4&itag=22&source=youtube&requiressl=yes&spc=zIddbGWlDO01mXsXy_V3-yKtzdFSZ1I&vprv=1&mime=video%2Fmp4&ns=atQZ_vHPvOSBDUCEHB43oi8K&ratebypass=yes&dur=15.069&lmt=1629708612384047&fexp=24001373,24007246&c=WEB&txp=5532434&n=S_n-Pd5GzTbeow&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAIaQEq4KO5S1di4Y5h_fTz-rLzjR11EkF5YEYE77b7wMAiEA4jlz_nOvXxir4_6Qn-z9TAYjN5b4VWSfTTbPtYavR4A%3D&title=Ultimate %23Snackakabaliw 15s Video&rm=sn-5uay67e&req_id=f97f5130d6caa3ee&ipbypass=yes&cm2rm=sn-hog-qxal7s,sn-qxaez7e&redirect_counter=3&cms_redirect=yes&cmsv=e&mh=nC&mip=103.95.167.162&mm=34&mn=sn-npoeens7&ms=ltu&mt=1672246854&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgd4JnbEJFnJhSTplRo9AW-XmlfMh5P1SK4DW_-DEzE0cCIQCUpqbBo_7ZU7o9gxl1rM_OfgzetD9fgB8XuqSbuxynmA%3D%3D",
  //   "https://rr4---sn-3pm7kn7z.googlevideo.com/videoplayback?expire=1672267282&ei=snGsY6yBBPe8vcAPzLqRqAU&ip=175.199.102.213&id=o-AJfB55_KKMHf6JOuf4C1-2k8clDV12n-sidesoTaZ1O8&itag=18&source=youtube&requiressl=yes&spc=zIddbK0po_CL0_MUcyMshzDz9SLDgkg&vprv=1&mime=video%2Fmp4&ns=h_iOnxiB6DpoUHmpB48xfZcK&cnr=14&ratebypass=yes&dur=1469.242&lmt=1666531179809743&fexp=24001373,24007246&c=WEB&txp=5538434&n=StmRYH4opeROXw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgKj2qPo69gJlySys834GtwiOb9CBDQdrnWmSPEPs6r6sCIQCagxZLNDSxxaXQnJHn6lsIMvtMXLdyEZVL3-4rzTGFkA%3D%3D&rm=sn-3u-20nr7z,sn-3u-bh2zd7d&req_id=e58772bcadf9a3ee&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Ws&mm=30&mn=sn-3pm7kn7z&ms=nxu&mt=1672245636&mv=m&mvi=4&pl=16&lsparams=ipbypass,mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAKbND7XK4wDisfJsBrkrHXSsp7OvxaV5T-ve7BNp5PHVAiBQdFLG78UTE63sgiCXT1Srb5VGUN-HxV6wsnVdMZVsxA%3D%3D",
  //   "https://rr1---sn-oguesnde.googlevideo.com/videoplayback?expire=1672263920&ei=kGSsY5OJL8ybvdIPgOS3yA0&ip=58.120.209.204&id=o-AHv2tH42ABWcISYJpeeX7Y70iQxfu6U40NKH4vtB1DO-&itag=22&source=youtube&requiressl=yes&spc=zIddbEuchIOS7fGqpbbS0TQhd38wJDc&vprv=1&mime=video%2Fmp4&ns=jtxllO-xnBgalzuzZe5bmGUK&ratebypass=yes&dur=313.840&lmt=1647455677890745&fexp=24001373,24007246&c=WEB&txp=4532434&n=OxusjFe7j-iN4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMBQR1ccPMEDWyfwxwBEJMVuI2A0UPI2uXYpG4pzXnYnAiAMdDd2dX3f8FmczMkUrTBPChl90MlZ4_OZEwwJcZH2nw%3D%3D&title=COSTA RICA IN 4K 60fps HDR (ULTRA HD)&redirect_counter=1&rm=sn-n3cgv5qc5oq-bh2sk7s&req_id=a7c34db25da4a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=NH&mm=30&mn=sn-oguesnde&ms=nxu&mt=1672244687&mv=m&mvi=1&pl=17&lsparams=ipbypass,mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAIGJOu3epxEumudLlypUDJeHouItuuiJ9qnSVZVJ7q_WAiBJjcYfIKO9qoMkBsqpVAYf2J3xJNtsdgfKQyee-TuQCQ%3D%3D",
  // ];
  // const videoList = [
  //   "https://media.istockphoto.com/id/1341017374/video/generic-3d-car-crash-test-with-crashtest-dummy-car-destruction-realistic-4k-animation.mp4?s=mp4-640x640-is&k=20&c=QrfU-5zetLu1lvCqO7LZBCOG1LfueLClwa7iUIuQ5zY=",
  //   "https://media.istockphoto.com/id/1353614588/video/water-sample-hand-collects-water-to-explore-water-purity-analysis-environment-ecology-water.mp4?s=mp4-640x640-is&k=20&c=EBuJcbd9iFG3SFNgeR7vDPPfmNxC36ZLIowQJKGITIc=",
  //   "https://media.istockphoto.com/id/1361282852/video/check-mark-symbols-success-accepted-4k-video-with-alpha-channel-check-mark-on-transparent.mp4?s=mp4-640x640-is&k=20&c=0ZQAtSqbHQZpOaI0tNzAmyiSRdfO3vM1FpCsRWpBNis=",
  // ];

  var url =
    "https://rishabh-arch.github.io/signage_react_native_tv/assets/videoList.json";

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

  React.useEffect(() => {
    if (status?.didJustFinish) {
      setIndex((idx) => (idx == 2 ? 0 : idx + 1));
    }
  }, [status?.didJustFinish]);

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
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: state.wholeResult.videoList[index].videoUrl,
            }}
            useNativeControls={false}
            shouldPlay
            resizeMode="stretch"
            // isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
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

export default VideoPlayer;

const styles = StyleSheet.create({
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

    // flex: 1,
    backgroundColor: "#000",
    // alignItems: 'center',
    // justifyContent: 'center',
    transform: [{ rotate: "0deg" }],
    alignSelf: "stretch",
  },
});
