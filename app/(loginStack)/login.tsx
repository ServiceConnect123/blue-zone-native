import { View, Text, ScrollView, TextInput, Switch, Image } from "react-native";
import React, { useState } from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import Header from "@/shared/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Btn from "@/shared/components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuth } from "@/shared/context/Auth";
import useLoginServices from "@/shared/hooks/loginServices";
import ParallaxScrollView from "@/shared/components/ParallaxScrollView";

const login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    getFormValues,
    logFormSubmission,
    retrieveUserFromStorage,
    handleNoUserRegistered,
    areCredentialsValid,
    handleInvalidCredentials,
    handleSuccessfulLogin,
  } = useLoginServices();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      savePassword: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const labelStyleForm = "text-lg text-start w-full font-bold";
  const inputStyleForm =
    "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl";
  const iconStyleForm = "absolute right-3 top-1/2 -translate-y-1/2";
  const errorStyle = "text-red-500 text-start w-full";

  const validForm = () => {
    const data = getValues();
    const validData = Object.values(data).every((value) => value !== "");
    return validData;
  };

  const onSubmit = async () => {
    if (!validForm()) {
      return;
    }

    const formValues = getFormValues(getValues());
    logFormSubmission(formValues);

    const user = await retrieveUserFromStorage(AsyncStorage);
    if (!user) {
      handleNoUserRegistered();
      return;
    }

    if (!areCredentialsValid(user, formValues)) {
      handleInvalidCredentials();
      return;
    }

    await handleSuccessfulLogin(login, router);
  };

  return (
    <ViewContainer bottomProp={true}>
      <Header text="Iniciar sesión" />
      <ParallaxScrollView headerImage={<Image source={require("@/assets/images/logotipo.jpeg")} />} headerBackgroundColor={{ dark: "#000", light: "#fff" }}>
        <ScrollView className="w-full h-full">
          <Text className="text-2xl font-bold text-center mt-2 mb-5">
            Parqueo rápido y seguro
          </Text>

          {/* Icono de usuario */}
          <View className="flex flex-row items-center justify-center h-36 w-full">
            <FontAwesome name="user" size={120} color="black" />
          </View>

          {/* Formulario */}
          <View className="flex items-center h-full w-full pb-24 p-3">
            <Controller
              control={control}
              rules={{ required: "Correo obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-full h-36 flex items-center justify-center mb-4">
                  <Text className={labelStyleForm}>Usuario</Text>
                  <TextInput
                    placeholder="Usuario"
                    className={inputStyleForm}
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
                <View className="w-full h-16 flex items-center justify-center">
                  <Text className={labelStyleForm}>Contraseña</Text>
                  <TextInput
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    className={inputStyleForm}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View className={iconStyleForm}>
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
                <View className="w-full h-36 flex flex-row items-center justify-start mb-4">
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    className="w-12 h-16 mr-5"
                  />
                  <Text className="text-lg text-slate-700">
                    Recordar contraseña
                  </Text>
                  {errors.savePassword && (
                    <Text className="text-red-500">
                      {errors.savePassword.message}
                    </Text>
                  )}
                </View>
              )}
              name="savePassword"
            />
            <Btn
              title="Ingresar"
              onPress={handleSubmit(onSubmit)}
              type="login"
            />
          </View>
        </ScrollView>
      </ParallaxScrollView>
    </ViewContainer>
  );
};

export default login;
