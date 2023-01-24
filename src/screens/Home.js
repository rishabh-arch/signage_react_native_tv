import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { cleanMemory } from "../plugins/CacheMedia_copy";
import * as Progress from "react-native-progress";

const Home = () => {
  const [progress, setProgress] = React.useState(0);
  return (
    <View style={styles.container}>
    <View style={styles.containerBox}>



      <Pressable
        onPressIn={() => {
          Updates.reloadAsync();
        }}
        style={styles.PressableBtn}
      >
        <Text style={styles.signup}>LOG-OUT!</Text>
      </Pressable>

      <Pressable
        onPressIn={() => {
          cleanMemory(()=>console.log("done"));
          var i =0.1;
         const j = setInterval(() => {
            setProgress(i);
            if (i == 100) {
              clearInterval(j);
              setProgress(0);
            }
            i+=0.1;
          }, 1000);
        }}
        disabled={progress !== 0}
        // disabled={progress !== "Clean memory"}
        style={styles.PressableBtn}
      >
        <Text style={styles.signup}>
        <Progress.Circle
              borderWidth={0}
              showsText
              
              // formatText={() => progress }
              color="black"
              progress={progress}
              size={200}
              />
        </Text>
        <Text style={styles.signup}
         >
              Clean Memory
        </Text>
      </Pressable>



    </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "#F0BD30",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "column",
    // flexWrap: "wrap",
    // borderWidth: 10,
    // borderColor: "white",
  },
  containerBox: {
    flex: 1,
    backgroundColor: "#F0BD30",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "column",
    flexWrap: "wrap",
    // borderWidth: 10,
    // borderColor: "white",
    
  },
  PressableBtn: {
    margin: 10,
    backgroundColor: "white",
    backgroundColor: "white",
    color: "#F0BD30",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    fontSize: 27,
alignItems:"center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: "15%",
    marginTop: "10%",
  },
  text: {
    color: "white",
    marginTop: "-25%",
    marginLeft: "20%",
  },
  signup: {
    backgroundColor: "white",
    color: "#F0BD30",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    //   marginLeft: '11%',
    padding: "2%",
    fontSize: 27,
alignItems:"center",
// textAlign:"center",    
    //   marginTop: '70%'
  },
  login: {
    backgroundColor: "#3A59FF",
    color: "white",
    width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "11%",
    padding: "2%",
    fontSize: 27,
    marginTop: "10%",
  },
});
