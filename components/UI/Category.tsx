import React from "react";
import { ThemedView } from "../ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { StyleSheet, ViewProps } from "react-native";
import Category from "@/types/category";
import defaultStyles from "@/styles";

type Props = Category & ViewProps;

function CategoryItem({ image, name, ...rest }: Props) {
  const { rounded } = defaultStyles;

  return (
    <ThemedView style={[ styles.categoryContainer ]} {...rest}>
      <Image source={{ uri: image }} style={[styles.categoryImage, rounded]} />
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
