import ViewContainer from "@/shared/components/ViewContainer";
import { View, Platform } from "react-native";
import { ReactApp } from "@/shared/modules/reactHomeModule/ReactWeb/ReactApp";
import { useAuth } from "@/shared/context/Auth";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const { logout,isAuthenticated } = useAuth();
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const handleLogout = () => {
    logout();
    console.log('isAuthenticated',isAuthenticated);
    router.replace("/(loginStack)/welcome");
  };

  return (
    <ViewContainer>
      <View className="flex-1 w-full h-full items-center justify-center">
        {isWeb ? <ReactApp /> : <View></View>}
      </View>
    </ViewContainer>
  );
}
