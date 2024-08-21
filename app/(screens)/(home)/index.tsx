import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import useAsync from "@/hooks/useAsync";
import Loading from "@/components/UI/Loading";
import useLog from "@/hooks/useConsoleLog";

export default function HomeScreen() {
  const router = useRouter();
  const { get, keys, clear} = useAsyncStorage();
  const {
    value: username,
    error,
    loading,
  } = useAsync(async () => await get("user"), []);

  useLog(keys);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
  }

  if (!keys.includes("user")) {
    router.push("/onboarding");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome {username} to Little Lemon!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Routes</ThemedText>
        <ThemedText
          type="link"
          onPress={() => {
            router.push("/");
          }}
        >
          Home
        </ThemedText>
        <ThemedText
          onPress={() => {
            router.push("/explore");
          }}
          type="link"
        >
          Explore
        </ThemedText>
        <ThemedText
          onPress={() => {
            router.push("/onboarding");
          }}
          type="link"
        >
          onboarding
        </ThemedText>

        <ThemedText
          onPress={async () => {
            await clear();
          }}
          type="link"
        >
         clear user 
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
