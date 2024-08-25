import { KeyboardAvoidingView, KeyboardAvoidingViewProps, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { PropsWithChildren } from "react";

export type ThemedViewProps = ViewProps & KeyboardAvoidingViewProps &
  PropsWithChildren<{
    lightColor?: string;
    darkColor?: string;
  }>;

export function ThemedKeyboardAvoidingView({
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <KeyboardAvoidingView style={[{ backgroundColor }, style]} {...otherProps}>
      {children}
    </KeyboardAvoidingView>
  );
}
