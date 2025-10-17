import { KeysValuesCard } from "@/components/KeysValuesCard";
import { handleCopyValue } from "@/utils/copyValues";
import { useKeysViewModel } from "@/viewmodels/useKeysViewModel";

import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { useGetKeys } = useKeysViewModel();

  if (useGetKeys.isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  if (useGetKeys.isError) {
    return <Text>Error: {JSON.stringify(useGetKeys.error)}</Text>;
  }

  return (
    <View>
      <FlatList
        data={useGetKeys.data}
        keyExtractor={(item) => item.id || ""}
        renderItem={({ item }) => (
          <KeysValuesCard
            keysItem={item.key}
            valueItem={item.value}
            copyValue={() => handleCopyValue(item.value)}
          />
        )}
        refreshing={useGetKeys.isFetching}
        onRefresh={() => useGetKeys.refetch()}
      />
    </View>
  );
}
