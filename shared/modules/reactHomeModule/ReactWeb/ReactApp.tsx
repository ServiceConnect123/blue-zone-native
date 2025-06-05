import { useAuth } from "@/shared/context/Auth";
import { replace } from "expo-router/build/global-state/routing";
import React, { useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export const ReactApp = () => {
  const webViewRef = useRef<WebView>(null);
  const {logout} = useAuth();
  const user:string = "https://front-user-zonas-azules.netlify.app/";
  const admin:string = "https://front-admin-zonas-azules.netlify.app/";

  // Manejador de mensajes desde el WebView
  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      console.log("handleWebViewMessage", messageData);
      
      //Manejo de logout
      if(messageData.type === "LOGOUT"){
        logout();
        replace("/(loginStack)/welcome");
      }
    } catch (error) {
      console.error("Error al procesar mensaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: user }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
