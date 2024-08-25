import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CategoryItem from "@/components/UI/Category";
import Error from "@/components/UI/Error";
import Loading from "@/components/UI/Loading";
import useProducts from "@/hooks/useProducts";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

function Categories({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const { categories, loading, error } = useProducts();

  useEffect(() => {
    if (categories) {
      setSelectedCategories(categories.map((category) => category.name));
    }
  }, [categories]);

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
        data={[...(categories ?? [])]}
        horizontal
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <CategoryItem
            image={item.image}
            selected={selectedCategories.includes(item.name)}
            name={item.name}
            onTouchEnd={() => {
              if (
                selectedCategories.length === 1 &&
                selectedCategories.includes(item.name)
              ) {
                return;
              }

              selectedCategories.includes(item.name)
                ? setSelectedCategories(
                    selectedCategories.filter(
                      (category) => category !== item.name,
                    ),
                  )
                : setSelectedCategories([...selectedCategories, item.name]);
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
