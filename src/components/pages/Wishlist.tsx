import ProductCard from "../ProductCard";
import type { Product } from "../../types";

interface WishlistProps {
  wishlist: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function Wishlist({
  wishlist,
  onAddToCart,
  onToggleWishlist,
}: WishlistProps) {
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">
          Your wishlist is empty
        </h1>
        <p className="text-stone">
          Save products you love by tapping the heart icon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brass" />
        <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
          Saved
        </span>
      </div>
      <h1 className="font-display text-4xl text-ink mb-10">Your Wishlist</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
