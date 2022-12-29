import { StyleSheet, Text, View,Animated } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import React from 'react'
import * as Application from 'expo-application';
// import DeviceInfo from 'react-native-device-info';

const QrCodePage = () => {
    const animatedValue = new Animated.Value(0);
    // create a sample animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();

  return (
    <View style={{transform: [{ rotate: '90deg' }],alignItems:'center'}}>
        <Animated.View style={{
      opacity: animatedValue,
      transform: [{
        scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
            })
      }]
    }}>
     <QRCode size={300} style={styles.container} value="https://www.youtube.com/watch?v=1Q8fG0TtVAY" />
    </Animated.View>
     <Text style={{color:'#fff',textAlign:'center',fontSize:20}}>Scan the QR from your Registered Device or enter this code {Application.androidId}</Text>
     {/* <Text style={{color:'#fff',textAlign:'center',fontSize:20}}>Scan the QR from your Registered Device</Text> */}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff28",
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 40,
     

    },  
    
})

export default QrCodePage