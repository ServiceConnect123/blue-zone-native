import { useAuth } from "@/shared/context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replace } from "expo-router/build/global-state/routing";
import React, { useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export const ReactApp = () => {
  const webViewRef = useRef<WebView>(null);
  const { logout } = useAuth();
  const admin: string = "https://front-admin-zonas-azules.netlify.app/";

  const token = AsyncStorage.getItem("user");
  const onWebViewLoad = () => {
    webViewRef.current?.postMessage(
      JSON.stringify({ type: "SET_TOKEN", token })
    );
  };

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.type === "LOGOUT") {
        logout();
        replace("/(loginStack)/login");
      }
      if (messageData.type === "RECIVE_TOKEN") {
        Alert.alert("Token recibido", messageData.token);
      }
    } catch (error) {
      console.error("Error al procesar mensaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: admin }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
        onMessage={handleWebViewMessage}
        onLoadEnd={onWebViewLoad}
        userAgent="Zonas-Azules"
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
