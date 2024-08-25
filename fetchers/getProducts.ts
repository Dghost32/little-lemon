import axios from "axios";

export default async function fetchProducts() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json",
    );
    return response.data.menu.map(
      (
        product: {
          name: string;
          price: number;
          description: string;
          image: string;
          category: string;
        },
        index: number,
      ) => ({
        ...product,
        id: index,
        title: product.name,
        rating: {
          rate: Math.floor(Math.random() * 5) + 1,
          count: 10,
        },
        image: [
          `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/pasta.jpg?raw=true`,
          "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true",
          "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/bruschetta.jpg?raw=true",
        ][Math.floor(Math.random() * 3)],
      }),
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
