import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import VideoPlayer from "../plugins/players/videoPlayer";
import ImagePlayer from "../plugins/players/ImagePlayer";
import QrCodePage from "../screens/QrCodePage";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import { AuthContext } from "../components/context/AuthContext";
import * as Progress from "react-native-progress";
import { androidId } from "expo-application";
import axios from "axios";
import {
  CacheMedia_copy,
  cleanMemory,
  megabytesToBytes,
} from "../plugins/CacheMedia_copy";
import CheckNetworkStatus from "../plugins/CheckNetworkStatus";
// import WebMedia from "../Debugs/WebMedia";
// import WebBrowserYoutube from "../plugins/WebBrowserYoutube";
import WebVideoPlayer from "../plugins/players/WebVideoPlayer";
import YoutubeIframePlayer from "../plugins/players/YoutubeIframePlayer";
import WebHtml from "../plugins/players/WebHtml";
import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
import DeviceIntents from "../plugins/DeviceIntents";
const Routers = () => {
  const [TypeofMedia, setTypeofMedia] = React.useState("");
  const [state, setState] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [VideoName, setVideoName] = React.useState("Loading... Please Wait");
  const [downloaded, setDownloaded] = React.useState(false);

  //Dear Developer, Please Understand Our Situation, Don't Steal Our Code and don't make a crack version of our app
  //We are not a big company, we are just a small company
  //Please don't create a problem for us
  // Love from Signage Team
  useEffect(() => {
    const APP = async () => {
      const FreeSpace = await FileSystem.getFreeDiskStorageAsync();
      setIsLoaded(false);
      const response = await axios
        .get(
          `http://192.168.0.200:5000/api/Signage/NativeTV/checkAuthorization?UID=${androidId}`
        )
        .then(async (Fetched_Data) => {
          if (!Fetched_Data.data.msgError) {
            console.log(Fetched_Data.data.msg.MediaInfo);
            const checkingAuth = await AsyncStorage.getItem("isAuth");
            const Fetched_TypeOf_Media =
              Fetched_Data.data.msg.MediaInfo.TypeOfMedia;
            if (
              Fetched_TypeOf_Media === "video" &&
              Fetched_Data.data.msg.MediaInfo.MediaUrl.length > 1
            ) {
              Fetched_Data.data.msg.MediaInfo.TypeOfMedia = "multi_video";
              setMediaFunction("multi_video");
            } else {
              setMediaFunction(Fetched_TypeOf_Media);
            }
            return [Fetched_Data, checkingAuth, Fetched_TypeOf_Media];
          } else {
            throw new Error("user is not ok");
          }
        })
        .then(async (result) => {
          if (result[1] !== "wolfkey") {
            setIsAuth(false);
            setProgress(1);
            setState({
              FetchedUrl: { Orientation: "Landscape", Audio: "Mute" },
              wholeResult: [
                "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
              ],
            });
            setTypeofMedia("VideoPlayer");
            return "VideoPlayer";
          } else {
            setIsAuth(true);
            if (
              result[0].data.msg.MediaInfo.MediaUrl[0] === undefined ||
              result[0].data.msg.MediaInfo.MediaUrl[0] === ""
            ) {
              console.log("user is not wolfkey");
              setProgress(1);
              setState({
                FetchedUrl: { Orientation: "Landscape", Audio: "Mute" },
                wholeResult: [
                  "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
                ],
              });
              setTypeofMedia("VideoPlayer");
              return "VideoPlayer";
            } else {
              if (FreeSpace > megabytesToBytes(500)) {
                const FetchedUrl = result[0].data.msg.MediaInfo;
                const wholeResult = [];

                if (FetchedUrl.TypeOfMedia !== "youtube" && FetchedUrl.TypeOfMedia !== "website") {
                  for (let i = 0; i < FetchedUrl.MediaUrl.length; i++) {
                    const cachingMedia = await CacheMedia_copy(
                      FetchedUrl.MediaUrl[i],
                      setProgress,
                      async (uri) => {
                        wholeResult.push(uri);
                        const StringUri = wholeResult.toString();
                        setState({
                          FetchedUrl: FetchedUrl,
                          wholeResult: wholeResult,
                        });
                        setVideoName(uri.split("/").pop());
                        const storingURI = await AsyncStorage.setItem(
                          "StoredURI",
                          `${StringUri}?TypeOfMedia=${FetchedUrl.TypeOfMedia}&Orientation=${FetchedUrl.Orientation}&Audio=${FetchedUrl.Audio}`
                        );
                      }
                    );
                  }
                  // setDownloaded(true);
                } else {
                  wholeResult.push(FetchedUrl.MediaUrl[0]);
                  setState({
                    FetchedUrl: FetchedUrl,
                    wholeResult: wholeResult,
                  });
                  setProgress(1);
                }
              } else {
                cleanMemory(setVideoName, () => APP());
              }
            }
          }
        })
        .finally(() => {
          setIsLoaded(true);
          return 0;
        })
        .catch(async (error) => {
          // console.log("error from Catch", error);
          setIsAuth(false);
          setIsLoaded(true);
          setProgress(1);
          setTypeofMedia("-");
          // No_Network_AsyncStorage();
        });
    };
    const No_Network_AsyncStorage = async () => {
      const fetchedURI = await AsyncStorage.getItem("StoredURI").then(
        (result) => {
          setIsAuth(true);
          setIsLoaded(true);
          setProgress(1);
          if (result !== null && result !== "" && result !== undefined) {
            const splittedResult = result.split("?");
            var regex = /[?&]([^=#]+)=([^&#]*)/g,
              params = {},
              match;
            while ((match = regex.exec(result))) {
              params[match[1]] = match[2];
            }
            const wholeResult = splittedResult[0].split(",");
            setState({
              FetchedUrl: params,
              wholeResult: wholeResult,
            });
            setMediaFunction(params.TypeOfMedia);
          } else {
            setMediaFunction("Home");
            setState({ "": "" });
          }
        }
      );
    };
    const checkConnectivity = async () => {
      const isConnected = await Network.getNetworkStateAsync()
        .then(async (status) => {
          if (status.isConnected) {
            // console.log("You are connected to the internet");
            // No_Network_AsyncStorage();

            APP();
          } else {
            // alert("You are not connected to the internet");
            No_Network_AsyncStorage();
          }
        })
        .catch(async (error) => {
          No_Network_AsyncStorage();
        });
    };
    checkConnectivity();
  }, [0]);

  const setMediaFunction = (typeResult) => {
    if (typeResult === "image") {
      setTypeofMedia("ImagePlayer");
    } else if (typeResult === "video") {
      setTypeofMedia("VideoPlayer");
    } else if (typeResult === "multi_video") {
      setTypeofMedia("WebVideoPlayer");
    } else if (typeResult === "Home") {
      setTypeofMedia("Home");
    } else if (typeResult === "website") {
      setTypeofMedia("WebHtml");
    } else {
      setTypeofMedia("YoutubeIframePlayer");
    }
  };
  const Stack = createNativeStackNavigator();
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <NavigationContainer>
      {isLoaded && progress === 1 && state !== {} && TypeofMedia !== "" ? (
        <Stack.Navigator
          screenOptions={{
            transitionSpec: { open: config },
          }}
          // initialRouteName={"Home"}
          // initialRouteName={"WebHtml"}
          initialRouteName={!isAuth ? "QrCodePage" : TypeofMedia}
        >
          {console.log("TypeofMedia", TypeofMedia)}
          <Stack.Screen
            name="QrCodePage"
            component={QrCodePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="VideoPlayer" options={{ headerShown: false }}>
            {(props) => <VideoPlayer {...state} />}
          </Stack.Screen>
          <Stack.Screen name="ImagePlayer" options={{ headerShown: false }}>
            {(props) => <ImagePlayer {...state} />}
          </Stack.Screen>
          <Stack.Screen name="WebVideoPlayer" options={{ headerShown: false }}>
            {(props) => <WebVideoPlayer {...state} />}
          </Stack.Screen>
          {/* <Stack.Screen name="WebBrowserYoutube" options={{ headerShown: false }}>
            {(props) => <WebBrowserYoutube {...state} />}
          </Stack.Screen> */}
          <Stack.Screen
            name="YoutubeIframePlayer"
            options={{ headerShown: false }}
          >
            {(props) => <YoutubeIframePlayer {...state} />}
          </Stack.Screen>
          <Stack.Screen name="WebHtml" options={{ headerShown: false }}>
            {(props) => <WebHtml {...state} />}
          </Stack.Screen>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ErrorPage"
            component={ErrorPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeviceIntents"
            component={DeviceIntents}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <View style={styles.viewLoading}>
          <Text style={styles.textLoading}>
            {/* <Icon style={styles.icon} name="pause" size={100} color="#fff" /> */}
            <Progress.Circle
              borderWidth={0}
              showsText
              color="black"
              progress={progress}
              size={200}
            />
            {/* <Text>{VideoName} </Text> */}
          </Text>
          <Text style={styles.textVideoName}>{VideoName} </Text>
        </View>
      )}
    </NavigationContainer>
  );
};

export default Routers;

const styles = StyleSheet.create({
  viewLoading: {
    fontSize: 30,
    color: "white",
    flex: 1,
    // backgroundColor: "#F0BD30",
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "column",
    // marginTop:Dimensions.get("window").height/2
    // height: 10,
    justifyContent: "space-around",
    // padding: 10,
  },
  textLoading: {
    fontSize: 30,
    color: "black",
    flex: 1,
    backgroundColor: "#F0BD30",
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "row",
    // border: "1px solid black",
    height: 10,
    flexWrap: "wrap",
    // margin: 10,
    // marginTop:Dimensions.get("window").height/2
  },
  textVideoName: {
    fontFamily: "monospace",
    padding: 10,
    fontSize: 30,
    color: "#F0BD30",
    flex: 1,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "#000000",
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "row",
    // border: "1px solid black",
    // height: 10,
    borderWidth: 1,
    borderColor: "black",
    flexWrap: "wrap",
    // marginTop:Dimensions.get("window").height/2
    // margin: 10,
  },
  icon: {
    fontSize: 30,
    color: "white",
    // flex:1,
    backgroundColor: "#F0BD30",
    textAlign: "center",
    textAlignVertical: "center",
    // marginTop:Dimensions.get("window").height/2
  },
});
