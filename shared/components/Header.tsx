import { View, Text, Image } from "react-native";
import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <View style={{backgroundColor: "#dec9a0"}} className="flex flex-row items-center w-full">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-16 h-16 mr-2 ml-0"
      />
      <Text className="text-2xl font-bold text-white">{text}</Text>
    </View>
  );
};

export default Header;
