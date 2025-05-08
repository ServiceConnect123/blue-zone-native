import React, { useRef } from "react";
import { StyleSheet, Alert, Text } from "react-native";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export const Quemada = () => {
  const webViewRef = useRef<WebView>(null);

  // Manejador de mensajes desde el WebView
  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      console.log("handleWebViewMessage", messageData);
      // Verificar el tipo de mensaje
      if (messageData.type === "BUTTON_PRESSED") {
        const currentCount = messageData.count;

        // Mostrar alerta con el conteo
        Alert.alert(
          "Mensaje desde WebView",
          `El contador está en: ${currentCount}`,
          [{ text: "OK" }]
        );

        // Opcional: Enviar respuesta al WebView
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "ACKNOWLEDGE",
            message: `Recibido contador: ${currentCount}`,
          })
        );
      }
    } catch (error) {
      console.error("Error al procesar mensaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={require("../index.html")}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        startInLoadingState={true}
        onMessage={handleWebViewMessage}
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
