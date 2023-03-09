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
  const [mediaInformation, setMediaInformation] = React.useState({});
  // const [downloaded, setDownloaded] = React.useState(false);

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
          `http://192.168.0.200:5000/api/Signage/NativeTV/MediaQuery?UID=${androidId}`
        )
        .then(async (Fetched_Data) => {
          console.log("Fetched_Data", Fetched_Data.data.msg);
          if (!Fetched_Data.data.msgError) {
            AsyncStorage.setItem("endDate", Fetched_Data.data.msg.endDate);
            const Fetched_TypeOf_Media =
              Fetched_Data.data.msg.MediaInfo.TypeOfMedia;
            setMediaInformation(Fetched_Data.data.msg.MediaInfo);
            if (
              Fetched_TypeOf_Media === "video" &&
              Fetched_Data.data.msg.MediaInfo.MediaUrl.length > 1
            ) {
              Fetched_Data.data.msg.MediaInfo.TypeOfMedia = "multi_video";
              setMediaFunction("multi_video");
            } else {
              setMediaFunction(Fetched_TypeOf_Media);
            }
            return [Fetched_Data, "wolfkey", Fetched_TypeOf_Media];
          } else if (Fetched_Data.data.msg === "Device is Expired") {
            AsyncStorage.setItem("endDate", "false");
            throw new Error("No Data Found");
          } else {
            AsyncStorage.setItem("endDate", "true");
            throw new Error("No Data Found");
          }
        })
        .then(async (result) => {
          setIsAuth(true);
          if (result[0].data.msg.MediaInfo.MediaUrl.length < 1) {
            setProgress(1);
            setState({
              FetchedUrl: { Orientation: "Landscape", Audio: "Mute" },
              wholeResult: [
                {
                  mediaSchedule: {
                    disableSchedule: "true",
                    fromDate: "",
                    toDate: "",
                  },
                  uri: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
                },
              ],
            });
            setTypeofMedia("VideoPlayer");
            setIsLoaded(true);
            return "VideoPlayer";
          } else {
            if (FreeSpace > megabytesToBytes(500)) {
              const FetchedUrl = result[0].data.msg.MediaInfo;
              const wholeResult = [];

              if (
                FetchedUrl.TypeOfMedia !== "youtube" &&
                FetchedUrl.TypeOfMedia !== "website"
              ) {
                const Urls_length = FetchedUrl.MediaUrl.length;
                for (let i = 0; i < Urls_length; i++) {
                  const cachingMedia = await CacheMedia_copy(
                    FetchedUrl.MediaUrl[i][`${result[2]}Url`],
                    setProgress,
                    async (uri) => {
                      setVideoName(uri.split("/").pop());
                      wholeResult.push({
                        uri: uri,
                        mediaSchedule: FetchedUrl.MediaUrl[i],
                      });
                      const StringUri = JSON.stringify(wholeResult);
                      setState({
                        FetchedUrl: FetchedUrl,
                        wholeResult: wholeResult,
                      });
                      const storingURI = await AsyncStorage.setItem(
                        "StoredURI",
                        `${StringUri}?TypeOfMedia=${FetchedUrl.TypeOfMedia}&Orientation=${FetchedUrl.Orientation}&Audio=${FetchedUrl.Audio}`
                      );
                      if (wholeResult.length === Urls_length) {
                        setIsLoaded(true);
                      }
                    }
                  );
                }
              } else {
                wholeResult.push({ uri: FetchedUrl.MediaUrl[0] });
                setState({
                  FetchedUrl: FetchedUrl,
                  wholeResult: wholeResult,
                });
                setProgress(1);
                setIsLoaded(true);
              }
            } else {
              cleanMemory(setVideoName, () => APP());
            }
          }
        })
        .catch(async (error) => {
          console.error("error from Catch", error);
          checkEndDate();
        });
    };

    // check endDate from AsyncStorage and compare with current date
    const checkEndDate = async () => {
      const endDate = await AsyncStorage.getItem("endDate");
      const currentDate = new Date();
      const endDateFromStorage = new Date(endDate);
      if (currentDate > endDateFromStorage || endDate === "false") {
        console.log("Hi I am here now under checkEndDate if condition");
        setIsAuth(true);
        setMediaFunction("Expired");
        setIsLoaded(true);
        setProgress(1);
      } else if (endDate === "true") {
        setIsAuth(false);
        console.log("Hi I am here now under checkEndDate else if condition");
        setIsLoaded(true);
        setProgress(1);
        setState({ "": "" });
        setMediaFunction("Expired");
        
      } else {
        No_Network_AsyncStorage();
      }
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

            const wholeResult = JSON.parse(splittedResult[0].split(","));
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
      await Network.getNetworkStateAsync()
        .then(async (status) => {
          if (status.isConnected) {
            return true;
          } else {
            throw new Error("No Internet Connection");
          }
        })
        .then(async () => {
          const checkingAuth = await AsyncStorage.getItem("isAuth");
          if (checkingAuth !== "wolfkey") {
            const response = await axios.get(
              `http://192.168.0.200:5000/api/Signage/NativeTV/checkAuthorization?UID=${androidId}`
            );
            return response;
          } else {
            return true;
          }
        })
        .then(async (result) => {
          if (result !== true) {
            if (!result.data.msgError) {
              await AsyncStorage.setItem("isAuth", "wolfkey");
              APP();
            } else {
              setIsAuth(false);
              setProgress(1);
              setState({
                FetchedUrl: { Orientation: "Landscape", Audio: "Mute" },
                wholeResult: [""],
              });
              setTypeofMedia("VideoPlayer");
              setIsLoaded(true);
            }
          } else {
            APP();
          }
        })
        .catch(async (error) => {
          checkEndDate();
        });
    };

    checkConnectivity();
  }, [0]);

  const mediaTypeMap = {
    image: "ImagePlayer",
    video: "VideoPlayer",
    multi_video: "WebVideoPlayer",
    Home: "Home",
    website: "WebHtml",
    youtube: "YoutubeIframePlayer",
    Expired: "ErrorPage",
  };

  const setMediaFunction = (typeResult) =>
    setTypeofMedia(mediaTypeMap[typeResult]);

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
    backgroundColor: "#F5C000",
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
    backgroundColor: "#23211E",
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
