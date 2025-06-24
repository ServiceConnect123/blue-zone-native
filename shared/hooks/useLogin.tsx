import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import axios from "axios";
import { showToast } from "../components/CustomToast";

interface LoginForm {
  email: string;
  password: string;
  savePassword: boolean;
}

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const login = async () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://bluezones-app-latest.onrender.com";
    setIsLoading(true);
    const data = {
      email: getValues().email,
      password: getValues().password,
    };
    axios
      .post(`${API_URL}/auth/signin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        if (res) {
          const object = {
            accessToken: res.data.accessToken,
            idToken: res.data.idToken,
            refreshToken: res.data.refreshToken,
          }
          AsyncStorage.setItem("user", JSON.stringify(object));
          AsyncStorage.setItem("auth", "true");
          setIsLoading(false);
          handleSuccessfulLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showToast("error", "Error al iniciar sesión", "", {
          duration: 3000,
          position: "top",
          autoHide: true,
        });
      });
  };

  const handleSuccessfulLogin = async () => {
    router.replace("/(tabs)");
    showToast("success", "Usuario Iniciado correctamente", "", {
      duration: 3000,
      position: "top",
      autoHide: true,
    });
  };

  const validForm = () => {
    const data = getValues();
    const validData = Object.values(data).every((value) => value !== "");
    return validData;
  };

  const onSubmit = async () => {
    if (!validForm()) {
      showToast("error", "Formulario no válido", "", {
        duration: 3000,
        position: "top",
        autoHide: true,
      });
      return;
    }

    const formValues = getValues();
    logFormSubmission(formValues);
    await login();
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
    isLoading,
  };
};

export default useLogin;
