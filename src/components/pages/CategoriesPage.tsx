import { categories } from "../../data/products";

const images: Record<string, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
  Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  "Home & Living":
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
  Toys: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=600",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brass" />
        <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
          Browse
        </span>
      </div>
      <h1 className="font-display text-4xl text-ink mb-10">All Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const link = "/products?category=" + encodeURIComponent(cat);
          const img =
            images[cat] ||
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600";
          return (
            <a
              key={cat}
              href={link}
              className="relative h-72 overflow-hidden group block animate-card-in transition-transform duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${i * 80}ms` }}
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
    </div>
  );
}
