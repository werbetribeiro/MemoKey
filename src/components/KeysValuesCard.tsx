import Colors from "@/constants/theme/Colors";
import { Keys } from "@/models/Keys";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface KeysValuesCardProps {
  keys: Keys;
  copyValue?: () => void;
}

export const KeysValuesCard = ({ keys, copyValue }: KeysValuesCardProps) => {
  return (
    <TouchableOpacity
      onLongPress={copyValue}
      activeOpacity={0.8}
      delayLongPress={700}
      style={styles.container}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {keys.secret === true ? <Text>🔐</Text> : <Text>🔓</Text>}

          <Text style={styles.keyText}>{keys.key.join(", ")}</Text>
        </View>
        <Text style={styles.valueText}>{keys.value}</Text>
      </View>
    </TouchableOpacity>
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
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  keyText: {
    fontSize: 12,
    color: Colors.primary.gray200,
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
