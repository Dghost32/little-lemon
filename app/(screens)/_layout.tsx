import useAsync from "@/hooks/useAsync";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(home)/index" />
      <Stack.Screen name="explore/index" />
      <Stack.Screen name="onboarding/index" />
    </Stack>
  );
}
