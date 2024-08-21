import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

type Props = TextInputProps & {
  darkColor?: string;
  lightColor?: string;
  darkBackgroundColor?: string;
  lightBackgroundColor?: string;
  error?: boolean;
  errorMessage?: string;
};

const Input = ({
  darkColor,
  lightColor,
  darkBackgroundColor,
  lightBackgroundColor,
  error = false,
  errorMessage = "This field is required",
  ...rest
}: Props) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const secondaryColor = useThemeColor({}, "secondary");
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "background",
  );

  return (
    <>
      <TextInput
        {...rest}
        style={[
          styles.input,
          { color, backgroundColor, borderBottomColor: color },
        ]}
      />
      <ThemedText type="caption" style={{ color: secondaryColor, display: error ? "flex" : "none", marginLeft: 40 }}>
        {errorMessage}
      </ThemedText>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
});

export default Input;
