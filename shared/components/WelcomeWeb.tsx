import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Btn from "./Btn";
import { useRouter } from "expo-router";
import ParallaxScrollView from "./ParallaxScrollView";

const WelcomeWeb = () => {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerImage={
        <View className="w-full h-full">
          <Image
            style={{ objectFit: "cover", width: "100%" }}
            source={require("@/assets/images/logotipo.jpeg")}
          />
        </View>
      }
      headerBackgroundColor={{ dark: "#000", light: "#fff" }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Inicia sesión con tu cuenta para ingresar con tu perfil de usuario
            registrado
          </Text>
          <View style={styles.listButtoms}>
            <View style={styles.containerButtoms}>
              <Btn
                title="Iniciar sesión"
                onPress={() => router.push("/login")}
                type="login"
              />
            </View>
            <View style={styles.containerButtoms}>
              <Btn
                title="Registrarse"
                onPress={() => router.push("/register")}
                type="login"
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "blue",
              }}
            >
              - o inicia sesión con Facebook -
            </Text>
            <View style={styles.containerButtoms}>
              <Btn
                title="Iniciar sesión con Facebook"
                onPress={() => {}}
                type="facebook"
              />
            </View>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
};

export default WelcomeWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500,
    gap: 20,
    borderRadius: 20,
    backgroundColor: "white",
    height: "50%",
    minHeight: 500,
    padding: 20,
    paddingTop:10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  listButtoms: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
    maxWidth: 600,
  },
  containerButtoms: {
    width: "100%",
    marginBottom: 10,
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
