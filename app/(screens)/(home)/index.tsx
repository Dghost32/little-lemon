import Loading from "@/components/UI/Loading";
import Screen from "@/components/Screen";
import Header from "@/components/UI/Header";
import Featured from "./sections/featured";
import Categories from "./sections/categories";
import Delivery from "./sections/delivery";
import useAuth from "@/contexts/auth/useAuth";

export default function HomeScreen() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <Header />
      <Featured />
      <Categories />
      <Delivery />
    </Screen>
  );
}
