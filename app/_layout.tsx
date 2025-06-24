import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { AuthProvider, useAuth } from "@/shared/context/Auth";
import { StatusBar } from "react-native";
import useLocationPermission from "@/shared/hooks/useLocation";
import LoadScreen from "@/shared/components/LoadScreen";
import CustomToast from "@/shared/components/CustomToast";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(loginStack)/index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <StatusBar barStyle="default" />
        <RootLayoutNav />
      </AuthProvider>
      <CustomToast />
      <Toast />
    </>
  );
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const { permissionGranted, isLoading } = useLocationPermission();
  //AsyncStorage.removeItem("user");
  //AsyncStorage.setItem("auth", "false");
  if (isLoading) {
    return <LoadScreen />;
  }

  if (!permissionGranted) {
    return null;
  }
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="(loginStack)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
