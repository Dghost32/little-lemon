import { StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Loading from "@/components/UI/Loading";
import Screen from "@/components/Screen";
import useRouter from "@/hooks/useRouter";
import Header from "@/components/UI/Header";
import useAuth from "@/contexts/auth/useAuth";

export default function HomeScreen() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <Header />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome {user?.username} to Little Lemon!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Routes</ThemedText>
        <ThemedText
          type="link"
          onPress={() => {
            router.navigate("+not-found");
          }}
        >
          Not found page
        </ThemedText>
        <ThemedText
          type="link"
          onPress={() => {
            router.navigate("Profile");
          }}
        >
          Profile page
        </ThemedText>
        <ThemedText
          onPress={() => {
            setUser(null);
          }}
          type="link"
        >
          Logout
        </ThemedText>
      </ThemedView>
    </Screen>
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
