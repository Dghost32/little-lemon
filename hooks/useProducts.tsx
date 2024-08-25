import fetchProducts from "@/fetchers/getProducts";
import useAsync from "./useAsync";
import useAsyncStorageState from "./useAsyncStorageState";
import { useEffect } from "react";
import Product from "@/types/product";
import Category from "@/types/category";


function useProducts() {
  const [featured, setFeatured, loadingFeatured] = useAsyncStorageState({
    key: "featured",
    initialValue: [] as Product[] | null,
  });

  const [products, setProducts, loadingProducts] = useAsyncStorageState({
    key: "products",
    initialValue: [] as Product[] | null,
  });

  const [categories, setCategories, loadingCategories] = useAsyncStorageState({
    key: "categories",
    initialValue: [] as Category[] | null,
  });

  const {
    value,
    loading: fetching,
    error: errorFetching,
  } = useAsync<Product[]>(fetchProducts);

  useEffect(() => {
    if (value && value.length > 0) {
      setFeatured(value.slice(0, 3));
      setProducts(value);
      setCategories([
        ...value.reduce((acc, product) => {
          if (!acc.find((category) => category.name === product.category)) {
            acc.push({
              name: product.category,
              image: product.image,
            });
          }
          return acc;
        }, [] as Category[]),
      ]);
    }
  }, [value]);

  return {
    featured,
    products,
    categories,
    loading:
      loadingFeatured || loadingProducts || loadingCategories || fetching,
    error: errorFetching,
  };
}

export default useProducts;
