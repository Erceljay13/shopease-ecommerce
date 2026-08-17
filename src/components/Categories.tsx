import { useReveal } from "../hooks/useReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoriesProps {
  categories: string[];
}

const images: Record<string, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
  "Home & Living":
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500",
  Toys: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=500",
};

const featuredCategories = ["Electronics", "Fashion", "Home & Living"];

export default function Categories({ categories }: CategoriesProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const shown = categories.filter((cat) => featuredCategories.includes(cat));

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
              Browse
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink">Shop by Category</h2>
        </div>
        <Link
          to="/categories"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink border border-ink/20 rounded-full px-5 py-2.5 hover:bg-ink hover:text-white transition-all duration-300"
        >
          View all categories
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            strokeWidth={1.5}
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {shown.map((cat, i) => {
          const link = "/products?category=" + encodeURIComponent(cat);
          const img =
            images[cat] ||
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500";
          return (
            <a
              key={cat}
              href={link}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`relative h-80 overflow-hidden group block ${visible ? "reveal-visible" : "reveal"}`}
            >
              <img
                src={img}
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <span className="text-white font-display italic text-2xl">
                  {cat}
                </span>
                <span className="text-white/70 text-xs uppercase tracking-wide mt-1 opacity-0 group-hover:opacity-100 transition">
                  Shop now
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
