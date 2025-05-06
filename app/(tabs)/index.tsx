import { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default function TabOneScreen() {
  const webviewRef = useRef(null);
  return (
    <View style={styles.container}>
      {/*<WebView
        ref={webviewRef}
        source={require("../modules/reactHome/index.html")}
        className='w-full h-full'
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
