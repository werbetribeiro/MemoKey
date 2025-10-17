import Colors from "@/constants/theme/Colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface KeysValuesCardProps {
  keysItem: string[];
  valueItem: string;
  copyValue?: () => void;
}

export const KeysValuesCard = ({
  keysItem,
  valueItem,
  copyValue
}: KeysValuesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.keyText}>{keysItem.join(", ")}</Text>
        <Text style={styles.valueText}>{valueItem}</Text>
      </View>
      <TouchableOpacity onPress={copyValue} activeOpacity={0.8} style={styles.copyButton}>
        <Feather name="copy" size={14} color={Colors.primary.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.gray300,
    borderRadius: 8,
    gap: 4,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingVertical: 12,
    marginHorizontal: 10,
  },
  keyText: {
    fontSize: 12,
    color: Colors.primary.black,
  },
  valueText: {
    fontSize: 18,
    color: Colors.primary.gray100,
    fontWeight: "bold",
  },
  copyButton: {
    backgroundColor: Colors.primary.gray100,
    padding: 10,
    borderRadius: 8,
  },
});
