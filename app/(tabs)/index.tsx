import ViewContainer from "@/shared/components/ViewContainer";
import { View } from "react-native";
import { ReactApp } from "@/shared/modules/reactHomeModule/ReactWeb/ReactApp";

export default function TabOneScreen() {
  return (
    <ViewContainer>
      <View className="flex-1 w-full h-full items-center justify-center">
        <ReactApp />
      </View>
    </ViewContainer>
  );
}
