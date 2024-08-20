import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "defaultSemiBold"
    | "small"
    | "smallSemiBold"
    | "caption"
    | "captionSemiBold"
    | "title"
    | "subtitle"
    | "button"
    | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { fontFamily: "Poppins" },
        { color },
        type === "default" ? styles.default : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "small" ? styles.small : undefined,
        type === "smallSemiBold" ? styles.smallSemiBold : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "captionSemiBold" ? styles.captionSemiBold : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "button" ? styles.button : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontWeight: "regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    fontWeight: "600",
  },
  small: {
    fontSize: 14,
    fontWeight: "regular",
  },
  smallSemiBold: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    fontWeight: "600",
  },
  caption: {
    fontSize: 13,
    fontWeight: "regular",
  },
  captionSemiBold: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    fontWeight: "600",
  },
  title: {
    fontSize: 34,
    fontFamily: "PoppinsBlack",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "PoppinsBlack",
    fontWeight: "black",
  },
  button: {
    fontSize: 16,
    fontFamily: "PoppinsBlack",
    textTransform: "uppercase",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
