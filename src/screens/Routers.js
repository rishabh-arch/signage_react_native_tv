import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import VideoPlayer from "../plugins/videoPlayer";
import ImagePlayer from "../plugins/ImagePlayer";
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
import CacheMedia from "../plugins/CacheMedia";
import CacheMedia_copy from "../plugins/CacheMedia_copy";
import CheckNetworkStatus from "../plugins/CheckNetworkStatus";
import WebMedia from "../plugins/WebMedia";
import WebBrowserYoutube from "../plugins/WebBrowserYoutube";
import WebVideoPlayer from "../plugins/WebVideoPlayer";

const Routers = () => {
  const [TypeofMedia, setTypeofMedia] = React.useState("whoARE TYOU");
  const [state, setState] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [VideoName, setVideoName] = React.useState("Loading... Please Wait");

  useEffect(() => {
    const APP = async () => {
      setIsLoaded(false);
      const response = await axios
        .post(
          "http://192.168.0.103:5000/api/Signage/NativeTV/checkAuthorization",
          { UID: androidId }
        )
        .then(async (Fetched_Data) => {
          if (!Fetched_Data.data.msgError) {
            const checkingAuth = await AsyncStorage.getItem("isAuth");
            const Fetched_TypeOf_Media =
              Fetched_Data.data.msg.MediaInfo.TypeOfMedia;
            if (
              Fetched_TypeOf_Media === "video" &&
              Fetched_Data.data.msg.MediaInfo.MediaUrl.length > 1
            ) {
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
              FetchedUrl: { Orientation: "landscape", Audio: "Mute" },
              wholeResult:
                "https://video-previews.elements.envatousercontent.com/696e3557-848c-4e4c-a245-c7ee950867ed/watermarked_preview/watermarked_preview.mp4",
            });
            setTypeofMedia("VideoPlayer");
            return "VideoPlayer";
          } else {
            setIsAuth(true);
            if (result[0].data.msg.MediaInfo.MediaUrl[0] === undefined) {
              setProgress(1);
              setState({
                FetchedUrl: { Orientation: "landscape", Audio: "Mute" },
                wholeResult:
                  "https://video-previews.elements.envatousercontent.com/696e3557-848c-4e4c-a245-c7ee950867ed/watermarked_preview/watermarked_preview.mp4",
              });
              setTypeofMedia("VideoPlayer");
              return "VideoPlayer";
            } else {
              const FetchedUrl = result[0].data.msg.MediaInfo;
              const wholeResult = [];

              if (FetchedUrl.TypeOfMedia !== "youtube")
                for (let i = 0; i < FetchedUrl.MediaUrl.length; i++) {
                  setVideoName(FetchedUrl.MediaUrl[i].split("/").pop());
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
                      const storingURI = await AsyncStorage.setItem(
                        "StoredURI",
                        `${StringUri}?TypeOfMedia=${FetchedUrl.TypeOfMedia}&Orientation=${FetchedUrl.Orientation}&Audio=${FetchedUrl.Audio}`
                      );
                    }
                  );
                }
              else {
                wholeResult.push(FetchedUrl.MediaUrl[0]);
                setState({
                  FetchedUrl: FetchedUrl,
                  wholeResult: wholeResult,
                });
                setProgress(1);
                // const storingURI = await AsyncStorage.setItem(
                //   "StoredURI",
                //   `${FetchedUrl.MediaUrl[0]}?TypeOfMedia=${FetchedUrl.TypeOfMedia}&Orientation=${FetchedUrl.Orientation}&Audio=${FetchedUrl.Audio}`
                // );
              }
              return wholeResult;
            }
          }
        })
        .finally(() => {
          setIsLoaded(true);
          return 0;
        })
        .catch(async (error) => {
          const fetchedURI = await AsyncStorage.getItem("StoredURI").then(
            (result) => {
              if (result !== null) {
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
                if (params.TypeOfMedia === "video" && wholeResult.length > 1) {
                  setMediaFunction("multi_video");
                } else {
                  setMediaFunction(params.TypeOfMedia);
                }
                setIsLoaded(true);
                setIsAuth(true);
                setProgress(1);
              } else {
                setIsAuth(false);
                setIsLoaded(true);
                setProgress(1);
                setState({ "": "" });
                setVideoName("Looks like there is no Media to play");
              }
            }
          );
        });
    };

    APP();
  }, [0]);
  const setMediaFunction = (typeResult) => {
    if (typeResult === "image") {
      setTypeofMedia("ImagePlayer");
    } else if (typeResult === "video") {
      setTypeofMedia("VideoPlayer");
    } else if (typeResult === "multi_video") {
      setTypeofMedia("WebVideoPlayer");
    } else {
      setTypeofMedia("WebBrowserYoutube");
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
      {isLoaded && progress === 1 && state !== {} ? (
        <Stack.Navigator
          screenOptions={{
            transitionSpec: { open: config },
          }}
          initialRouteName={!isAuth ? "QrCodePage" : TypeofMedia}
        >
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
          <Stack.Screen name="WebMedia" options={{ headerShown: false }}>
            {(props) => <WebMedia {...state} />}
          </Stack.Screen>
          <Stack.Screen name="WebVideoPlayer" options={{ headerShown: false }}>
            {(props) => <WebVideoPlayer {...state} />}
          </Stack.Screen>
          <Stack.Screen name="WebBrowserYoutube" options={{ headerShown: false }}>
            {(props) => <WebBrowserYoutube {...state} />}
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
