import Colors from "@/constants/theme/Colors";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface KeyHeaderProps {
  onPress?: () => void;
}

export const KeyHeader = ({ onPress }: KeyHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.title}>
          Memo{" "}
          <Text style={[styles.title, { color: Colors.primary.tint }]}>
            Key
          </Text>
        </Text>
      </View>
      {/* Botão ADD */}
      <View>
        <TouchableOpacity style={styles.btnAdd} onPress={onPress}>
          <Feather name="plus" size={22} color={Colors.primary.gray100} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary.gray100,
  },
  btnAdd: {
    backgroundColor: Colors.primary.tint,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 30,
  },
});
