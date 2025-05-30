import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/shared/context/Auth";
import { ToastAndroid, Platform } from "react-native";

interface LoginForm {
  email: string;
  password: string;
  savePassword: boolean;
}

const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isWeb = Platform.OS === "web";

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      savePassword: false,
    },
  });

  const stylesTailwind = {
    labelStyleForm: "text-lg text-start w-full font-bold",
    inputStyleForm:
      "border border-gray-400 rounded-2xl p-3 w-full h-16 text-xl",
    iconStyleForm: "absolute right-3 top-1/2 -translate-y-1/2",
    errorStyle: "text-red-500 text-start w-full",
  };

  const logFormSubmission = (values: LoginForm) => {
    console.log("Datos del formulario:", values);
  };

  const retrieveUserFromStorage = async (): Promise<any | null> => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error al recuperar usuario:", error);
      return null;
    }
  };

  const handleNoUserRegistered = () => {
    console.log("No hay usuario registrado");
    ToastAndroid.show("No se encontro usuario", ToastAndroid.LONG);
  };

  const areCredentialsValid = (user: any, formValues: LoginForm): boolean => {
    return (
      user.email === formValues.email && user.password === formValues.password
    );
  };

  const handleInvalidCredentials = () => {
    console.log("Credenciales incorrectas");
    ToastAndroid.show("Credenciales no válidas", ToastAndroid.LONG);
  };

  const handleSuccessfulLogin = async () => {
    console.log("Credenciales correctas");
    login();
    router.replace("/(tabs)");
    ToastAndroid.show("Usuario Iniciado correctamente", ToastAndroid.LONG);
  };

  const validForm = () => {
    const data = getValues();
    const validData = Object.values(data).every((value) => value !== "");
    return validData;
  };

  const onSubmit = async () => {
    if (!validForm()) {
      console.log("Formulario no válido");
      ToastAndroid.show("Formulario no válido", ToastAndroid.LONG);
      return;
    }

    const formValues = getValues();
    logFormSubmission(formValues);

    const user = await retrieveUserFromStorage();
    if (!user) {
      handleNoUserRegistered();
      return;
    }

    if (!areCredentialsValid(user, formValues)) {
      handleInvalidCredentials();
      return;
    }

    await handleSuccessfulLogin();
  };

  return {
    control,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    handleSubmit,
    stylesTailwind,
    isWeb,
  };
};

export default useLogin;
