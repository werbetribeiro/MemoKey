import { KeysValuesCard } from "@/components/KeysValuesCard";
import Colors from "@/constants/theme/Colors";
import { Keys } from "@/models/Keys";
import { handleCopyValue } from "@/utils/copyValues";
import { useKeysViewModel } from "@/viewmodels/useKeysViewModel";
import { Feather } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { useGetKeys } = useKeysViewModel();
  const [secret, setSecret] = useState<Keys[]>([]);

  const [selectedTypeKeys, setSelectedTypeKeys] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  // Lógica para pesquisar keys - filtra sobre os dados originais (secret)
  const filteredData = searchText
    ? secret.filter((key) =>
        key.key.some((itemKey) =>
          itemKey.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : secret;

  const handleSelectTypeKeys = (state: boolean) => {
    setSelectedTypeKeys(state);
    console.log("Clicou em selecionar tipo de chave:", state);
  };

  if (useGetKeys.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (useGetKeys.isError) {
    return <Text>Error: {JSON.stringify(useGetKeys.error)}</Text>;
  }

  // Filtra os dados quando useGetKeys.data muda
  useEffect(() => {
    if (useGetKeys.data) {
      const toSecrets = useGetKeys.data.filter(
        (key) => key.secret === selectedTypeKeys
      );

      setSecret(toSecrets);
    }
  }, [useGetKeys.data, selectedTypeKeys]);

  return (
    <View>
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
        keyExtractor={(item) => item.id || ""}
        renderItem={({ item }) => (
          <KeysValuesCard
            keysItem={item.key}
            valueItem={item.value}
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
        refreshing={useGetKeys.isFetching}
        onRefresh={() => useGetKeys.refetch()}
      />
    </View>
  );
}
