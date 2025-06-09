import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/FontAwesome";

const SelectDropDown = ({data, onSelect}:any) => {
  return (
    <View className="w-auto">
      <SelectDropdown
        data={data}
        onSelect={(selectedItem) => {
          onSelect(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && (selectedItem?.title || selectedItem?.phoneCode)) || "+57"}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={14}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected):any => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.title || item.phoneCode}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default SelectDropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 80,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
