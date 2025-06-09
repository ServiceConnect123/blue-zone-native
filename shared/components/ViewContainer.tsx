import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ViewContainer = ({
  children,
  bottomProp,
  topProp,
}: {
  children: React.ReactNode;
  bottomProp?: boolean;
  topProp?: boolean;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: topProp ? top : 0,
        paddingBottom: bottomProp ? bottom : 0,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export default ViewContainer;
