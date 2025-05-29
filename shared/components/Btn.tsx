import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { BtnProps } from "@/shared/interfaces/btn";
import { FontAwesome } from "@expo/vector-icons";

const Btn = ({
  title,
  onPress,
  disabled = false,
  type = "login",
}: BtnProps) => {
  const [isWeb, setIsWeb] = React.useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      setIsWeb(true);
    }
  }, []);
  const baseStyle = {
    className: "p-2 rounded-lg w-full h-16 justify-center items-center",
    pressedStyle: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
  };

  switch (type) {
    case "login":
      return (
        <Pressable
          style={[
            {
              backgroundColor: "#edd0a6",
              opacity: disabled ? 0.5 : 1,
            },
            isWeb ? styles.container : {},
          ]}
          className={isWeb ? "" : baseStyle.className}
          onPress={onPress}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontWeight: "bold",
              color: "black",
            }}
            className={isWeb ? "" : "text-center text-2xl font-bold text-black"}
          >
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
            isWeb ? styles.container : baseStyle.pressedStyle,
            disabled && { opacity: 0.5 },
          ]}
          className={isWeb ? "" : baseStyle.className}
          onPress={onPress}
          disabled={disabled}
          android_ripple={{ color: "#B1A080", borderless: false }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
            className={isWeb ? "" : "text-center text-xl font-bold text-black"}
          >
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
          style={[
            {
              backgroundColor: "#3b5998",
              flexDirection: "row",
              gap: 5,
              display: "flex",
            },
            isWeb ? styles.container : {},
          ]}
          className={isWeb ? "" : baseStyle.className}
          onPress={onPress}
        >
          <View
            className={
              isWeb ? "" : "flex items-center justify-center flex-row gap-2"
            }
            style={{
              padding: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap:10
            }}
          >
            <View
              style={styles.containerIcon}
            >
              <FontAwesome name="facebook" size={20} color="white" />
            </View>
            <Text
              style={
                isWeb
                  ? {
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                      width: "auto",
                    }
                  : {}
              }
              className={
                isWeb ? "" : "text-center text-xl font-bold text-white"
              }
            >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    maxWidth: 300,
    borderRadius: 8,
    minHeight: 50,
  },
  containerIcon:{
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});
