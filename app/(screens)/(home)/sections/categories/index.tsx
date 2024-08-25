import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CategoryItem from "@/components/UI/Category";
import Error from "@/components/UI/Error";
import Loading from "@/components/UI/Loading";
import useProducts from "@/hooks/useProducts";
import { FlatList, StyleSheet } from "react-native";

function Categories() {
  const { categories, loading, error } = useProducts();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ThemedView>
      <ThemedText type="title">Categories</ThemedText>

      <FlatList
        data={[...(categories ?? []), ...(categories ?? [])]}
        horizontal
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <CategoryItem
            image={item.image}
            name={item.name}
            onTouchEnd={() => {
              console.log("Category tapped!");
            }}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexWrap: "nowrap",
    justifyContent: "space-around",
    minWidth: "100%",
    alignItems: "center",
    padding: 10,
  },
});

export default Categories;
