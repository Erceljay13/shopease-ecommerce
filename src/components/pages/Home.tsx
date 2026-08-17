import Hero from "../Hero";
import Categories from "../Categories";
import ScrollStory from "../ScrollStory";
import BestSellers from "../BestSellers";
import { products, categories } from "../../data/products";
import type { Product } from "../../types";

interface HomeProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: Product[];
}

export default function Home({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}: HomeProps) {
  return (
    <div>
      <Hero />
      <Categories categories={categories} />
      <ScrollStory />
      <BestSellers
        products={products}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />
    </div>
  );
}
