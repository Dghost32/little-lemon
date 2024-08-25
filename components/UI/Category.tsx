import React from "react";
import { ThemedView } from "../ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { StyleSheet, ViewProps } from "react-native";
import Category from "@/types/category";
import defaultStyles from "@/styles";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = Category &
  ViewProps & {
    selected: boolean;
  };

function CategoryItem({ image, name, selected, ...rest }: Props) {
  const { rounded } = defaultStyles;
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={[styles.categoryContainer]} {...rest}>
      <Image
        source={{ uri: image }}
        style={[
          styles.categoryImage,
          rounded,
          {
            borderWidth: selected ? 4 : 0,
            borderColor: selected ? color: "transparent",
          },
        ]}
      />
      <ThemedText type="default">{name}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
});

export default CategoryItem;
