import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Error from "@/components/UI/Error";
import FeaturedItem from "@/components/UI/Featured";
import Loading from "@/components/UI/Loading";
import useProducts from "@/hooks/useProducts";
import { FlatList, StyleSheet } from "react-native";

function Categories() {
  const { featured, loading, error } = useProducts();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ThemedView>
      <ThemedText type="title">Featured</ThemedText>
      <FlatList
        data={[...(featured ?? [])]}
        horizontal
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => <FeaturedItem product={item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 10,
  },
});

export default Categories;
