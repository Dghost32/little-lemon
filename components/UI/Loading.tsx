import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

function Loading() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="title">Loading...</ThemedText>
    </ThemedView>
  );
}

export default Loading;
