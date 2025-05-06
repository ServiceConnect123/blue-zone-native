import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ViewContainer = ({
  children,
  bottomProp,
}: {
  children: React.ReactNode;
  bottomProp?: boolean;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top,
        paddingBottom: bottomProp ? bottom : 0,
        flex: 1,
      }}
      className="bg-red-500"
    >
      {children}
    </View>
  );
};

export default ViewContainer;
