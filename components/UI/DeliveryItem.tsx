import { ThemedView } from "../ThemedView";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";
import { StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import Product from "@/types/product";
import defaultStyles from "@/styles";
import Icon from "./Icon";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = ViewProps & {
  product: Product;
};

function DeliveryItem({ product, ...rest }: Props) {
  const { width, height } = useWindowDimensions();
  const { rounded, shadow } = defaultStyles;
  const secondary = useThemeColor({}, "secondary");

  return (
    <ThemedView
      style={[styles.deliveryContainer, rounded, shadow, { width: width - 40 }]}
      {...rest}
    >
      <Image
        source={{ uri: product.image }}
        style={[
          styles.deliveryImage,
          rounded,
          { height: width > 800 ? height / 2.5 : height / 4 },
          { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        ]}
      />

      <ThemedView style={[styles.deliveryDescription]}>
        <ThemedView>
          <ThemedText type="subtitle">{product.title}</ThemedText>
          <ThemedText type="default">{product.description}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type="default">
            {10 + Math.floor(Math.random() * 5)} mins | ${product.price}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, flexDirection: "row", gap: 5 }}>
          <Icon name="star" size={16} style={{ color: secondary }} />
          <ThemedText type="default" style={{ color: secondary }}>
            {product.rating.rate}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  deliveryContainer: {
    gap: 8,
    maxWidth: 800,
  },
  deliveryImage: {
    width: "100%",
  },
  deliveryDescription: {
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },
});

export default DeliveryItem;
