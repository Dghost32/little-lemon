import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";
import { ThemedView } from "./ThemedView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = PropsWithChildren<SafeAreaViewProps>;

function Screen({ children, ...rest }: Props) {
  return (
    <ThemedSafeAreaView style={[styles.screen, styles.content]} {...rest}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
        <ThemedView style={styles.content}>{children}</ThemedView>
      </KeyboardAwareScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
});

export default Screen;
