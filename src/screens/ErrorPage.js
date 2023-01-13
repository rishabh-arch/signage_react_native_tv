import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Pressable,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

const ErrorPage = () => {
  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => {

          alert("Restart the app to login again");
        }}
      >
        <Text style={styles.signup}>
          <Icon name="exclamation-triangle" size={100} color="#fff" />
        </Text>
        <Text style={styles.signup}>
            Oops! May be Our server is can't able to fetch your Device. Please try again later. 
            </Text>
      </Pressable>
    </View>
  );
};

export default ErrorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B00404",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "column",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
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
    // height: Dimensions.get("window").height,
    // width: Dimensions.get("window").width,

    color: "#fff",
    // width: "75%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    // flex:1,
    flexWrap: "wrap",
    // wordWrap: "break-word",
    //   marginLeft: '11%',
    padding: "2%",
    fontSize: Dimensions.get("window").width / 40,
    // width: 410,
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
