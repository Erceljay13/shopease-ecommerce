import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import { formatPrice } from "../lib/formatPrice";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: Product[];
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}: ProductCardProps) {
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group">
      <div className="relative bg-stone-light/40 overflow-hidden mb-4">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-[1.03] transition duration-500"
          />
        </Link>

        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-ink text-white text-[10px] font-medium uppercase tracking-wide px-2.5 py-1">
            Best Seller
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-paper text-emerald border border-emerald text-[10px] font-medium px-2.5 py-1">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          className="absolute bottom-4 right-4 bg-white p-2.5 border border-stone-light hover:bg-stone-light transition-colors"
        >
          <Heart
            className="w-4 h-4 transition-transform duration-300"
            fill={isWishlisted ? "#2f4a3e" : "none"}
            color={isWishlisted ? "#2f4a3e" : "#17140f"}
            style={{ transform: isWishlisted ? "scale(1.1)" : "scale(1)" }}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <p className="text-[11px] text-stone uppercase tracking-wide mb-1">
        {product.category}
      </p>
      <Link to={`/products/${product.id}`}>
        <h3 className="font-display text-[17px] text-ink mb-1.5 hover:text-emerald transition">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mb-3">
        <Star className="w-3.5 h-3.5 fill-brass text-brass" />
        <span className="text-xs text-stone">
          {product.rating} ({product.reviewCount})
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          className="text-ink hover:text-emerald disabled:text-stone/40 disabled:cursor-not-allowed transition"
        >
          <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>
      </div>

      {!product.inStock && (
        <p className="text-xs text-stone mt-2">Out of stock</p>
      )}
    </div>
  );
}
