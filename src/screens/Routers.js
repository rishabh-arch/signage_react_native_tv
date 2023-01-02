import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import VideoPlayer from "../plugins/videoPlayer";
import ImagePlayer from "../plugins/ImagePlayer";
import QrCodePage from "../screens/QrCodePage";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome";

import {
  createNativeStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import Home from "./Home";
import ErrorPage from './ErrorPage';
import { AuthContext } from "../components/context/AuthContext";
import * as Progress from "react-native-progress";

const Routers =  () => {

  const { isAuthenticated,isLoaded2 } = React.useContext(AuthContext);
  const [TypeofMedia,setTypeofMedia] = React.useState("whoARE TYOU");
  const [lol,setlol] = React.useState({hello:"hello"});
  const [isLoaded,setIsLoaded] = React.useState(false);
  const [isAuth,setIsAuth] = React.useState(false);
  
  useEffect(()=>{
    const getValue = async () => {
    setIsLoaded(false);
         const value = await AsyncStorage.getItem("isAuth").then((value)=>{
           console.log("---------- value------------- ", value);
             if(value !== "010102"){
             console.log("value prev ", value);
             setIsAuth(false);
           }
             else{
           console.log("value new ", value);
           setIsAuth(true);
           }
         }).finally(()=>{
          setTypeofMedia("VideoPlayer")
          setlol({hello:"hello243"})
         setIsLoaded(true);
          })
          }
          getValue();
        },[0])
          
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
{isLoaded?
    <Stack.Navigator
      screenOptions={{
        transitionSpec: { open: config },
      }}

      initialRouteName={"ErrorPage"}
      // initialRouteName={!isAuth ? "QrCodePage" : TypeofMedia}
    >
      
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
        component={VideoPlayer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ErrorPage"
        // component={ErrorPage}
        options={{ headerShown: false }}
>
        {props => <ErrorPage {...lol} />}

</Stack.Screen>
    </Stack.Navigator>

:<Text style={styles.textLoading}>
   <Icon style={styles.icon} name="pause" size={100} color="#fff" />
   <Text>
   OADING...
   </Text>
 </Text>}
  </NavigationContainer>
  )
}

export default Routers

const styles = StyleSheet.create({
  textLoading:{
    fontSize:30,
    color:"white",
    flex:1,
    backgroundColor:"#F0BD30",
    textAlign:"center",
    textAlignVertical:"center",
    flexDirection:"column",
    // marginTop:Dimensions.get("window").height/2
  },
  icon:{
    fontSize:30,
    color:"white",
    // flex:1,
    backgroundColor:"#F0BD30",
    textAlign:"center",
    textAlignVertical:"center",
    // marginTop:Dimensions.get("window").height/2
  }
})