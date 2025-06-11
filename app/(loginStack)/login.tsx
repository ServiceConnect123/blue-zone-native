import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Platform,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import Header from "@/shared/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import Btn from "@/shared/components/Btn";
import useLogin from "@/shared/hooks/useLogin";
import LoadScreen from "@/shared/components/LoadScreen";

const login = () => {
  const {
    control,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    handleSubmit,
    isWeb,
    isLoading,
  } = useLogin();

  const labelStyleForm = "text-lg text-start w-full font-bold text-black";
  const inputStyleForm =
    "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl text-black";
  const iconStyleForm = "absolute right-3 top-1/2 -translate-y-1/2";
  const errorStyle = "text-red-500 text-start w-full";

  if(isLoading){
    return <LoadScreen />
  }else{
    return (
      <ViewContainer bottomProp={true} topProp={true}>
        <Header text="Iniciar sesión" />
        <View
          className={isWeb ? "" : "flex-1 w-full h-full p-2 gap-10"}
          style={isWeb ? styles.containerWeb : {}}
        >
          <ScrollView
            style={isWeb ? styles.containerScrollView : {}}
            className={isWeb ? "" : "w-full h-full"}
          >
            <Text
              className={isWeb ? "" : "text-2xl font-bold text-center mt-2 mb-5"}
              style={isWeb ? styles.titleWeb : {}}
            >
              Parqueo rápido y seguro
            </Text>
  
            {/* Icono de usuario */}
            <View
              className="flex flex-row items-center justify-center h-36 w-full"
              style={isWeb ? styles.containerIconWeb : {}}
            >
              <FontAwesome name="user" size={120} color="black" />
            </View>
  
            {/* Formulario */}
            <View
              className={isWeb ? "" : "flex h-full w-full pb-24 p-3"}
              style={isWeb ? styles.containerFormWeb : {}}
            >
              <Controller
                control={control}
                rules={{ required: "Correo obligatorio" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={
                      isWeb
                        ? ""
                        : "w-full h-36 flex items-center justify-center mb-4"
                    }
                    style={isWeb ? styles.containerInputWeb : {}}
                  >
                    <Text
                      style={isWeb ? styles.labelWeb : {}}
                      className={isWeb ? "" : labelStyleForm}
                    >
                      Usuario
                    </Text>
                    <TextInput
                      placeholder="Usuario"
                      className={isWeb ? "" : inputStyleForm}
                      style={isWeb ? styles.inputWeb : {}}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.email && (
                      <Text className={errorStyle}>{errors.email.message}</Text>
                    )}
                  </View>
                )}
                name="email"
              />
  
              {/* Contraseña */}
              <Controller
                control={control}
                rules={{ required: "Contraseña obligatoria" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={
                      isWeb ? "" : "w-full h-16 flex items-center justify-center"
                    }
                    style={isWeb ? styles.containerInputWeb : {}}
                  >
                    <Text
                      style={isWeb ? styles.labelWeb : {}}
                      className={isWeb ? "" : labelStyleForm}
                    >
                      Contraseña
                    </Text>
                    <TextInput
                      placeholder="Contraseña"
                      secureTextEntry={!showPassword}
                      style={isWeb ? styles.inputWeb : {}}
                      className={isWeb ? "" : inputStyleForm}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <View
                      className={iconStyleForm}
                      style={isWeb ? styles.iconWeb : {}}
                    >
                      <FontAwesome
                        name={showPassword ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                        onPress={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    </View>
                    {errors.password && (
                      <Text className={errorStyle}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
                name="password"
              />
  
              {/* Recordar contraseña */}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={
                      isWeb
                        ? ""
                        : "w-full h-36 flex flex-row items-center justify-start mb-4"
                    }
                    style={isWeb ? styles.containerInputCheck : {}}
                  >
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      className="w-12 h-16 mr-5 text-slate-700"
                    />
                    <Text
                      className={isWeb ? "" : "text-lg text-slate-700"}
                      style={isWeb ? styles.labelWeb : {}}
                    >
                      Recordar contraseña
                    </Text>
                    {errors.savePassword && (
                      <Text
                        className={isWeb ? "" : "text-red-500"}
                        style={isWeb ? styles.errorWeb : {}}
                      >
                        {errors.savePassword.message}
                      </Text>
                    )}
                  </View>
                )}
                name="savePassword"
              />
              <View
                className={
                  isWeb ? "" : "w-full h-auto flex items-center justify-center"
                }
                style={isWeb ? styles.containerBtnWeb : {}}
              >
                <Btn
                  title="Ingresar"
                  onPress={handleSubmit(onSubmit)}
                  type="login"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ViewContainer>
    );
  }

};

export default login;

const styles = StyleSheet.create({
  containerWeb: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    borderRadius: 20,
    backgroundColor: "white",
    height: "auto",
    minHeight: 500,
    padding: 20,
  },
  containerScrollView: {
    width: "100%",
    height: "100%",
  },
  titleWeb: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerIconWeb: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFormWeb: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInputWeb: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  labelWeb: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  inputWeb: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  iconWeb: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 35,
  },
  errorWeb: {
    fontSize: 12,
    color: "red",
    textAlign: "left",
    width: "100%",
  },
  containerBtnWeb: {
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  containerInputCheck: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
  },
});
