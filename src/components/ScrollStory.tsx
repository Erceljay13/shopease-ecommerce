import { useScrollProgress } from "../hooks/useScrollProgress";
import { products } from "../data/products";

const beats = [
  {
    at: 0.05,
    title: "Curated, not cluttered.",
    text: "Every product earns its place, handpicked, not mass-dumped.",
    productId: "p2",
  },
  {
    at: 0.38,
    title: "Delivered fast.",
    text: "Most orders ship same-day and arrive within 48 hours.",
    productId: "p5",
  },
  {
    at: 0.7,
    title: "Loved by thousands.",
    text: "12,000+ shoppers, 4.8 average rating, and counting.",
    productId: "p6",
  },
];

export default function ScrollStory() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/5769156/5769156-hd_1920_1080_25fps.mp4"
          poster="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-ink/70" />

        <div className="relative w-full h-full">
          {beats.map((beat, i) => {
            const nextAt = beats[i + 1]?.at ?? 1;
            const visible = progress >= beat.at && progress < nextAt;
            const opacity = visible ? 1 : 0;
            const product = products.find((p) => p.id === beat.productId);

            return (
              <div
                key={beat.title}
                className="absolute inset-0 grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6 lg:px-8 transition-opacity duration-700 ease-out"
                style={{ opacity }}
              >
                <div
                  style={{
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: "transform 0.7s ease-out",
                  }}
                >
                  <span className="text-xs font-medium text-brass uppercase tracking-[0.15em] mb-4 block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-4xl sm:text-5xl text-white mb-5 leading-tight">
                    {beat.title}
                  </h2>
                  <p className="text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
                    {beat.text}
                  </p>
                </div>

                {product && (
                  <div
                    className="relative hidden md:block"
                    style={{
                      transform: visible
                        ? "translateY(0) scale(1)"
                        : "translateY(40px) scale(0.96)",
                      transition:
                        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div className="relative bg-white shadow-2xl p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover"
                      />
                      <div className="pt-4">
                        <p className="text-xs text-stone uppercase tracking-wide">
                          {product.category}
                        </p>
                        <p className="font-display text-lg text-ink mt-1">
                          {product.name}
                        </p>
                        <p className="text-emerald font-medium mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-white/20">
          <div
            className="h-full bg-brass transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
