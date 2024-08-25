import { ThemedView } from "../ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import Product from "@/types/product";
import defaultStyles from "@/styles";

type Props = ViewProps & {
  product: Product;
};

function FeaturedItem({ product, ...rest }: Props) {
  const { width, height } = useWindowDimensions();
  const { rounded, shadow } = defaultStyles;

  return (
    <ThemedView
      style={[
        styles.featuredContainer,
        { width: width - 80, height: height / 4 },
        rounded,
        shadow,
      ]}
      {...rest}
    >
      <Image
        source={{ uri: product.image }}
        style={[styles.featuredImage, rounded]}
      />
      <ThemedView style={[styles.featuredTextContainer]}>
        <ThemedText type="subtitle" style={styles.featuredText}>{product.title}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  featuredContainer: {
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 420,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  featuredText: {
    color: "white",
  },
});

export default FeaturedItem;
