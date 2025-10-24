import KeyForm from "@/components/KeyForm";
import { KeyHeader } from "@/components/KeyHeader";
import { KeySearch } from "@/components/KeySearch";
import { KeysValuesCard } from "@/components/KeysValuesCard";
import BottomSheet from "@/components/ui/Modal";
import { Keys } from "@/models/Keys";
import { KeysLocalService } from "@/services/KeysLocalService";
import { handleCopyValue } from "@/utils/copyValues";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [keys, setKeys] = useState<Keys[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  async function getKeys() {
    const response = await KeysLocalService.getKeys();
    setKeys(response);
    console.log("Keys:", response);
  }

  async function handleRemoveKey(id: string) {
    try {
      await KeysLocalService.removeKeys(id);
      Alert.alert(
        "Tem Certeza que deseja Apagar?",
        "Esta ação não pode ser desfeita.",

        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
          },
          {
            text: "OK",
            onPress: () => {
              console.log("Chave Deletada:", id);
            },
          },
        ]
      );
      await getKeys(); // Recarrega a lista após deletar
    } catch (error) {
      console.error("Erro ao deletar chave:", error);
    }
  }

  const search = searchText
    ? keys.filter((key) =>
        key.key.some((itemKey) =>
          itemKey.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : keys;

  useEffect(() => {
    getKeys();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <KeyHeader onPress={() => setModalVisible(true)} />
      <KeySearch search={searchText} onSearch={(text) => setSearchText(text)} />
      <FlatList
        data={search}
        keyExtractor={(item, index) => item.id || `key${index}`}
        renderItem={({ item }) => (
          <KeysValuesCard
            keys={item}
            copyValue={() => handleCopyValue(item.value)}
            delValue={(id) => handleRemoveKey(id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
      />
      <BottomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height="70%" // ou use número: 600
        showHandle={true}
      >
        {/* Aqui você pode colocar QUALQUER componente */}
        <KeyForm />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
