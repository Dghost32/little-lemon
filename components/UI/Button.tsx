import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import defaultStyles from "@/styles";
import { useState } from "react";

type Types = "primary" | "danger";

type Props = PressableProps & {
  text: string;
  darkColor?: string;
  lightColor?: string;
  darkBackgroundColor?: string;
  lightBackgroundColor?: string;
  type?: Types;
};

const Button = ({
  text,
  disabled,
  darkColor,
  lightColor,
  darkBackgroundColor,
  lightBackgroundColor,
  type = "primary",
  ...rest
}: Props) => {
  const [pressed, setPressed] = useState(false);

  const color =
    type === "primary"
      ? useThemeColor({ light: lightColor, dark: darkColor }, "text")
      : useThemeColor({ light: lightColor, dark: darkColor }, "secondaryLight");
  const backgroundColor =
    type === "primary"
      ? useThemeColor(
          { light: lightBackgroundColor, dark: darkBackgroundColor },
          "background",
        )
      : useThemeColor({ light: lightColor, dark: darkColor }, "secondary");
  const { rounded } = defaultStyles;

  return (
    <Pressable
      style={() => [
        disabled ? { pointerEvents: "none" } : { pointerEvents: "auto" },
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...rest}
    >
      <ThemedView
        style={[
          styles.button,
          rounded,
          { borderWidth: 1, borderColor: color },
          { backgroundColor: !pressed ? backgroundColor : color },
          disabled ? { backgroundColor: color, opacity: 0.6 } : {},
        ]}
      >
        <ThemedText
          type="button"
          style={[
            { color: !pressed ? color : backgroundColor },
            disabled ? { color: backgroundColor } : {},
          ]}
        >
          {text}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
