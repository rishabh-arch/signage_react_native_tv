import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { WebView } from "react-native-webview";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const WebHtml = ({ wholeResult, FetchedUrl }) => {
  const navigation = useNavigation();

  const [touch, setTouch] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const webviewRef = useRef(null);
  useEffect(() => {
    if (wholeResult !== undefined && FetchedUrl !== undefined) {
      FetchedUrl.touch=="false" ? setTouch(3) : setTouch(0);
      setLoaded(true);
    }
  }, [wholeResult, FetchedUrl]);
  return (
    <>
      {loaded && (
        <>
          <View
            style={{
              height: Dimensions.get("window").width,
              width: Dimensions.get("window").width,
              borderWidth: 3,
              borderColor: "blue",
              opacity: 0,
              zIndex: touch,
              backgroundColor: "blue",
              position: "absolute",
            }}
          ></View>
          <View
            style={
              FetchedUrl.Orientation == "Landscape"
                ? styles.ParentBoxLandscape
                : styles.ParentBoxPortrait
            }
          >
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onLongPress={() => {
                setTimeout(() => {
                  navigation.navigate("Home");
                }, 7000);
              }}
              onPress={() => {
                webviewRef.current.goBack();
                // navigation.navigate("Home");

              }}
            >
              <Ionicons
                name="arrow-back-circle"
                size={60}
                style={[
                  styles.BackButton,
                  FetchedUrl.Orientation == "Landscape"
                    ? styles.BackButtonLandscape
                    : styles.BackButtonPortrait,
                ]}
                color="black"
              />
            </TouchableOpacity>
            <WebView
              style={
                FetchedUrl.Orientation == "Landscape"
                  ? styles.WebViewContainerLandscape
                  : styles.WebViewContainerPortrait
              }
              javaScriptEnabled={true}
              // injectedJavaScript
              domStorageEnabled={true}
              onFileDownload={false}
              cacheEnabled
              source={{
                uri: "https://medium.com/uxness/best-ux-ui-inspiration-sites-platform-for-designers-7acecd203dca",
              }}
              onShouldStartLoadWithRequest={(request) => {
                if (request.url.includes("https")) {
                  alert("Prevent loading");
                } else return true;
              }}
              ref={webviewRef}
              pullToRefreshEnabled={true}
            />
          </View>
        </>
      )}
    </>
  );
};

export default WebHtml;

const styles = StyleSheet.create({
  TouchableOpacity: {
    alignItems: "center",
    width: 90,
    height: 90,
    position: "absolute",
    zIndex: 5,
    left: 0,
    top: 0,
  },
  BackButton: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    position: "absolute",
    zIndex: 5,
    color: "#ef9b1c",
  },
  BackButtonPortrait: {
    transform: [{ rotate: "180deg" }],
  },
  BackButtonLandscape: {
    transform: [{ rotate: "0deg" }],
  },
  WebViewContainerPortrait: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: Dimensions.get("window").height,
    transform: [{ rotate: "180deg" }],
  },
  WebViewContainerLandscape: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transform: [{ rotate: "0deg" }],
    width: Dimensions.get("window").width,
  },

  ParentBoxPortrait: {
    zIndex: 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    transform: [{ rotate: "90deg" }],
  },

  ParentBoxLandscape: {
    zIndex: 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    transform: [{ rotate: "0deg" }],
  },
});
