import Featured from "./sections/featured";
import Categories from "./sections/categories";
import Delivery from "./sections/delivery";
import useAuth from "@/contexts/auth/useAuth";
import { useState } from "react";
import Loading from "@/components/UI/Loading";
import Screen from "@/components/Screen";

export default function HomeScreen() {
  const { loading } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>();

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <Featured />
      <Categories
        selectedCategories={selectedCategories ?? []}
        setSelectedCategories={setSelectedCategories}
      />
      <Delivery selectedCategories={selectedCategories ?? []} />
    </Screen>
  );
}
