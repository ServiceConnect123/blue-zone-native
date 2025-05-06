import { View, Text, ScrollView, TextInput, Switch } from "react-native";
import React from "react";
import ViewContainer from "@/components/ViewContainer";
import Header from "@/components/Header";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Btn from "@/components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/Auth";

const login = () => {
  const { login } = useAuth();
  const router = useRouter();
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

  const labelStyleForm = "text-lg text-start w-full font-bold";
  const inputStyleForm =
    "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl";

  const validForm = ()=>{
    const data = getValues();
    const validData = Object.values(data).every((value) => value !== "");
    return validData;
  }  

  const onSubmit = async () => {
    if (!validForm()) return;
    console.log(getValues());
    const user = (await AsyncStorage.getItem("user")) || "";
    if(user === ""){
      console.log("No hay usuario registrado");
      return;
    }
    const userData = JSON.parse(user as string);
    console.log(userData);
    if (userData.email !== getValues().email || userData.password !== getValues().password) {
      console.log("Credenciales incorrectas");
      return;
    } else {
      console.log("Credenciales correctas");
      login();
      router.replace('/(tabs)');
    }
  };

  return (
    <ViewContainer bottomProp={true}>
      <Header text="Iniciar sesión" />
      <View className="flex-1 w-full h-full p-2 gap-10">
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
                    <Text className="text-red-500">{errors.email.message}</Text>
                  )}
                </View>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{ required: "Contraseña obligatoria" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="w-full h-16 flex items-center justify-center">
                  <Text className={labelStyleForm}>Contraseña</Text>
                  <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    className={inputStyleForm}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.password && (
                    <Text className="text-red-500">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
              name="password"
            />
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
      </View>
    </ViewContainer>
  );
};

export default login;
