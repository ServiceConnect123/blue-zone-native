import { View, Text } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { StyleSheet } from 'react-native';

const CardPrices = () => {
    const webViewRef = useRef(null);
    const styles = StyleSheet.create({
        webview: {
            flex: 1,
            width: "100%",
            height: "100%",
        },
    });
    const handleWebViewMessage = (event: WebViewMessageEvent) => {
        console.log("Mensaje de WebView:", event.nativeEvent.data);
    };
    
  return (
    <View className='flex-1 w-full h-full'>
      <WebView
        ref={webViewRef}
        source={require("./index.html")}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
        onMessage={(event: WebViewMessageEvent) => handleWebViewMessage(event)}
        injectedJavaScript={`
          // Polyfill para desarrollo en navegador
          if (!window.ReactNativeWebView) {
            window.ReactNativeWebView = {
              postMessage: (message) => {
                console.log("Mensaje para RN:", message);
                window.postMessage(message, "*");
              }
            };
          }
          true;
        `}
      />
    </View>
  )
}

export default CardPrices