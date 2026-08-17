import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import ProductCard from "../ProductCard";
import { products, categories } from "../../data/products";
import type { Product } from "../../types";
import { formatPrice } from "../../lib/formatPrice";

interface ProductsProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: Product[];
}

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const bannerProducts = products
  .filter((p) => p.isFeatured || p.isBestSeller)
  .slice(0, 4);

export default function Products({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}: ProductsProps) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((i) => (i + 1) % bannerProducts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc")
      result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, selectedCategory, maxPrice, sortBy]);

  const activeBannerProduct = bannerProducts[bannerIndex];

  return (
    <div>
      <section className="relative h-96 overflow-hidden bg-ink">
        {bannerProducts.map((product, i) => (
          <img
            key={product.id}
            src={product.image.replace(/w=\d+/, "w=1600")}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === bannerIndex ? "opacity-100 animate-ken-burns" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              New Arrivals
            </span>
          </div>
          <h1 className="font-display text-5xl text-white leading-tight mb-3">
            All Products
          </h1>
          <p className="text-white/70 text-sm max-w-md">
            Handpicked pieces across every category, curated for quality and
            priced fairly.
          </p>

          <div className="flex items-center gap-2 mt-8">
            {bannerProducts.map((product, i) => (
              <button
                key={product.id}
                onClick={() => setBannerIndex(i)}
                className={`h-0.5 transition-all duration-300 ${i === bannerIndex ? "w-8 bg-brass" : "w-4 bg-white/30"}`}
                aria-label={`Show ${product.name}`}
              />
            ))}
          </div>
        </div>

        {activeBannerProduct && (
          <div
            key={activeBannerProduct.id}
            className="hidden md:block absolute bottom-8 right-8 bg-white shadow-2xl p-4 w-64 animate-fade-up"
          >
            <div className="flex items-center gap-3">
              <img
                src={activeBannerProduct.image}
                alt={activeBannerProduct.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">
                  {activeBannerProduct.category}
                </p>
                <p className="font-display text-sm text-ink leading-tight mt-0.5">
                  {activeBannerProduct.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-brass text-brass" />
                  <span className="text-xs text-stone">
                    {activeBannerProduct.rating}
                  </span>
                  <span className="text-xs font-medium text-ink ml-2">
                    {formatPrice(activeBannerProduct.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <p className="text-xs text-stone uppercase tracking-wide">
            {filtered.length} products found
          </p>
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full pl-6 pr-2 py-1.5 text-sm bg-transparent border-b border-stone-light focus:outline-none focus:border-ink transition"
            />
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-8 border-b border-stone-light">
          <div className="flex items-center gap-2 flex-wrap">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition ${
                  selectedCategory === cat
                    ? "bg-ink text-white"
                    : "bg-stone-light/60 text-stone hover:bg-stone-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex items-center gap-2 text-xs font-medium text-ink uppercase tracking-wide border-b border-ink/30 pb-0.5 hover:border-ink transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
            Price &amp; Sort
          </button>
        </div>

        {filtersOpen && (
          <div className="grid sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-stone-light">
            <div>
              <label className="block text-xs font-medium text-stone uppercase tracking-wide mb-3">
                Max Price: {formatPrice(maxPrice)}
              </label>
              <input
                type="range"
                min={0}
                max={200}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone uppercase tracking-wide mb-3">
                Sort By
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`px-3 py-1.5 text-xs font-medium transition ${
                      sortBy === opt.value
                        ? "bg-ink text-white"
                        : "bg-stone-light/60 text-stone hover:bg-stone-light"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-stone py-16 text-center">
            No products match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-card-in transition-transform duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${(i % 9) * 60}ms` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  wishlist={wishlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
