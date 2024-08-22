import { Platform, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/UI/Button";
import { ThemedText } from "@/components/ThemedText";
import useForm from "@/hooks/useForm";
import Input from "@/components/Form/Input";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedKeyboardAvoidingView } from "@/components/ThemedKeyboardAvoidingView";
import defaultStyles from "@/styles";
import validateEmail from "@/lib/validateEmail";
import useAuth from "@/contexts/auth/useAuth";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const color = useThemeColor({}, "text");
  const { values, handleChange, validate } = useForm({
    defaultValues: {
      name: {
        value: "",
        error: false,
        optional: false,
      },
      email: {
        value: "",
        error: false,
        optional: false,
      },
    },
  });
  const { login } = useAuth();
  const { shadow, rounded } = defaultStyles;

  return (
    <ThemedKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={[styles.contentContainer, shadow, rounded]}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Welcome to Little Lemon 🍋
        </ThemedText>
        <ThemedText type="default">Let us get to know you</ThemedText>

        <ThemedView style={{ width: "100%" }}>
          <Input
            value={values.name.value}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Name"
            placeholderTextColor={color}
            error={values.name.error}
            keyboardType="default"
            autoComplete="name"
          />
        </ThemedView>

        <ThemedView style={{ width: "100%" }}>
          <Input
            value={values.email.value}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Email"
            placeholderTextColor={color}
            keyboardType="email-address"
            autoComplete="email"
            error={
              (!validateEmail(values.email.value ?? "") &&
                values.email.value !== "") ||
              values.email.error
            }
            errorMessage="Invalid email"
          />
        </ThemedView>

        <ThemedView style={{ width: "100%" }}>
          <Button
            disabled={values.name.error || values.email.error}
            text="Next"
            onPress={() => {
              const isValid = validate((data) =>
                validateEmail(data.email.value ?? ""),
              );

              if (isValid) {
                login({
                  username: values.name.value ?? "",
                  email: values.email.value ?? "",
                });
              }
            }}
          />
        </ThemedView>
      </ThemedView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
    padding: 35,
    gap: 16,
  },
});
