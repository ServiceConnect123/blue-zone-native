import { View, Text, Pressable } from "react-native";
import React from "react";
import { BtnProps } from "@/interfaces/btn";

const Btn = ({
  title,
  onPress,
  disabled = false,
  type = "login",
}: BtnProps) => {
  switch (type) {
    case "login":
      return (
        <Pressable
          style={{
            backgroundColor: type === "login" ? "#edd0a6" : "#fff",
          }}
          className="p-2 rounded-lg w-full h-16 justify-center items-center m-5"
          onPress={onPress}
          disabled={disabled}
        >
          <Text className="text-center text-xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );
      break;

    case "primary":
      return (
        <Pressable
          style={{
            backgroundColor: type === "primary" ? "#edd0a6" : "#fff",
          }}
          className="p-2 rounded-lg w-full h-16 justify-center items-center m-5"
          onPress={onPress}
          disabled={disabled}
        >
          <Text className="text-center text-xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );
      break;

    case "link":
      return (
        <Pressable
          className="p-2 rounded-lg w-full h-16 justify-center items-center m-5"
          onPress={onPress}
          disabled={disabled}
        >
          <Text className="text-center text-lg font-bold text-blue-500">
            {title}
          </Text>
        </Pressable>
      );
      break;

    default:
      return (
        <Pressable
          style={{
            backgroundColor: type === "default" ? "#edd0a6" : "#fff",
          }}
          className="p-2 rounded-lg w-full h-16 justify-center items-center m-5"
          onPress={onPress}
          disabled={disabled}
        >
          <Text className="text-center text-xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );
      break;
  }
};

export default Btn;
