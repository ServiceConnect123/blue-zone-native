import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import Header from "@/shared/components/Header";
import Btn from "@/shared/components/Btn";
import { FontAwesome } from "@expo/vector-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import SelectDropDown from "@/shared/components/SelectDropDown";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Observar el valor de password para validar confirmPassword
  const password = useWatch({
    control,
    name: "password",
  });

  // Expresión regular para validar la contraseña completa
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

  // Expresiones regulares para validación individual
  const hasMinusAndMayus = (str: string) =>
    /[a-z]/.test(str) && /[A-Z]/.test(str);
  const hasNumber = (str: string) => /\d/.test(str);
  const hasSpecialChar = (str: string) => /[!@#$%^&*()]/.test(str);
  const hasMinLength = (str: string) => str.length >= 8;
  const containerStyleForm = "flex-1 w-full h-full p-2 items-center relative";
  const labelStyleForm = "text-lg text-start w-full font-bold mb-3";
  const inputStyleForm =
    "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl relative";
  const iconStyleForm = "absolute right-10 top-16 z-10";
  const errorStyle = "text-red-500 text-sm mt-1 w-full text-left";

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const changeIcon = (index: number) => {
    if (index === 1) {
      setShowPassword(!showPassword);
    } else if (index === 2) {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSubmit =  async  () => {
    console.log(getValues(), errors);
    await AsyncStorage.setItem("user", JSON.stringify(getValues()));
    console.log("user", getValues());
    router.push("/login");
  };

  return (
    <ViewContainer bottomProp={true}>
      <Header text="Registrarse" />
      <ScrollView className="w-full h-full">
        <View className="flex-1 w-full h-full p-2 items-center pt-4">
          <Controller
            rules={{ required: "Número de celular es obligatorio" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className={containerStyleForm}>
                <Text className={labelStyleForm}>Número de celular</Text>
                <View className="flex flex-row items-center w-full relative">
                  <View className="absolute left-2 top-2 z-10 border-r-2 border-gray-400">
                    <SelectDropDown data={countrysNumber} />
                  </View>
                  <TextInput
                    className={inputStyleForm + " pl-28"}
                    placeholder="Número de celular"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="phoneNumber"
            control={control}
          />

          <Controller
            rules={{
              required: "Correo electrónico es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className={containerStyleForm}>
                  <Text className={labelStyleForm}>Correo electrónico</Text>
                  <TextInput
                    className={inputStyleForm}
                    placeholder="Correo electrónico"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.email && (
                    <Text className={errorStyle}>{errors.email.message}</Text>
                  )}
                </View>
              );
            }}
            name="email"
            control={control}
          />

          <Controller
            rules={{
              required: "Contraseña es obligatoria",
              validate: (value) =>
                passwordRegex.test(value) ||
                "La contraseña no cumple con los requisitos",
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className={containerStyleForm}>
                  <Text className={labelStyleForm}>Contraseña</Text>
                  <TextInput
                    secureTextEntry={!showPassword}
                    className={inputStyleForm}
                    placeholder="Contraseña"
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
                        changeIcon(1);
                      }}
                    />
                  </View>
                  {errors.password && (
                    <Text className={errorStyle}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              );
            }}
            name="password"
            control={control}
          />

          <Controller
            rules={{
              required: "Confirmar contraseña es obligatoria",
              validate: (value) =>
                value === getValues("password") ||
                "Las contraseñas no coinciden",
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className={containerStyleForm}>
                  <Text className={labelStyleForm}>Confirmar contraseña</Text>
                  <TextInput
                    secureTextEntry={!showConfirmPassword}
                    className={inputStyleForm}
                    placeholder="Confirmar contraseña"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <View className={iconStyleForm}>
                    <FontAwesome
                      name={showConfirmPassword ? "eye" : "eye-slash"}
                      size={24}
                      color="black"
                      onPress={() => {
                        changeIcon(2);
                      }}
                    />
                  </View>
                  {errors.confirmPassword && (
                    <Text className={errorStyle}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              );
            }}
            name="confirmPassword"
            control={control}
          />

          <View className="flex flex-col gap-2 mt-2 mb-10">
            <Text>En la digitación de la contraseña, tenga en cuenta: </Text>
            <Text>
              {" "}
              {hasMinLength(password) ? "✅" : "❌"} Al menos 8 caracteres
            </Text>
            <Text>
              {" "}
              {hasMinusAndMayus(password) ? "✅" : "❌"} Al menos una letra
              mayúscula y una minúscula
            </Text>
            <Text> {hasNumber(password) ? "✅" : "❌"} Al menos un número</Text>
            <Text>
              {" "}
              {hasSpecialChar(password) ? "✅" : "❌"} Al menos un carácter
              especial (!@#$%^&*())
            </Text>
          </View>

          <Btn
            title="Registrarse"
            onPress={handleSubmit(onSubmit)}
            type="login"
            disabled={Object.keys(errors).length == 0 ? false : true}
          />
        </View>
      </ScrollView>
    </ViewContainer>
  );
};

export default Register;

const countrysNumber = [
  {
    name: "Colombia",
    code: "CO",
    phoneCode: "+57",
    icon: "Flag CO",
  },
  {
    name: "Peru",
    code: "PE",
    phoneCode: "+51",
    icon: "Flag PE",
  },
  {
    name: "Chile",
    code: "CL",
    phoneCode: "+56",
    icon: "Flag CL",
  },
  {
    name: "Argentina",
    code: "AR",
    phoneCode: "+54",
    icon: "Flag AR",
  },
  {
    name: "Bolivia",
    code: "BO",
    phoneCode: "+591",
    icon: "Flag BO",
  },
  {
    name: "Venezuela",
    code: "VE",
    phoneCode: "+58",
    icon: "Flag VE",
  },
];
