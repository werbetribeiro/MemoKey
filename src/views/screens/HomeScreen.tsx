import { useKeysViewModel } from "@/viewmodels/useKeysViewModel";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { useGetKeys } = useKeysViewModel();

  if (useGetKeys.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (useGetKeys.isError) {
    return <Text>Error: {JSON.stringify(useGetKeys.error)}</Text>;
  }

  return (
    <View>
      <FlatList
        data={useGetKeys.data}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.key.join(", ")}: {item.value}</Text>
            {item.secret && <Text>(🔒 secret)</Text>}
          </View>
        )}
      />
    </View>
  );
}
