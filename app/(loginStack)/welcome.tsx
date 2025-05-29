import { View, Text, Image, Platform } from "react-native";
import React, { useEffect } from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import ParallaxScrollView from "@/shared/components/ParallaxScrollView";
import Btn from "@/shared/components/Btn";
import { useRouter } from "expo-router";
import WelcomeWeb from "@/shared/components/WelcomeWeb";

const welcome = () => {
  const router = useRouter();
  const [isWeb, setIsWeb] = React.useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      setIsWeb(true);
    }
  }, []);
  if (isWeb) {
    return (
      <ViewContainer bottomProp={true}>
        <WelcomeWeb />
      </ViewContainer>
    );
  } else {
    return (
      <ViewContainer bottomProp={true}>
        <ParallaxScrollView
          headerImage={
            <View className="w-full h-full">
              <Image
                className="w-full h-full"
                source={require("@/assets/images/logotipo.jpeg")}
              />
            </View>
          }
          headerBackgroundColor={{ dark: "#000", light: "#fff" }}
        >
          <View className="flex-1 w-full h-full p-0 gap-10">
            <Text className="text-bold text-xl">
              Inicia sesión con tu cuenta para ingresar con tu perfil de usuario
              registrado
            </Text>
            <View className="w-full flex items-center justify-center">
              <View className="w-full mb-5 h-auto flex items-center justify-center">
                <Btn
                  title="Iniciar sesión"
                  onPress={() => router.push("/login")}
                  type="login"
                />
              </View>
              <View className="w-full h-auto flex items-center justify-center mb-8">
                <Btn
                  title="Registrarse"
                  onPress={() => router.push("/register")}
                  type="login"
                />
              </View>
              <Text className="text-center text-lg font-bold text-blue-500 mt-8 mb-8">
                - o inicia sesión con Facebook -
              </Text>
              <View className="w-full h-auto flex items-center justify-center">
                <Btn
                  title="Iniciar sesión con Facebook"
                  onPress={() => {}}
                  type="facebook"
                />
              </View>
            </View>
          </View>
        </ParallaxScrollView>
      </ViewContainer>
    );
  }
};

export default welcome;
