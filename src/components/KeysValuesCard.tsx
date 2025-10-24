import Colors from "@/constants/theme/Colors";
import { Keys } from "@/models/Keys";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface KeysValuesCardProps {
  keys: Keys;
  copyValue?: () => void;
  delValue?: (id: string) => void;
}

export const KeysValuesCard = ({
  keys,
  copyValue,
  delValue,
}: KeysValuesCardProps) => {
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
      {delValue && keys.id && (
        <Pressable style={styles.copyButton} onPress={() => delValue(keys.id!)}>
          <Feather name="trash" size={22} color={Colors.primary.red} />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.gray300,
    borderRadius: 8,
    gap: 4,
    marginBottom: 8,
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
    padding: 5,
  },
});
