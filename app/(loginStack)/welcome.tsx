import { View, Text, Image } from "react-native";
import React from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import ParallaxScrollView from "@/shared/components/ParallaxScrollView";
import Btn from "@/shared/components/Btn";
import { useRouter } from "expo-router";

const welcome = () => {
  const router = useRouter();
  return (
    <ViewContainer bottomProp={true}>
      <ParallaxScrollView
        headerImage={
          <View className="w-full h-full">
            <Image className="w-full h-full" source={require("@/assets/images/logotipo.jpeg")}/>
          </View>
        }
        headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      >
        <View className="flex-1 w-full h-full p-2 gap-10">
          <Text className="text-bold text-xl">
            Inicia sesión con tu cuenta para ingresar con tu perfil de usuario
            registrado
          </Text>
          <View className="p-2 w-full flex gap-5 items-center justify-center mb-64">
            <Btn title="Iniciar sesión" onPress={() => router.push("/login") } type="login" />
            <Btn title="Registrarse" onPress={() => router.push("/register")} type="login" />
            <Text className="text-center text-lg font-bold text-blue-500 my-4">
             - o inicia sesión con Facebook -
            </Text>
            <Btn title="Iniciar sesión con Facebook" onPress={() => {}} type="facebook" />
          </View>
        </View>
      </ParallaxScrollView>
    </ViewContainer>
  );
};

export default welcome;
