import Btn from '@/shared/components/Btn';
import { useAuth } from '@/shared/context/Auth';
import { useRef } from 'react';

import { Text, View } from 'react-native';

export default function TabOneScreen() {
  const webviewRef = useRef(null);
  const {logout} = useAuth();
  return (
    <View className='flex-1 w-full h-full'>
      <Btn title="Cerrar sesión" onPress={() => logout()} type="login"/>
      <Text>logout</Text>
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
