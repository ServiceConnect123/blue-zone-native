import ViewContainer from "@/shared/components/ViewContainer";
import { Text, TouchableOpacity, View } from "react-native";
import { Quemada } from "@/shared/modules/reactHomeModule/VistaQuemada/Quemada";
import { ReactApp } from "@/shared/modules/reactHomeModule/ReactWeb/ReactApp";
import { useContext } from "react";
import { useAuth } from "@/shared/context/Auth";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const { logout,isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    console.log('isAuthenticated',isAuthenticated);
    router.replace("/(loginStack)/welcome");
  };

  return (
    <ViewContainer>
      <TouchableOpacity
        className="bg-red-500 w-10 h-10 items-center justify-center"
        onPress={handleLogout}
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
      <View className="flex-1 w-full h-full items-center justify-center">
        <ReactApp />
      </View>
    </ViewContainer>
  );
}
