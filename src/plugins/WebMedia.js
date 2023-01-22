import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { WebView } from "react-native-webview";
import YoutubeIframe from "react-native-youtube-iframe";
import * as Linking from "expo-linking";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import * as IntentLauncher from "expo-intent-launcher";
import * as ScreenOrientation from "expo-screen-orientation";

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}
async function changeScreenOrientation2() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );
}

const intentFunction = [
  () => startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS), //1
  () => startActivityAsync(ActivityAction.APP_NOTIFICATION_REDACTION), //2
  () => startActivityAsync(ActivityAction.CONDITION_PROVIDER_SETTINGS), //3
  () => startActivityAsync(ActivityAction.NOTIFICATION_LISTENER_SETTINGS), //4
  () => startActivityAsync(ActivityAction.PRINT_SETTINGS), //5
  () => startActivityAsync(ActivityAction.ADD_ACCOUNT_SETTINGS), //6
  () => startActivityAsync(ActivityAction.AIRPLANE_MODE_SETTINGS), //7
  () => startActivityAsync(ActivityAction.APN_SETTINGS), //8
  () => startActivityAsync(ActivityAction.APP_OPS_SETTINGS), //9
  () => startActivityAsync(ActivityAction.APPLICATION_DETAILS_SETTINGS), //10
  () => startActivityAsync(ActivityAction.APPLICATION_DEVELOPMENT_SETTINGS), //11
  () => startActivityAsync(ActivityAction.APPLICATION_SETTINGS), //12
  () => startActivityAsync(ActivityAction.BATTERY_SAVER_SETTINGS), //13
  () => startActivityAsync(ActivityAction.BLUETOOTH_SETTINGS), //14
  () => startActivityAsync(ActivityAction.CAPTIONING_SETTINGS), //15
  () => startActivityAsync(ActivityAction.CAST_SETTINGS), //16
  () => startActivityAsync(ActivityAction.DATA_ROAMING_SETTINGS), //17
  () => startActivityAsync(ActivityAction.DATE_SETTINGS), //18
  () => startActivityAsync(ActivityAction.DEVICE_INFO_SETTINGS), //19
  () => startActivityAsync(ActivityAction.DISPLAY_SETTINGS), //20
  () => startActivityAsync(ActivityAction.HARD_KEYBOARD_SETTINGS), //21
  () => startActivityAsync(ActivityAction.HOME_SETTINGS), //22
  () => startActivityAsync(ActivityAction.IGNORE_BATTERY_OPTIMIZATION_SETTINGS), //23
  () => startActivityAsync(ActivityAction.INPUT_METHOD_SETTINGS), //24
  () => startActivityAsync(ActivityAction.INPUT_METHOD_SUBTYPE_SETTINGS), //25
  () => startActivityAsync(ActivityAction.INTERNAL_STORAGE_SETTINGS), //26
  () => startActivityAsync(ActivityAction.LOCALE_SETTINGS), //27
  () => startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS), //28
  () => startActivityAsync(ActivityAction.MANAGE_ALL_APPLICATIONS_SETTINGS), //29
  () => startActivityAsync(ActivityAction.MANAGE_APPLICATIONS_SETTINGS), //30
  () => startActivityAsync(ActivityAction.MANAGE_DEFAULT_APPS_SETTINGS), //31
  () => startActivityAsync(ActivityAction.MANAGE_OVERLAY_PERMISSION), //32
  () => startActivityAsync(ActivityAction.MANAGE_UNKNOWN_APP_SOURCES), //33
  () => startActivityAsync(ActivityAction.MANAGE_WRITE_SETTINGS), //34
  () => startActivityAsync(ActivityAction.MEMORY_CARD_SETTINGS), //35
  () => startActivityAsync(ActivityAction.NETWORK_OPERATOR_SETTINGS), //36
  () => startActivityAsync(ActivityAction.NFCSHARING_SETTINGS), //37
  () => startActivityAsync(ActivityAction.NFC_PAYMENT_SETTINGS), //38
  () => startActivityAsync(ActivityAction.NFC_SETTINGS), //39
  () => startActivityAsync(ActivityAction.PRIVACY_SETTINGS), //40
  () => startActivityAsync(ActivityAction.QUICK_LAUNCH_SETTINGS), //41
  () => startActivityAsync(ActivityAction.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS), //42
  () => startActivityAsync(ActivityAction.REQUEST_SET_AUTOFILL_SERVICE), //43
  () => startActivityAsync(ActivityAction.REQUEST_SET_WALLPAPER), //44
  () => startActivityAsync(ActivityAction.SECURITY_SETTINGS), //45
  () => startActivityAsync(ActivityAction.SHOW_REGULATORY_INFO), //46
  () => startActivityAsync(ActivityAction.SOUND_SETTINGS), //47
  () => startActivityAsync(ActivityAction.SYNC_SETTINGS), //48
  () => startActivityAsync(ActivityAction.USAGE_ACCESS_SETTINGS), //49
  () => startActivityAsync(ActivityAction.USER_DICTIONARY_INSERT), //50
  () => startActivityAsync(ActivityAction.USER_DICTIONARY_SETTINGS), //51
  () => startActivityAsync(ActivityAction.VOICE_CONTROL_AIRPLANE_MODE), //52
  () => startActivityAsync(ActivityAction.VOICE_CONTROL_BATTERY_SAVER_MODE), //53
  () => startActivityAsync(ActivityAction.VOICE_CONTROL_DO_NOT_DISTURB_MODE), //54
  () => startActivityAsync(ActivityAction.VOICE_INPUT_SETTINGS), //55
  () => startActivityAsync(ActivityAction.VOICE_INTERACTION_SETTINGS), //56
  () => startActivityAsync(ActivityAction.VOICE_OUTPUT_SETTINGS), //57
  () => startActivityAsync(ActivityAction.VPN_SETTINGS), //58
  () => startActivityAsync(ActivityAction.VR_LISTENER_SETTINGS), //59
  () => startActivityAsync(ActivityAction.WEBVIEW_SETTINGS), //60
  () => startActivityAsync(ActivityAction.WIFI_IP_SETTINGS), //61
  () => startActivityAsync(ActivityAction.WIFI_SETTINGS), //62
  () => startActivityAsync(ActivityAction.WIRELESS_SETTINGS), //63
  () => startActivityAsync(ActivityAction.ZEN_MODE_AUTOMATION_SETTINGS), //64
  () => startActivityAsync(ActivityAction.ZEN_MODE_EVENT_RULE_SETTINGS), //65
  () => startActivityAsync(ActivityAction.ZEN_MODE_EXTERNAL_RULE_SETTINGS), //66
  () => startActivityAsync(ActivityAction.ZEN_MODE_PRIORITY_SETTINGS), //67
  () => startActivityAsync(ActivityAction.ZEN_MODE_SCHEDULE_RULE_SETTINGS), //68
  () => startActivityAsync(ActivityAction.ZEN_MODE_SETTINGS), //69
];
const WebMedia = ({ wholeResult }) => {
  const vw = 50;
  const vid1 = wholeResult[0];
  const vid2 = wholeResult[1];
const vid = wholeResult;
  return (
    <>
      {console.log(wholeResult[0])}
      {/* <View style={styles.container}>
        {intentFunction.map((item, index) => (
          <TouchableOpacity
            // disabled={true}
            // disabled={true}
            key={index + 1}
            style={styles.GridButton}
            onPress={item}
          >
            <Text>{index + 1}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          // disabled={true}
          // disabled={true}
          style={styles.GridButton}
          onPress={changeScreenOrientation2}
        >
          <Text>Landscape</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={true}
          // disabled={true}
          style={styles.GridButton}
          onPress={changeScreenOrientation}
        >
          <Text>Portrait</Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity
        // disabled={true}
        // disabled={true}
        style={styles.TouchableOpacity}
        onPress={changeScreenOrientation}
      >
      </TouchableOpacity> */}
      {/* <WebView
        style={styles.container}

      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{ uri: 'https://www.youtube.com/results?search_query=expo+slider' }}
      width={Dimensions.get('window').width}
      
        /> */}
      {/* <TouchableOpacity
        onPress={async ()=>{
          // IntentLauncher.startActivityAsync(ActivityAction.MAIN, {
          //   packageName: 'com.android.tv.settings',
          // });
          // await ScreenOrientation.getOrientationAsync()
          // .then((orientation) => {
          //   console.log(orientation);
          // })
          changeScreenOrientation();
          // startActivityAsync(
          //   "android.intent.action.MAIN",
          //   {
          //     packageName: 'com.android.settings',
          //     // packageName: 'com.android.contacts',
          //     // className: 'com.android.tv.settings.MainSettings',
          //   }
          // )
          // startActivityAsync("com.android.tv.settings");
          // Linking.openURL('com.android.tv.settings');
        }
        }
        style={styles.container}
        >
          <Text>Click ME</Text>
        </TouchableOpacity> */}
      <WebView
         style={styles.container}
         originWhitelist={["*"]}
         allowFileAccess={true}
         allowUniversalAccessFromFileURLs={true}
         allowFileAccessFromFileURLs={true}
         javaScriptEnabled={true}
         domStorageEnabled={true}
         allowsFullscreenVideo={true}
         mixedContentMode='always'
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
            }
            video {
              width: 100vw;
              height: 100vh;
              object-fit: cover;
            }
          </style>
        </head>
        
        <body>
          <video id="myVideo" autoplay muted></video>
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
            // var i = 0;
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
              // if (j == videoCount - 1) {
              // j = 0;
              videoPlay(incr());
              // } else {
              //   videoPlay(j);
              // }
            }
          </script>
        </body>
      </html>
      `,
        }}
      />
    </>
  );
};

export default WebMedia;

const styles = StyleSheet.create({
  TouchableOpacity: {
    alignItems: "center",
    width: 900,
    height: 900,
    position: "absolute",
    borderWidth: 3,
    borderColor: "red",
    zIndex: 1,
  },
  container: {
    flex: 1,
    border: "1px solid red",
    flexWrap: "wrap",
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    // height: Dimensions.get('window').height,
    width: Dimensions.get("window").width,

    borderWidth: 3,
    borderColor: "blue",
    position: "relative",
  },
  // container: {
  //     flex: 1,
  //     border: '1px solid red',
  //     // backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     width: Dimensions.get('window').width,
  //     height: Dimensions.get('window').height,
  //     borderWidth:  3,
  //     borderColor: 'blue',
  //     position: 'relative',

  // },
  GridButton: {
    alignItems: "center",
    width: 60,
    // padding: 10,
    backgroundColor: "#DDDDDD",
    margin: 10,
    borderWidth: 3,
    borderColor: "red",
  },
});
