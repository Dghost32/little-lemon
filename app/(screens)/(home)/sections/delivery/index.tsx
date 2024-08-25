import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DeliveryItem from "@/components/UI/DeliveryItem";
import Error from "@/components/UI/Error";
import Loading from "@/components/UI/Loading";
import useProducts from "@/hooks/useProducts";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

function Delivery({ selectedCategories }: { selectedCategories: string[] }) {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ThemedView>
      <ThemedText type="title">Order for delivery</ThemedText>
      <FlatList
        data={
          products?.filter((product) =>
            selectedCategories.includes(product.category),
          ) ?? []
        }
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => <DeliveryItem product={item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default Delivery;
