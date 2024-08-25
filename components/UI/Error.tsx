import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function Error({ error }: { error?: string }) {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Error...</ThemedText>
      <ThemedText type="default">{error}</ThemedText>
    </ThemedView>
  );
}
