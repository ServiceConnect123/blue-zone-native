import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export const ReactApp = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://reactnativewebviewtest.netlify.app/" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
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
