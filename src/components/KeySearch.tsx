import Colors from "@/constants/theme/Colors";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface KeySearchProps {
    search: string;
    onSearch: (text: string) => void;
}

export const KeySearch = ({search, onSearch}: KeySearchProps) => {
    return (
        <View style={styles.container}>
        <Feather
          name="search"
          size={24}
          color={Colors.primary.black}
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={(text) => {
            onSearch(text);
          }}
          autoComplete={"off"}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder="Pesquisar..."
          placeholderTextColor={Colors.primary.gray200}
          style={[styles.input, { paddingRight: search ? 34 : 10 }]}
        />
        {search ? (
          <TouchableOpacity
            onPress={() => onSearch("")}
            style={styles.clearButton}
          >
            <Feather name="x" size={20} color={Colors.primary.black} />
          </TouchableOpacity>
        ) : null}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 10,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    top: 7,
    left: 14,
    zIndex: 1,
  },
  input: {
    backgroundColor: Colors.primary.gray100,
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 44,
    fontSize: 16,
  },
  clearButton: {
    position: "absolute",
    right: 14,
    top: 5,
    zIndex: 1,
    padding: 4,
  },
});