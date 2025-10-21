import Colors from "@/constants/theme/Colors";
import { DatabaseProvider } from "@/providers/DatabaseProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <DatabaseProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { paddingTop: insets.top + 20, paddingBottom: insets.bottom, backgroundColor: Colors.primary.background },
            statusBarStyle: "light",
          }}
        ></Stack>
      </QueryClientProvider>
    </DatabaseProvider>
  );
}
