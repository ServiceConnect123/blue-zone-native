import { ToastAndroid, Platform } from "react-native";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@env";

export interface Country {
  phoneCode: string;
  name: string;
  code: string;
  icon: string;
}

const useRegister = (countrysNumber: Country[]) => {
  const isWeb = Platform.OS === "web";
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

  //Estilos
  const containerStyleForm = "flex-1 w-full h-full p-2 items-center relative";
  const labelStyleForm = "text-lg text-start w-full font-bold mb-3";
  const inputStyleForm =
    "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl relative";
  const iconStyleForm = "absolute right-10 top-16 z-10";
  const errorStyle = "text-red-500 text-sm mt-1 w-full text-left";

  //Estados
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(
    countrysNumber[0]
  );
  const [loading, setLoading] = React.useState(false);

  const changeIcon = (index: number) => {
    if (index === 1) {
      setShowPassword(!showPassword);
    } else if (index === 2) {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSubmit = async () => {
    if (!validateForm() || !validateDataForm()) {
      ToastAndroid.show("Formulario no válido", ToastAndroid.LONG);
      return;
    } else {
      registerUser();
    }
  };

  const registerUser = async () => {
    setLoading(true);
    console.log(getValues(), errors);
    console.log(API_URL);
    try {
      await axios
        .post(`${API_URL}auth/signup`, {
          phoneNumber:
            selectedCountry.phoneCode + " " + getValues().phoneNumber,
          email: getValues().email,
          password: getValues().password,
        })
        .then((res) => {
          console.log(res.data);
          ToastAndroid.show(
            "Usuario registrado exitosamente",
            ToastAndroid.LONG
          );
          router.push("/login");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error: interno", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error: externo ", error);
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (password !== getValues("confirmPassword")) {
      return false;
    }
    if (!passwordRegex.test(getValues("confirmPassword"))) {
      return false;
    }
    if (
      errors.phoneNumber ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const validateDataForm = (): boolean => {
    const data = getValues();
    const validData = Object.values(data).every(
      (value) => value !== "" && value !== undefined && value !== null
    );
    return validData;
  };

  const onSelectCountry = (selectedItem: any) => {
    setSelectedCountry(selectedItem);
  };

  return {
    control,
    handleSubmit,
    getValues,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    changeIcon,
    onSubmit,
    isWeb,
    containerStyleForm,
    labelStyleForm,
    inputStyleForm,
    iconStyleForm,
    errorStyle,
    hasMinusAndMayus,
    hasNumber,
    hasSpecialChar,
    hasMinLength,
    passwordRegex,
    password,
    selectedCountry,
    onSelectCountry,
    loading,
  };
};

export default useRegister;
