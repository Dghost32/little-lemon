import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import defaultStyles from "@/styles";

type Props = PressableProps & {
  text: string;
  darkColor?: string;
  lightColor?: string;
  darkBackgroundColor?: string;
  lightBackgroundColor?: string;
};

const Button = ({
  text,
  disabled,
  darkColor,
  lightColor,
  darkBackgroundColor,
  lightBackgroundColor,
  ...rest
}: Props) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "background",
  );
  const {shadow, shadowSm, rounded} = defaultStyles;

  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? shadowSm : shadow,
        disabled ? { pointerEvents: "none" } : { pointerEvents: "auto" },
      ]}
      {...rest}
    >
      <ThemedView
        style={[
          styles.button,
          rounded,
          disabled
            ? { backgroundColor: color, opacity: 0.6 }
            : {},
        ]}
      >
        <ThemedText
          type="button"
          style={[disabled ? { color: backgroundColor } : {}]}
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
