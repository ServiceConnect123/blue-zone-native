import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { BtnProps } from "@/shared/interfaces/btn";
import { FontAwesome } from "@expo/vector-icons";

const Btn = ({
  title,
  onPress,
  disabled = false,
  type = "login",
}: BtnProps) => {
  // Estilo base común para todos los botones
  const baseStyle = {
    className: "p-2 rounded-lg w-full h-16 justify-center items-center m-5",
    pressedStyle: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
  };

  switch (type) {
    case "login":
      return (
        <Pressable
          style={{
            backgroundColor: "#edd0a6",
            opacity: disabled ? 0.5 : 1,
          }}
          className={baseStyle.className}
          onPress={onPress}
        >
          <Text className="text-center text-2xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );

    case "primary":
      return (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: "red",
            },
            baseStyle.pressedStyle,
            disabled && { opacity: 0.5 },
          ]}
          className={baseStyle.className}
          onPress={onPress}
          disabled={disabled}
          android_ripple={{ color: "#B1A080", borderless: false }}
        >
          <Text className="text-center text-xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );

    case "link":
      return (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: "transparent",
            },
            pressed && { opacity: 0.5 },
            disabled && { opacity: 0.5 },
          ]}
          className={baseStyle.className}
          onPress={onPress}
          disabled={disabled}
        >
          <Text className="text-center text-lg font-bold text-blue-500">
            {title}
          </Text>
        </Pressable>
      );

    case "facebook":
      return (
        <Pressable
          style={{
            backgroundColor: "#3b5998",
          }}
          className={baseStyle.className}
          onPress={onPress}
        >
          <View className="flex items-center justify-center flex-row gap-2">
            <FontAwesome name="facebook" size={20} color="white" />
            <Text className="text-center text-xl font-bold text-white">
              {title}
            </Text>
          </View>
        </Pressable>
      );

    default:
      return (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: "#edd0a6",
            },
            baseStyle.pressedStyle,
            disabled && { opacity: 0.5 },
          ]}
          className={baseStyle.className}
          onPress={onPress}
          disabled={disabled}
          android_ripple={{ color: "#B1A080", borderless: false }}
        >
          <Text className="text-center text-xl font-bold text-black">
            {title}
          </Text>
        </Pressable>
      );
  }
};

export default Btn;