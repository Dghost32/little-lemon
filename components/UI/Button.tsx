import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

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

  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? styles.pressed : styles.unpressed,
        disabled ? { pointerEvents: "none" } : { pointerEvents: "auto" },
      ]}
      {...rest}
    >
      <ThemedView
        style={[
          styles.button,
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
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  unpressed: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.4,
  },
});

export default Button;
