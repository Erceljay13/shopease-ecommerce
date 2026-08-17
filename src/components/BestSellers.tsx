import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useReveal } from "../hooks/useReveal";
import type { Product } from "../types";

interface BestSellersProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: Product[];
}

export default function BestSellers({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}: BestSellersProps) {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const { ref, visible } = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [tilts, setTilts] = useState<number[]>(bestSellers.map(() => 0));
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    const check = () => setIs3DEnabled(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateTilts = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    const cards = Array.from(track.children) as HTMLElement[];
    const nextTilts = cards.map((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = (cardCenter - trackCenter) / trackRect.width;
      return Math.max(-1, Math.min(1, distance)) * -18;
    });
    setTilts(nextTilts);
  };

  const handleScroll = () => {
    if (!is3DEnabled) return;
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateTilts();
      tickingRef.current = false;
    });
  };

  useEffect(() => {
    if (!is3DEnabled) return;
    updateTilts();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTilts);
    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTilts);
    };
  }, [bestSellers.length, is3DEnabled]);

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={`max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-stone-light reveal ${visible ? "reveal-visible" : ""}`}
    >
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-brass" />
          <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
            Top Rated
          </span>
        </div>
        <h2 className="font-display text-3xl text-ink">Best Seller Products</h2>
      </div>

      <div className="relative group/carousel">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={is3DEnabled ? { perspective: "1500px" } : undefined}
        >
          {bestSellers.map((product, i) => (
            <div
              key={product.id}
              className="shrink-0 w-56 sm:w-64 snap-center"
              style={
                is3DEnabled
                  ? {
                      transform: `rotateY(${tilts[i] ?? 0}deg) scale(${1 - Math.abs(tilts[i] ?? 0) / 90})`,
                      transformStyle: "preserve-3d",
                      transition: "transform 0.15s ease-out",
                    }
                  : undefined
              }
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

        <button
          onClick={() => scrollBy(-1)}
          className="hidden sm:flex absolute left-0 -translate-x-4 top-32 items-center justify-center w-11 h-11 bg-ink border border-ink shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:-translate-x-5 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 text-white" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="hidden sm:flex absolute right-0 translate-x-4 top-32 items-center justify-center w-11 h-11 bg-ink border border-ink shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-5 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 text-white" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
