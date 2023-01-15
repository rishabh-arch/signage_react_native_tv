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
import {androidId} from "expo-application";
import axios from "axios";
import CacheMedia from "../plugins/CacheMedia";
import CacheMedia_copy from "../plugins/CacheMedia_copy";
import CheckNetworkStatus from "../plugins/CheckNetworkStatus";

const Routers = () => {
  const [TypeofMedia, setTypeofMedia] = React.useState("whoARE TYOU");
  const [state, setState] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
  
    const APP = async () => {

      setIsLoaded(false);
      CheckNetworkStatus().then((result) => {
        console.log("result", result);
      });
      // const AsyncStorage_isAuth = await AsyncStorage.getItem("isAuth")
      //   .then((value) => {
      //     if (value !== "wolfkey") {
      //       return setIsAuth(false);
      //     } else {
      //       return setIsAuth(true);
      //     }
      //   })
      const response = await axios
        .post(
          "http://192.168.0.103:5000/api/Signage/NativeTV/checkAuthorization",
          { UID: androidId}
        )
        .then((result) => {
          const FetchedUrl = result.data.msg.MediaInfo.MediaUrl[0];
          CacheMedia_copy(FetchedUrl, setProgress,(uri)=>setState({wholeResult:uri}));
           
          // setState({ wholeResult: result.data.msg.MediaInfo.MediaUrl[0] });
          return result;
        })
        .then(async () => await AsyncStorage.getItem("isAuth"))
        .then((value) => {
          if (value !== "wolfkey") {
            return setIsAuth(false);
          } else {
            return setIsAuth(true);
          }
        })
        .finally(() => {
          setTypeofMedia("VideoPlayer");
          setIsLoaded(true);
          return 0;
        })
        .catch((error) => console.log("error ", error))
    };
    APP();
  }, [0]);

  // console.log("status ", isAuthenticated);
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
      {isLoaded && progress===1 && state!=={} ? (
        <Stack.Navigator
        screenOptions={{
          transitionSpec: { open: config },
        }}
        // initialRouteName={"ErrorPage"}
        initialRouteName={!isAuth ? "QrCodePage" : TypeofMedia}
        >
          {console.log("state",state)}
          <Stack.Screen
            name="ImagePlayer"
            component={ImagePlayer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QrCodePage"
            component={QrCodePage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VideoPlayer"
            // component={VideoPlayer}
            options={{ headerShown: false }}
          >
            {(props) => <VideoPlayer {...state} />}
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
        <Text style={styles.textLoading}>
          {/* <Icon style={styles.icon} name="pause" size={100} color="#fff" /> */}
          <Progress.Circle borderWidth={0} showsText color="white" progress={progress} size={100} />
        </Text>
      )}
    </NavigationContainer>
  );
};

export default Routers;

const styles = StyleSheet.create({
  textLoading: {
    fontSize: 30,
    color: "white",
    flex: 1,
    backgroundColor: "#F0BD30",
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "column",
    // marginTop:Dimensions.get("window").height/2
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
