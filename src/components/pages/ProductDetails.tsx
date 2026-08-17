import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../ProductCard";
import type { Product } from "../../types";
import { formatPrice } from "../../lib/formatPrice";


interface ProductDetailsProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: Product[];
}

export default function ProductDetails({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}: ProductDetailsProps) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <p className="text-stone">Product not found.</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const gallery = [product.image, product.image, product.image];

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const nextImage = () =>
    setActiveImage((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart?.(product);
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs text-stone uppercase tracking-wide">
          <Link to="/" className="hover:text-ink transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-ink transition">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-ink transition"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-light/70 via-stone-light/30 to-transparent -z-10 scale-110 blur-2xl" />

            <div className="relative bg-stone-light/20 overflow-hidden">
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="w-full h-[540px] object-cover transition-opacity duration-300"
              />

              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-paper text-emerald border border-emerald text-[11px] font-medium px-2.5 py-1">
                  -{discount}%
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-ink text-white text-[10px] font-medium uppercase tracking-wide px-2.5 py-1">
                  Best Seller
                </span>
              )}

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-md transition"
              >
                <ChevronLeft className="w-4 h-4 text-ink" strokeWidth={1.5} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 shadow-md transition"
              >
                <ChevronRight className="w-4 h-4 text-ink" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-0.5 transition-all duration-300 ${i === activeImage ? "w-8 bg-ink" : "w-4 bg-stone-light"}`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs text-stone uppercase tracking-wide mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-4xl text-ink mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`w-4 h-4 ${n <= Math.round(product.rating) ? "fill-brass text-brass" : "text-stone-light"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-stone">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-stone-light">
              <span className="font-display text-3xl text-ink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-stone leading-relaxed mb-10">
              {product.description}
            </p>

            {product.inStock ? (
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center border border-stone-light">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-ink hover:bg-stone-light transition"
                  >
                    <Minus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <span className="px-5 text-sm font-medium text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-ink hover:bg-stone-light transition"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-ink text-white py-3.5 rounded-full text-sm font-medium hover:bg-emerald-dark transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => onToggleWishlist?.(product)}
                  className={`p-3.5 border transition ${isWishlisted ? "border-emerald bg-emerald/5" : "border-stone-light hover:bg-stone-light"}`}
                >
                  <Heart
                    className="w-[18px] h-[18px] transition-transform duration-300"
                    fill={isWishlisted ? "#2f4a3e" : "none"}
                    color={isWishlisted ? "#2f4a3e" : "#17140f"}
                    style={{
                      transform: isWishlisted ? "scale(1.1)" : "scale(1)",
                    }}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            ) : (
              <p className="text-stone font-medium mb-10">Out of stock</p>
            )}

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-light mt-auto">
              <div className="flex flex-col items-start gap-2">
                <Truck className="w-5 h-5 text-emerald" strokeWidth={1.5} />
                <p className="text-xs text-stone leading-snug">
                  Free shipping over $50
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <RotateCcw className="w-5 h-5 text-emerald" strokeWidth={1.5} />
                <p className="text-xs text-stone leading-snug">
                  30-day easy returns
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <ShieldCheck
                  className="w-5 h-5 text-emerald"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-stone leading-snug">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-stone-light">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              You may also like
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink mb-10">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
