import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps, ComponentType } from "react";

function withColor<P>(
  Component: ComponentType<P>,
  type: keyof typeof Colors.light & keyof typeof Colors.dark = "text",
) {
  return (props: ComponentProps<typeof Component>) => {
    const color = useThemeColor({}, type);

    return <Component {...props} color={color} />;
  };
}

export default withColor;
