import { StyleSheet, ViewProps } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useRouter from "@/hooks/useRouter";
import Icon from "@/components/UI/Icon";
import useAuth from "@/contexts/auth/useAuth";
import { Image } from "expo-image";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = ViewProps;

const Header = ({ ...rest }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container} {...rest}>
      <Icon
        onPress={() => {
          router.canGoBack() && router.pop();
        }}
        name="left"
        size={32}
      />
      <ThemedText type="title">🍋 Little Lemon</ThemedText>
      {!user?.profilePicture ? (
        <Icon
          name="user"
          size={32}
          onPress={() => {
            router.navigate("Profile");
          }}
        />
      ) : (
        <Image
          source={user?.profilePicture}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            borderColor: color,
            borderWidth: 2,
          }}
          onTouchEnd={() => {
            router.navigate("Profile");
          }}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
});

export default Header;
