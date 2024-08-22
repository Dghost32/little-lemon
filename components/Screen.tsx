import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";
import { ThemedView } from "./ThemedView";

type Props = PropsWithChildren<SafeAreaViewProps>;

function Screen({ children, ...rest }: Props) {
  return (
    <ThemedSafeAreaView style={[styles.screen]} {...rest}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Screen;
