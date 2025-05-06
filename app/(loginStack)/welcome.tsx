import { View, Text, Image } from "react-native";
import React from "react";
import ViewContainer from "@/components/ViewContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Btn from "@/components/Btn";

const welcome = () => {
  return (
    <ViewContainer bottomProp={true}>
      <ParallaxScrollView
        headerImage={
          <Image className="w-full h-full" source={require("@/assets/images/logotipo.jpeg")} />
        }
        headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      >
        <View className="flex-1 w-full h-full p-2 gap-10">
          <Text className="text-bold text-xl">
            Inicia sesión con tu cuenta para ingresar con tu perfil de usuario
            registrado
          </Text>
          <View className="p-2 w-full flex gap-5 items-center justify-center">
            <Btn title="Iniciar sesión" onPress={() => {}} type="login" />
            <Btn title="Registrarse" onPress={() => {}} type="login" />
            <Btn title="¿Olvidaste tu contraseña?" onPress={() => {}} type="link" />
          </View>
        </View>
      </ParallaxScrollView>
    </ViewContainer>
  );
};

export default welcome;
