import ViewContainer from "@/shared/components/ViewContainer";
import { View, Platform } from "react-native";
import { ReactApp } from "@/shared/modules/reactHomeModule/ReactWeb/ReactApp";
import { useAuth } from "@/shared/context/Auth";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabOneScreen() {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const {top,bottom} = useSafeAreaInsets();

  const handleLogout = () => {
    logout();
    console.log("isAuthenticated", isAuthenticated);
    router.replace("/(loginStack)");
  };

  return (
    <ViewContainer>
      <View
        style={
          isWeb
            ? {
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: "100%",
                width: "100%",
              }
            : {paddingTop: top,paddingBottom: bottom}
        }
        className={
          isWeb ? "" : "flex-1 w-full h-full items-center justify-center"
        }
      >
        {isWeb ? <View></View> : <ReactApp />}
      </View>
    </ViewContainer>
  );
}
