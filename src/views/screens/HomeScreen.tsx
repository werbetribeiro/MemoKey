import KeyForm from "@/components/KeyForm";
import { KeysValuesCard } from "@/components/KeysValuesCard";
import BottomSheet from "@/components/ui/Modal";
import Colors from "@/constants/theme/Colors";
import { Keys } from "@/models/Keys";
import { KeysLocalService } from "@/services/KeysLocalService";
import { handleCopyValue } from "@/utils/copyValues";
import { Feather } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [keys, setKeys] = useState<Keys[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedTypeKeys, setSelectedTypeKeys] = useState<boolean>(false);

  async function getKeys() {
    try {
      const response = await KeysLocalService.getKeys();
      setKeys(response);
      console.log("Keys:", response);
    } catch (error) {
      console.error("Error retrieving keys:", error);
    }
  }

  // Filtra por tipo (secreto ou não)
  const filteredByType = keys.filter((key) => key.secret === selectedTypeKeys);

  // Lógica para pesquisar keys - filtra sobre os dados já filtrados por tipo
  const filteredData = searchText
    ? filteredByType.filter((key) =>
        key.key.some((itemKey) =>
          itemKey.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : filteredByType;

  const handleSelectTypeKeys = (state: boolean) => {
    setSelectedTypeKeys(state);
  };

  const handleDeleteAllKeys = async () => {
    try {
      await KeysLocalService.clearAllKeys();
      setKeys([]);
    } catch (error) {
      console.error("Error clearing all keys:", error);
    }
  };

  useEffect(() => {
    getKeys();
  }, [selectedTypeKeys]);

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginHorizontal: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: Colors.primary.gray100,
              fontSize: 34,
              fontWeight: "bold",
            }}
          >
            Memo
            <Text
              style={{
                color: Colors.primary.tint,
                fontSize: 34,
                fontWeight: "bold",
              }}
            >
              Key
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary.tint,
            borderRadius: 17,
            justifyContent: "center",
            alignItems: "center",
            width: 35,
            height: 35,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" color={Colors.primary.gray100} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 20, position: "relative" }}>
        <Feather
          name="search"
          size={24}
          color={Colors.primary.black}
          style={{ position: "absolute", top: 7, left: 14, zIndex: 1 }}
        />
        <TextInput
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          autoComplete={"off"}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder="Pesquisar..."
          style={{
            backgroundColor: Colors.primary.gray100,
            marginHorizontal: 10,
            borderRadius: 8,
            paddingVertical: 10,
            paddingLeft: 34,
            paddingRight: searchText ? 34 : 10,
            position: "relative",
          }}
        />
        {searchText ? (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={{
              position: "absolute",
              right: 14,
              top: 5,
              zIndex: 1,
              padding: 4,
            }}
          >
            <Feather name="x" size={20} color={Colors.primary.black} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
          alignContent: "center",
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => handleSelectTypeKeys(true)}
          style={{
            flex: 1,
            padding: 8,
            backgroundColor: Colors.primary.tintVariant,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>🔐 Secretas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelectTypeKeys(false)}
          style={{
            flex: 1,
            padding: 8,
            backgroundColor: Colors.primary.tint,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>🔓 Não Secretas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => item.id || `key-${index}`}
        renderItem={({ item }) => (
          <KeysValuesCard
            keys={item}
            copyValue={() => handleCopyValue(item.value)}
          />
        )}
        ListFooterComponent={() => (
          <Text
            style={{
              color: "white",
              padding: 8,
              backgroundColor: Colors.primary.tintVariant,
              marginHorizontal: 10,
              borderRadius: 8,
              marginTop: 4,
            }}
          >
            Total de Itens: {filteredData.length}
          </Text>
        )}
        //refreshing={useGetKeys.isFetching}
        //onRefresh={() => useGetKeys.refetch()}
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
