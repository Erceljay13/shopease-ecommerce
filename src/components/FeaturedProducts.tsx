import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { useReveal } from "../hooks/useReveal";

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function FeaturedProducts({
  products,
  onAddToCart,
  onToggleWishlist,
}: FeaturedProductsProps) {
  const featured = products.filter((p) => p.isFeatured);
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-stone-light reveal ${visible ? "reveal-visible" : ""}`}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              Handpicked
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink">Featured Products</h2>
        </div>
        <a
          href="/products"
          className="text-sm text-ink border-b border-ink/30 pb-0.5 hover:border-ink transition"
        >
          View all
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {featured.map((product, i) => (
          <div
            key={product.id}
            style={{ animationDelay: `${i * 100}ms` }}
            className={visible ? "reveal-visible" : "reveal"}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
