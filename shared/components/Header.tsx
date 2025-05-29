import { View, Text, Image, Platform, StyleSheet } from "react-native";
import React from "react";

const Header = ({ text }: { text: string }) => {
  const isWeb = Platform.OS === "web";
  return (
    <View
      style={[{ backgroundColor: "#dec9a0" }, isWeb ? styles.headerWeb : {}]}
      className={isWeb ? "" : "flex flex-row items-center w-full"}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={isWeb ? styles.imageWeb : {}}
        className={isWeb ? "" : "w-16 h-16 mr-2 ml-0"}
      />
      <Text
        className={isWeb ? "" : "text-2xl font-bold text-white"}
        style={isWeb ? styles.textWeb : {}}
      >
        {text}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWeb: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 100,
    flexDirection: "row",
  },
  imageWeb: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textWeb: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
