import MagneticButton from "./MagneticButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden -mt-20">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-44 pb-24 sm:pb-32 grid md:grid-cols-[1fr_0.9fr] gap-20 items-center">
        <div className="animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-brass" />
            <span className="text-xs font-medium text-brass uppercase tracking-[0.15em]">
              New Season
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl font-medium text-white leading-[0.96] mb-8 tracking-tight">
            Shop smarter,
            <br />
            <span className="italic font-normal text-white/80">
              live better.
            </span>
          </h1>

          <p className="text-white/70 text-[17px] mb-10 max-w-sm leading-relaxed">
            Curated electronics, fashion, home, and beauty, handpicked, well
            priced, and delivered fast.
          </p>

          <div className="mb-14">
            <MagneticButton
              href="/products"
              className="bg-white text-ink px-8 py-3.5 rounded-full text-sm font-medium hover:bg-brass hover:text-white"
            >
              Shop Now
            </MagneticButton>
          </div>

          <div className="flex items-center gap-10 pt-10 border-t border-white/20">
            <div>
              <p className="font-display text-2xl text-white">12k+</p>
              <p className="text-xs text-white/60 uppercase tracking-wide mt-1">
                Happy shoppers
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-white">4.8</p>
              <p className="text-xs text-white/60 uppercase tracking-wide mt-1">
                Average rating
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-white">30d</p>
              <p className="text-xs text-white/60 uppercase tracking-wide mt-1">
                Easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
