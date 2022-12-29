import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Dimensions,Animated} from 'react-native';
import CustomComponent from './src/screens/CustomComponent';
import VideoPlayer from './src/plugins/videoPlayer';
import QrCodePage from './src/screens/QrCodePage';

export default function App() {
 
  return (
    <View style={styles.container}> 
    

    {/* <QrCodePage /> */}
  {/*  */}
    {/* <Text style={{color: '#fff', fontSize: 30}}>Hello World</Text> */}
    <VideoPlayer />
  </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0BD30",

    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

  },
});